import { HeroSystem6eActorActiveEffects } from "../actor/actor-active-effects.mjs";

/**
 * Maneuvers have some rules of their own that should be considered.
 *
 * @param {*} actor
 * @param {*} item
 */
export async function enforceManeuverLimits(actor, item) {
    // const maneuverItems = actor.items.filter((e) => ["maneuver", "martialart"].includes(e.type));

    await item.update({ "system.active": !item.system.active });

    // PH: FIXME: Not sure this is correct
    //     if (item.system.active) {
    //         if (item.name === "Block") {
    //             for (const maneuver of maneuverItems) {
    //                 if (maneuver.system.active && maneuver.name !== "Block") {
    //                     await maneuver.update({ "system.active": false });
    //                 }
    //             }
    //         } else {
    //             const block = maneuverItems.find((maneuver) => maneuver.name === "Block");
    //             if (block && block?.system?.active) {
    //                 await block.update({ "system.active": false });
    //             }
    //         }
    //     }
}

function addDcvTraitToChanges(maneuverDcvChange) {
    if (maneuverDcvChange !== 0) {
        return {
            key: "system.characteristics.dcv.value",
            value: maneuverDcvChange,
            mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        };
    }
}

function addOcvTraitToChanges(maneuverOcvChange) {
    if (maneuverOcvChange !== 0) {
        return {
            key: "system.characteristics.ocv.value",
            value: maneuverOcvChange,
            mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        };
    }
}

/**
 * Activate a combat or martial maneuver
 */
export async function activateManeuver(item) {
    // TODO: Can the actor activate this maneuver?

    const newEffects = [];

    // FIXME: These are supposed to be for HTH only and not apply to ranged combat by default
    const maneuverDcvTrait = parseInt(item.system.DCV === "--" ? 0 : item.system.DCV || 0);
    const maneuverOcvTrait = parseInt(item.system.OCV === "--" ? 0 : item.system.OCV || 0);

    // Enable the effect if there is one
    const effect = item.system.EFFECT?.toLowerCase();
    if (effect) {
        const maneuverHasAbortTrait = effect.indexOf("abort") > -1;
        const maneuverHasDodgeTrait = effect.indexOf("dodge") > -1;
        const maneuverHasBlockTrait = effect.indexOf("block") > -1;

        const currentCombatActorId = game.combat?.combatants.find(
            (combatant) => combatant.tokenId === game.combat.current?.tokenId,
        )?.actorId;
        const thisActorsCombatTurn =
            game.combat?.active && currentCombatActorId != undefined && currentCombatActorId === item.actor?.id;

        // Abort effect - If in combat and not our turn then this must be an abort
        if (maneuverHasAbortTrait && game.combat?.active && !thisActorsCombatTurn) {
            newEffects.push(item.actor.addActiveEffect(HeroSystem6eActorActiveEffects.statusEffectsObj.abortEffect));
        }

        // Dodge effect
        if (maneuverHasDodgeTrait) {
            const dodgeStatusEffect = foundry.utils.deepClone(
                HeroSystem6eActorActiveEffects.statusEffectsObj.dodgeEffect,
            );
            dodgeStatusEffect.name = item.name ? `${item.name} (${item.system.XMLID})` : `${item.system.XMLID}`;
            dodgeStatusEffect.changes = [
                addDcvTraitToChanges(maneuverDcvTrait),
                addOcvTraitToChanges(maneuverOcvTrait),
            ].filter(Boolean);
            newEffects.push(item.actor.addActiveEffect(dodgeStatusEffect));
        }

        // Block effect
        if (maneuverHasBlockTrait) {
            const blockStatusEffect = foundry.utils.deepClone(
                HeroSystem6eActorActiveEffects.statusEffectsObj.blockEffect,
            );
            blockStatusEffect.name = item.name ? `${item.name} (${item.system.XMLID})` : `${item.system.XMLID}`;
            blockStatusEffect.changes = [
                addDcvTraitToChanges(maneuverDcvTrait),
                addOcvTraitToChanges(maneuverOcvTrait),
            ].filter(Boolean);
            newEffects.push(item.actor.addActiveEffect(blockStatusEffect));
        }
    }

    // Turn on any status effects that we have implemented
    if (item.system.XMLID === "BRACE") {
        newEffects.push(item.actor.addActiveEffect(HeroSystem6eActorActiveEffects.statusEffectsObj.braceEffect));
    } else if (item.system.XMLID === "HAYMAKER") {
        newEffects.push(item.actor.addActiveEffect(HeroSystem6eActorActiveEffects.statusEffectsObj.haymakerEffect));
    } else if (
        item.system.XMLID === "COVER" ||
        item.system.XMLID === "HIPSHOT" ||
        item.system.XMLID === "HURRY" ||
        item.system.XMLID === "SET" ||
        item.system.XMLID === "SETANDBRACE" ||
        item.system.XMLID === "PULLINGAPUNCH"
    ) {
        console.error(`Unsupported maneuver ${item.name}/${item.system.XMLID}`);
    } else {
        // PH: FIXME: Assume this is a generic maneuver and give it a default effect
        newEffects.push(item.actor.addActiveEffect(HeroSystem6eActorActiveEffects.statusEffectsObj.strikeEffect));
    }

    return Promise.all(newEffects);
}

/**
 * Deactivate a combat or martial maneuver
 */
export function deactivateManeuver(item) {
    const removedEffects = [];

    const effect = item.system.EFFECT?.toLowerCase();
    if (effect) {
        const maneuverHasDodgeTrait = effect.indexOf("dodge") > -1;
        if (maneuverHasDodgeTrait) {
            removedEffects.push(
                item.actor.removeActiveEffect(HeroSystem6eActorActiveEffects.statusEffectsObj.dodgeEffect),
            );
        }
    }

    // Turn off any status effects that we have implemented
    if (item.system.XMLID === "BRACE") {
        removedEffects.push(item.actor.removeActiveEffect(HeroSystem6eActorActiveEffects.statusEffectsObj.braceEffect));
    } else if (item.system.XMLID === "HAYMAKER") {
        removedEffects.push(
            item.actor.removeActiveEffect(HeroSystem6eActorActiveEffects.statusEffectsObj.haymakerEffect),
        );
    }

    return Promise.all(removedEffects);
}
