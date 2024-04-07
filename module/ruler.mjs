import { HEROSYS } from "./herosystem6e.mjs";
import { getSystemDisplayUnits } from "./utility/units.mjs";

export class HeroRuler {
    static initialize() {
        Hooks.once("ready", function () {
            setHeroRulerLabel();

            if (!game.modules.get("drag-ruler")) {
                ui.notifications.warn(
                    game.i18n.localize("Warning.DragRuler.Install"),
                );
                return;
            }

            if (!game.modules.get("drag-ruler")?.active) {
                ui.notifications.warn(
                    game.i18n.localize("Warning.DragRuler.Active"),
                );
            }
        });

        if (!game.modules.get("drag-ruler")?.active) {
            return;
        }

        Hooks.once("dragRuler.ready", (SpeedProvider) => {
            class HeroSysSpeedProvider extends SpeedProvider {
                get colors() {
                    return [
                        {
                            id: "half",
                            default: 0x00ff00,
                            name: game.i18n.localize("Movement.Half"),
                        },
                        {
                            id: "full",
                            default: 0xffff00,
                            name: game.i18n.localize("Movement.Full"),
                        },
                        {
                            id: "noncombat",
                            default: 0xff8000,
                            name: game.i18n.localize("Movement.Noncombat"),
                        },
                    ];
                }

                getRanges(token) {
                    const baseSpeedInMetres =
                        HeroSysSpeedProvider.getMovementSpeedInMetres(token);

                    // Convert metres into hexes using the standard 1" = 2m conversion with the
                    // assumption that the grid is set to 1 hex = 2m.
                    const ranges = [
                        {
                            range: Math.ceil(baseSpeedInMetres / 2),
                            color: "half",
                        },
                        {
                            range:
                                Math.floor(baseSpeedInMetres / 2) +
                                Math.ceil(baseSpeedInMetres / 2),
                            color: "full",
                        },

                        // TODO: This is assuming that the movement type has no non combat multiples.
                        { range: baseSpeedInMetres * 2, color: "noncombat" },
                    ];

                    return ranges;
                }

                /**
                 *
                 * Return the movement speed of a token in metres per phase.
                 * 5e stores the value as ". 6e stores the value as m.
                 *
                 * @param {Object} token
                 * @returns number
                 */
                static getMovementSpeedInMetres(token) {
                    const key = token.actor.flags.activeMovement || "running";
                    const is5e = !!token.actor.system.is5e;
                    const movementValue =
                        parseInt(
                            token.actor.system.characteristics[key].value,
                        ) || 0;

                    return is5e ? movementValue * 2 : movementValue;
                }

                async onMovementHistoryUpdate(tokens) {
                    await super.onMovementHistoryUpdate(tokens);

                    const automation = game.settings.get(
                        "hero6efoundryvttv2",
                        "automation",
                    );

                    for (const tokenObj of tokens) {
                        const token = tokenObj?.document;
                        if (!token) continue; // This should not be needed.  Possible issue with Flight selected, and actor re-uploaded.
                        const actor = token.actor;

                        if (
                            automation === "all" ||
                            (automation === "npcOnly" && actor.type == "npc") ||
                            (automation === "pcEndOnly" && actor.type === "pc")
                        ) {
                            // Only consume endurance on token's phase, allowing for Knockback movement (which does not consume END)
                            if (game.combat?.combatant.actorId != actor.id)
                                continue;

                            const combatant = game.combat?.combatants.find(
                                (o) => o.actorId === actor.id,
                            );
                            if (combatant) {
                                // If no waypoints then we haven't spent any END in this phase yet.
                                if (
                                    !combatant.flags.dragRuler.passedWaypoints
                                ) {
                                    combatant.update({
                                        ["flags.dragRuler.spentEnd"]: 0,
                                    });
                                    return;
                                }

                                // Add movement type to last movement waypoint
                                // combatant.flags.dragRuler.passedWaypoints[
                                //     combatant.flags.dragRuler.passedWaypoints
                                //         .length - 1
                                // ].activeMovement = actor.flags?.activeMovement;

                                let spentEnd = parseInt(
                                    combatant.flags.dragRuler.spentEnd || 0,
                                );

                                // TODO: We are using getMovedDistanceFromToken to get total distance,
                                // however, we really should separate distances by activeMovement so
                                // we can apply END modifications to specific movements.
                                // This is only an issue with split movement types.
                                let currentDistance =
                                    dragRuler.getMovedDistanceFromToken(
                                        tokenObj,
                                    );

                                // DistancePerEnd default is 10m costs 1 END
                                let DistancePerEnd = 10;

                                // Find associated MOVEMENT type (if any)
                                // and adjust DistancePerEnd as appropriate.
                                // TODO: Only adjust if movement power is used.
                                //  For example a natural 12m run with a 20m running power;
                                //  you only need to adjust when you exceed 12m.
                                const movementPower = actor.items.find(
                                    (o) =>
                                        o.system.XMLID ===
                                            actor.flags.activeMovement?.toUpperCase() &&
                                        o.system.active,
                                );
                                const reducedEnd =
                                    movementPower?.findModsByXmlid(
                                        "REDUCEDEND",
                                    );
                                if (reducedEnd) {
                                    if (reducedEnd.OPTION === "HALFEND") {
                                        DistancePerEnd = DistancePerEnd * 2;
                                    }
                                    if (reducedEnd.OPTION === "ZERO") {
                                        return;
                                    }
                                }
                                const increasedEnd =
                                    movementPower?.findModsByXmlid(
                                        "INCREASEDEND",
                                    );
                                if (increasedEnd) {
                                    DistancePerEnd /=
                                        parseInt(
                                            increasedEnd.OPTION.replace(
                                                "x",
                                                "",
                                            ),
                                        ) || 1;
                                }

                                // TODO: This is assuming every 10 costs 1 endurance
                                let totalEnd = Math.ceil(
                                    currentDistance / DistancePerEnd,
                                );
                                let costEnd = totalEnd - spentEnd;
                                if (costEnd > 0) {
                                    actor.update({
                                        ["system.characteristics.end.value"]:
                                            parseInt(
                                                actor.system.characteristics.end
                                                    .value,
                                            ) - costEnd,
                                    });
                                }
                                combatant.update({
                                    ["flags.dragRuler.spentEnd"]: totalEnd,
                                });
                            }
                        }
                    }
                }
            }

            dragRuler.registerSystem(HEROSYS.module, HeroSysSpeedProvider);

            setHeroRulerLabel();
        });

        Hooks.on("controlToken", function () {
            if (!game.modules.get("drag-ruler")?.active) {
                return;
            }

            const sceneControls = ui.controls;
            if (sceneControls.activeControl !== "token") {
                return;
            }
            if (sceneControls.activeTool !== "select") {
                return;
            }

            const tokensControlled = canvas.tokens.controlled.length;

            if (tokensControlled !== 1) {
                return;
            }

            movementRadioSelectRender();
        });

        Hooks.on("renderSceneControls", function (sceneControls) {
            if (!game.modules.get("drag-ruler")?.active) {
                return;
            }

            if (sceneControls.activeControl !== "token") {
                return;
            }
            if (sceneControls.activeTool !== "select") {
                return;
            }

            const tokensControlled = canvas.tokens.controlled.length;

            if (tokensControlled !== 1) {
                return;
            }

            movementRadioSelectRender();

            return;
        });

        Hooks.on("updateActor", function (actor, args) {
            const sceneControls = ui.controls;
            if (sceneControls.activeControl !== "token") {
                return;
            }
            if (sceneControls.activeTool !== "select") {
                return;
            }

            if (
                !args?.system?.characteristics &&
                !args?.flags?.activeMovement
            ) {
                return;
            }

            // Kluge to update actor right away so the render has proper data.
            // There is likely a better way to deal with this, possibly in the refreshToken hook.
            if (args?.flags?.activeMovement) {
                actor.flags.activeMovement = args?.flags?.activeMovement;
            }

            movementRadioSelectRender();
        });

        Hooks.on("hdcUpload", function () {
            const sceneControls = ui.controls;
            if (sceneControls.activeControl !== "token") {
                return;
            }
            if (sceneControls.activeTool !== "select") {
                return;
            }

            movementRadioSelectRender();
        });

        async function movementRadioSelectRender() {
            const tokenControlButton = $(
                ".scene-control[data-control='token']",
            );

            const relevantToken = canvas.tokens.controlled[0];

            if (!relevantToken) return;
            if (!relevantToken.actor) return;

            const movementPowers = relevantToken.actor.system.is5e
                ? CONFIG.HERO.movementPowers5e
                : CONFIG.HERO.movementPowers;

            let movementItems = [];
            for (const key of Object.keys(
                relevantToken.actor.system.characteristics,
            ).filter((o) => movementPowers[o])) {
                const char = relevantToken.actor.system.characteristics[key];
                if ((parseInt(char.value) || 0) > 0) {
                    char._id = key;
                    char.name = movementPowers[key];
                    movementItems.push(char);
                }
            }

            const renderRadioOptions = () => {
                const activeMovement =
                    movementItems.length === 0
                        ? "none"
                        : movementItems.find(
                              (o) =>
                                  o._id ==
                                  relevantToken.actor.flags.activeMovement,
                          )?._id || movementItems[0]._id;

                const radioOptions = movementItems
                    .map(
                        (item, index) => `
                    <div class="radio" data-tool="${item._id}">
                        <input id="radio-${index}" name="radio" type="radio" ${
                            activeMovement === item._id ? "checked" : ""
                        }>
                        <label for="radio-${index}" class="radio-label">${
                            item.name
                        } (${item.value}${getSystemDisplayUnits(
                            relevantToken.actor,
                        )})</label>
                    </div>
                `,
                    )
                    .join("");

                const radioSelect = $(
                    `<div class="radio-container">${radioOptions}</div>`,
                );

                radioSelect.find("[data-tool]").click(async function () {
                    const tool = $(this).attr("data-tool");

                    await relevantToken.actor.update({
                        "flags.activeMovement": tool,
                    });

                    renderRadioOptions();
                });

                if (tokenControlButton.find(".radio-container").length > 0) {
                    tokenControlButton.find(".radio-container").remove();
                }

                tokenControlButton.append(radioSelect);
            };

            renderRadioOptions();
        }
    }
}

function setHeroRulerLabel() {
    Ruler.prototype._getSegmentLabel = function _getSegmentLabel(
        segmentDistance,
        totalDistance,
    ) {
        const relevantToken = canvas.tokens.controlled[0];
        let factor = relevantToken?.actor?.system?.is5e ? 4 : 8;
        let rangeMod = Math.ceil(Math.log2(totalDistance / factor)) * 2;

        rangeMod = rangeMod < 0 ? 0 : rangeMod;

        let label = `[${Math.round(segmentDistance.distance)}${
            game.scenes.current.grid.units || ""
        }]`;

        if (
            game.modules.get("drag-ruler")?.active &&
            canvas.tokens.controlled.length > 0
        ) {
            if (!relevantToken || !relevantToken.actor) {
                return;
            }

            const movementPowers = relevantToken.actor.system.is5e
                ? CONFIG.HERO.movementPowers5e
                : CONFIG.HERO.movementPowers;

            let movementItems = [];
            for (const key of Object.keys(
                relevantToken.actor.system.characteristics,
            ).filter((o) => movementPowers[o])) {
                const char = relevantToken.actor.system.characteristics[key];
                if ((parseInt(char.value) || 0) > 0) {
                    char._id = key;
                    char.name = movementPowers[key];
                    movementItems.push(char);
                }
            }

            const activeMovement =
                movementItems.length === 0
                    ? "none"
                    : movementItems.find(
                          (o) =>
                              o._id == relevantToken.actor.flags.activeMovement,
                      )?._id || movementItems[0]._id;

            const activeMovementLabel =
                activeMovement === "none"
                    ? "Running"
                    : movementItems.find((e) => e._id === activeMovement)?.name;
            if (activeMovementLabel) {
                label += "\n" + activeMovementLabel;
            }
        }

        label += "\n-" + rangeMod + " Range Modifier";

        return label;
    };
}

export function calculateVelocity(actor, token) {
    let velocity = 0;

    const combatants = game?.combat?.combatants;

    if (combatants && typeof dragRuler != "undefined" && token) {
        const distance = dragRuler.getMovedDistanceFromToken(token);
        const ranges = dragRuler.getRangesFromSpeedProvider(token);
        const speed = ranges.length > 1 ? ranges[1].range : 0;
        let delta = distance;
        if (delta > speed / 2) {
            delta = speed - delta;
        }
        velocity = delta * 5;
    }

    // Simplistic velocity calc using dragRuler
    if (velocity === 0 && typeof dragRuler != "undefined" && token) {
        if (dragRuler.getRangesFromSpeedProvider(token).length > 1) {
            velocity = parseInt(
                dragRuler.getRangesFromSpeedProvider(token)[1].range || 0,
            );
        }
    }

    // Simplistic velocity calc using running & flight
    // TODO: Should we not at least get the presently enabled movement type(s) to make a guess?
    if (velocity === 0) {
        velocity = parseInt(actor.system.characteristics.running.value || 0);
        velocity = Math.max(
            velocity,
            parseInt(actor.system.characteristics.flight.value || 0),
        );
    }

    return velocity;
}
