import { HEROSYS } from "../herosystem6e.mjs";
import { RoundFavorPlayerUp } from "./round.mjs";

export function combatSkillLevelsForAttack(item) {
    const results = [];

    if (!item.actor) return results;

    const cslSkills = item.actor.items.filter(
        (o) =>
            ["MENTAL_COMBAT_LEVELS", "COMBAT_LEVELS"].includes(o.system.XMLID) &&
            (o.system.ADDER || []).find((adder) => adder.ALIAS === item.system.ALIAS || adder.ALIAS === item.name) &&
            o.isActive != false,
    );

    for (const cslSkill of cslSkills) {
        const result = {
            ocv: 0,
            dcv: 0,
            dmcv: 0,
            omcv: 0,
            dc: 0,
            skill: cslSkill,
        };

        if (result.skill && result.skill.system.csl) {
            for (let i = 0; i < parseInt(result.skill.system.LEVELS || 0); i++) {
                result[result.skill.system.csl[i]] = (result[result.skill.system.csl[i]] || 0) + 1;
            }
            result.item = result.skill;

            // Takes 2 CLS for +1 DC
            result.dc = Math.floor(result.dc / 2);

            results.push(result);
        }
    }

    return results;
}

export function penaltySkillLevelsForAttack(item) {
    if (!item.actor) return [];

    const psls = item.actor.items.filter(
        (item) =>
            ["PENALTY_SKILL_LEVELS"].includes(item.system.XMLID) &&
            (item.system.ADDER || []).find((p) => p.ALIAS === item.system.ALIAS || p.ALIAS === item.name) &&
            item.isActive != false,
    );

    return psls;
}

const zeroDiceParts = Object.freeze({
    dc: 0,
    d6Count: 0,
    d6Less1DieCount: 0,
    halfDieCount: 0,
    constant: 0,
});

/**
 * @typedef {Object} HeroSystemFormulaDiceParts
 * @property {number} d6Count - number of whole dice (e.g. 73d6)
 * @property {number} d6Less1DieCount - 1 or 0 1d6-1 terms (e.g. 1d6-1)
 * @property {number} halfDieCount - 1 or 0 half dice terms (e.g. ½d6)
 * @property {number} constant - 1 or 0 reflecting a +1 (e.g. 2d6 + 1)
 * @property {number} dc - damage class with factional DCs allowed
 */
/**
 * @typedef {HeroSystemFormulaTag}
 * @property {string} value - value of the tag
 * @property {string} name - name of the tag
 * @property {string} title - tooltip string
 */
/**
 * @typedef {HeroSystemFormulaDicePartsBundle}
 * @property {HeroSystemFormulaDiceParts} diceParts
 * @property {array.<HeroSystemFormulaTag>} tags
 */

/**
 * Return the dice and half dice roll for this characteristic value. Doesn't support +1 intentionally.
 * @param {number} value
 * @returns {HeroSystemFormulaDiceParts}
 */
export function characteristicValueToDiceParts(value) {
    return {
        dc: value / 5,
        d6Count: Math.floor(value / 5),
        d6Less1DieCount: 0,
        halfDieCount: RoundFavorPlayerUp((value % 5) / 5),
        constant: 0,
    };
}

function effectiveStrength(item, options) {
    return parseInt(
        options?.effectivestr != undefined ? options?.effectivestr : item.actor?.system.characteristics.str.value || 0,
    );
}

function isNonKillingStrengthBasedManeuver(item) {
    return (
        !item.system.killing &&
        item.system.usesStrength &&
        (item.type === "martialart" ||
            (item.type === "maneuver" &&
                (item.name === "Strike" ||
                    item.name === "Disarm" ||
                    item.name === "Grab By" ||
                    item.name === "Move Through" ||
                    item.name === "Move By" ||
                    item.name === "Pulling A Punch" ||
                    item.name === "Shove" ||
                    item.name === "Throw")))
    );
}

function doubleDamageLimit() {
    return game.settings.get(HEROSYS.module, "DoubleDamageLimit");
}

function addExtraDcsToBundle(item, dicePartsBundle, halve5eKillingAttacks) {
    const extraDcItems = item.actor?.items.filter((item) => item.system.XMLID === "EXTRADC") || [];

    // Consider all EXTRADCs as one
    const numExtraDcs = extraDcItems.reduce((accum, current) => accum + parseInt(current.system.LEVELS || 0), 0);
    let extraDcLevels = numExtraDcs;

    // 5E extraDCLevels are halved for unarmed killing attacks
    if (item.is5e && item.system.killing && halve5eKillingAttacks) {
        extraDcLevels = Math.floor(extraDcLevels / 2);
    }

    const extraDcDiceParts = calculateDicePartsFromDcForItem(item, extraDcLevels);
    const formula = dicePartsToEffectFormula(extraDcDiceParts);

    if (extraDcLevels > 0) {
        dicePartsBundle.diceParts = addDiceParts(item, dicePartsBundle.diceParts, extraDcDiceParts);
        dicePartsBundle.tags.push({
            value: `${formula}`,
            name: "Extra DCs",
            title: `${extraDcLevels.signedString()}DC${numExtraDcs !== extraDcLevels ? " halved as is a killing attack" : ""} -> ${formula}`,
        });
    }
}

/**
 * Determine DC solely from item/attack. A DC is NOT a die of damage.
 *
 * @param {HeroSystem6eItem} item
 * @param {Object} options
 */
export function calculateAddedDicePartsFromItem(item, options) {
    // PH: FIXME: base is now so simple that we could put it in here.

    const addedDamageBundle = {
        diceParts: zeroDiceParts,
        tags: [],
    };
    const velocityDamageBundle = {
        diceParts: zeroDiceParts,
        tags: [],
    };

    // EXTRADCs
    // 5e EXTRADC for armed killing attacks count at full DCs but do NOT count towards the base DC.
    // 6e doesn't have the concept of base and added DCs or the doubling rule so do as an added DC for simplicity.

    if (item.type === "martialart" && item.system.USEWEAPON) {
        addExtraDcsToBundle(item, addedDamageBundle, false);
    }

    // For Haymaker (with Strike presumably) and non killing Martial Maneuvers, STR is the main weapon and the maneuver is additional damage.
    // These are added is added in without consideration of advantages in 5e but not in 6e.
    if (isNonKillingStrengthBasedManeuver(item)) {
        const rawManeuverDc = parseInt(item.system.DC);

        let maneuverDC = rawManeuverDc;
        if (item.is5e && item.system.killing) {
            maneuverDC = Math.floor(rawManeuverDc / 2);
        }

        // Martial Maneuvers in 5e ignore advantages. Everything else care about them.
        const alteredManeuverDc =
            item.is5e && item.type === "martialart" ? maneuverDC * (1 + item.system._advantagesDc) : maneuverDC;
        const maneuverDiceParts = calculateDicePartsFromDcForItem(item, alteredManeuverDc);
        const formula = dicePartsToEffectFormula(maneuverDiceParts);

        addedDamageBundle.diceParts = addDiceParts(item, addedDamageBundle.diceParts, maneuverDiceParts);
        addedDamageBundle.tags.push({
            value: `+${formula}`,
            name: item.name,
            title: `${rawManeuverDc.signedString()}DC${maneuverDC !== rawManeuverDc ? " halved as is a killing attack" : ""} -> ${formula}`,
        });
    }

    // Add in STR when appropriate
    if (item.system.usesStrength && !isNonKillingStrengthBasedManeuver(item)) {
        addStrengthToBundle(item, options, addedDamageBundle);
    }

    // Boostable Charges
    if (options.boostableCharges != undefined && options.boostableCharges > 0) {
        // Each used boostable charge, to a max of 4, increases the damage class by 1.
        const boostChargesDc = Math.min(4, parseInt(options.boostableCharges));
        const boostableDiceParts = calculateDicePartsFromDcForItem(item, boostChargesDc);
        const formula = dicePartsToEffectFormula(boostableDiceParts);

        addedDamageBundle.diceParts = addDiceParts(item, addedDamageBundle.diceParts, boostableDiceParts);
        addedDamageBundle.tags.push({
            value: `${formula}`,
            name: "Boostable Charges",
            title: `${boostChargesDc}DC -> ${formula}`,
        });
    }

    // Combat Skill Levels. These are added is added in without consideration of advantages in 5e but not in 6e.
    // PH: TODO: 5E Superheroic: Each 2 CSLs modify the killing attack BODY roll by +1 (cannot exceed the max possible roll). Obviously no +1/2 DC.
    // PH: TODO: 5E Superheroic: Each 2 CSLs modify the normal attack STUN roll by +3 (cannot exceed the max possible roll). Obviously no +1/2 DC.
    // PH: TODO: THE ABOVE 2 NEED NEW HERO ROLLER FUNCTIONALITY.
    for (const csl of combatSkillLevelsForAttack(item)) {
        if (csl.dc > 0) {
            // CSLs in 5e ignore advantages. In 6e they care about it.
            const alteredCslDc = item.is5e ? csl.dc * (1 + item.system._advantagesDc) : csl.dc;
            const cslDiceParts = calculateDicePartsFromDcForItem(item, alteredCslDc);
            const formula = dicePartsToEffectFormula(cslDiceParts);
            addedDamageBundle.diceParts = addDiceParts(item, addedDamageBundle.diceParts, cslDiceParts);
            addedDamageBundle.tags.push({
                value: `+${formula}`,
                name: csl.item.name,
                title: `${csl.dc.signedString()}DC -> ${formula}`,
            });
        }
    }

    // Move By, Move By, etc - Maneuvers that add in velocity
    // ((STR/2) + (v/10))d6; attacker takes 1/3 damage
    //
    // A character can accelerate at a rate of 5m per meter, up to their
    // maximum normal Combat Movement in meters per Phase. Thus
    // a character with 50m of Flight would be moving at a velocity of
    // 5m after traveling one meter, 10m after traveling two meters,
    // 15m after traveling three meters, and so on, up to 50m after
    // traveling ten meters.
    //
    // Currently assuming token starts at 0 velocity and ends at 0 velocity.
    // Under this assumption the max velocity is half the speed.

    // [NORMALDC] +v/5 Strike, FMove
    // ((STR/2) + (v/10))d6; attacker takes 1/3 damage
    if ((item.system.EFFECT || "").match(/v\/\d/)) {
        const velocity = parseInt(options?.velocity || 0);
        const divisor = parseInt(item.system.EFFECT.match(/v\/(\d+)/)[1]);
        const velocityDc = Math.floor(velocity / divisor); // There is no rounding

        const velocityDiceParts = calculateDicePartsFromDcForItem(item, velocityDc);
        const formula = dicePartsToEffectFormula(velocityDiceParts);

        // Velocity adding to normal damage does not count towards any doubling rules.
        const bundleToUse = item.system.killing ? addedDamageBundle : velocityDamageBundle;

        if (velocityDc > 0) {
            bundleToUse.diceParts = addDiceParts(item, bundleToUse.diceParts, velocityDiceParts);
            bundleToUse.tags.push({
                value: `${formula}`,
                name: "Velocity",
                title: `Velocity (${velocity}/${divisor}) -> ${formula}`,
            });
        }
    }

    // Applied effects
    for (const ae of item.actor?.appliedEffects.filter((ae) => !ae.disabled && ae.flags?.target === item.uuid) || []) {
        for (const change of ae.changes.filter(
            (change) => change.key === "system.value" && change.value !== 0 && change.mode === 2,
        )) {
            const value = parseInt(change.value);
            const aeDiceParts = calculateDicePartsFromDcForItem(item, value);
            const formula = dicePartsToEffectFormula(aeDiceParts);

            addedDamageBundle.diceParts = addDiceParts(item, addedDamageBundle.diceParts, aeDiceParts);
            addedDamageBundle.tags.push({
                value: `${formula}`,
                name: ae.name,
                title: `${value}DC -> ${formula}`,
            });
        }
    }

    // Is there a haymaker active and thus part of this attack? Haymaker is added in without consideration of advantages in 5e but not in 6e.
    // Also in 5e killing haymakers get the DC halved.
    const haymakerManeuverActive = item.actor?.items.find(
        (item) => item.type === "maneuver" && item.name === "Haymaker" && item.system.active,
    );
    if (haymakerManeuverActive) {
        // Can haymaker anything except for maneuvers because it is a maneuver itself. The strike manuever is the 1 exception.
        // PH: FIXME: Implement the exceptions: See 6e v2 pg. 99. 5e has none?
        if (!["maneuver", "martialart"].includes(item.type) || (item.type === "maneuver" && item.name === "Strike")) {
            const rawHaymakerDc = parseInt(haymakerManeuverActive.system.DC);

            let haymakerDC = rawHaymakerDc;
            if (item.is5e && item.system.killing) {
                haymakerDC = Math.floor(rawHaymakerDc / 2);
            }

            // 5e does not consider advantages so we have to compensate and as a consequence we may have a fractional DC (yes, the rules are not self consistent).
            // 6e is sensible in this regard.
            const alteredHaymakerDc = item.is5e ? haymakerDC * (1 + item.system._advantagesDc) : haymakerDC;
            const haymakerDiceParts = calculateDicePartsFromDcForItem(item, alteredHaymakerDc);
            const formula = dicePartsToEffectFormula(haymakerDiceParts);

            addedDamageBundle.diceParts = addDiceParts(item, addedDamageBundle.diceParts, haymakerDiceParts);
            addedDamageBundle.tags.push({
                value: `${formula}`,
                name: "Haymaker",
                title: `${rawHaymakerDc}DC${haymakerDC !== rawHaymakerDc ? " halved due to 5e killing attack" : ""} -> ${formula}`,
            });
        } else {
            // PH: FIXME: This is a poor location for this. Better off in the to hit code and reject immediately.
            if (options?.isAction)
                ui.notifications.warn("Haymaker cannot be combined with another maneuver except Strike.", {
                    localize: true,
                });
        }
    }

    // // WEAPON MASTER (also check that item is present as a custom ADDER)
    // const weaponMaster = item.actor?.items.find((item) => item.system.XMLID === "WEAPON_MASTER");
    // if (weaponMaster) {
    //     const weaponMatch = (weaponMaster.system.ADDER || []).find((o) => o.XMLID === "ADDER" && o.ALIAS === item.name);
    //     if (weaponMatch) {
    //         const dcPlus = 3 * Math.max(1, parseInt(weaponMaster.system.LEVELS) || 1);
    //         addedDc.dc += dcPlus;
    //         addedDc.tags.push({
    //             value: `${dcPlus}DC`,
    //             name: "WeaponMaster",
    //             title: `${dcPlus.signedString()}DC`,
    //         });
    //     }
    // }

    // // DEADLYBLOW
    // // Only check if it has been turned off
    // // FIXME: This function should not be changing the item.system. Please fix me by moving to something in the user flow.
    // // PH: FIXME: this should work for all deadlyBlows
    // const deadlyBlow = item.actor?.items.find((o) => o.system.XMLID === "DEADLYBLOW");
    // if (deadlyBlow) {
    //     item.system.conditionalAttacks ??= {};
    //     item.system.conditionalAttacks[deadlyBlow.id] = deadlyBlow;
    //     item.system.conditionalAttacks[deadlyBlow.id].system.checked ??= true;
    // }

    // if (item.actor) {
    //     for (const key in item.system.conditionalAttacks) {
    //         const conditionalAttack = item.actor.items.find((item) => item.id === key);
    //         if (!conditionalAttack) {
    //             // FIXME: This is the wrong place to be playing with the database. Should be done at the
    //             //            to hit phase.
    //             // Quench and other edge cases where item.id is null
    //             if (item.id) {
    //                 console.warn("conditionalAttack is empty");
    //                 delete item.system.conditionalAttacks[key];
    //                 // NOTE: typically we await here, but this isn't an async function.
    //                 // Shouldn't be a problem.
    //                 item.update({
    //                     [`system.conditionalAttacks`]: item.system.conditionalAttacks,
    //                 });
    //             }
    //             continue;
    //         }

    //         // If unchecked or missing then assume it is enabled
    //         if (!conditionalAttack.system.checked) continue;

    //         // Make sure conditionalAttack applies (only for DEADLYBLOW at the moment)
    //         if (typeof conditionalAttack.baseInfo?.appliesTo === "function") {
    //             if (!conditionalAttack.baseInfo.appliesTo(item)) continue;
    //         }

    //         switch (conditionalAttack.system.XMLID) {
    //             case "DEADLYBLOW": {
    //                 if (!options?.ignoreDeadlyBlow) {
    //                     const deadlyDc = 3 * Math.max(1, parseInt(conditionalAttack.system.LEVELS) || 1);
    //                     addedDc.dc += deadlyDc;
    //                     addedDc.tags.push({
    //                         value: `${deadlyDc}DC`,
    //                         name: "DeadlyBlow",
    //                         title: conditionalAttack.system.OPTION_ALIAS,
    //                     });
    //                 }

    //                 break;
    //             }

    //             default:
    //                 console.warn("Unhandled conditionalAttack", conditionalAttack);
    //         }
    //     }
    // }

    // FIXME: Environmental Movement: Aquatic Environments should actually counteract this.
    if (item.actor?.statuses?.has("underwater")) {
        const underwaterDc = 2; // NOTE: Working with 2 DC and then subtracting
        const underwaterDiceParts = calculateDicePartsFromDcForItem(item, underwaterDc);
        const formula = dicePartsToEffectFormula(underwaterDiceParts);

        addedDamageBundle.diceParts = subtractDiceParts(item, addedDamageBundle.diceParts, underwaterDiceParts);
        addedDamageBundle.tags.push({
            value: `-(${formula})`,
            name: "Underwater",
            title: `-${underwaterDc}DC -> ${formula}`,
        });
    }

    return {
        addedDamageBundle,
        velocityDamageBundle,
    };
}

/**
 * Given a number of DCs, return the dice formula parts for this item
 *
 * NOTE: This is ugly because with floating point calculations we need to use epsilon comparisons (see https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/ for instance)
 *       To work around the need for epsilon comparison we just multiply by a large enough number that we're just doing integer math and ignoring the mantissa.
 *
 * A 3AP/die attack: +1 pip is 1 point, +1/2d6 is 2 points, and +1d6 is 3 points.
 * This makes 3 possible breakpoints x.0, x.3333, x.6666 for any whole number x >=0 when we divide by the AP/3 to get the num of dice.
 *
 * A 5AP/die normal attack like energy blast: +1 pip is 2 points, +1/2d6 is 3 points, and +1d6 is 5 points.
 * This makes 3 possible breakpoints x.0, x.4, x.6 for any whole number x >=0 when we divide by the AP/5 to get the num of dice.
 *
 * A 10AP/die normal attack like ego attack: +1 pip is 3 points, +1/2d6 is 5 points, and +1d6 is 10 points.
 * This makes 3 possible breakpoints x.0, x.3, x.5 for any whole number x >=0 when we divide by the AP/10 to get the num of dice.
 *
 * A 15 AP/die killing attack: +1 pip is 5 points, +1/2d6 or +1d6-1 is 10 points, and +1d6 is 15 points.
 * This makes 3 possible breakpoints x.0, x.3333, x.6666 for any whole number x >=0 when we divide by the AP/15 to get the num of dice.
 *
 * @param {HeroSystem6eItem} item
 * @param {number} dc
 * @returns
 */
export function calculateDicePartsFromDcForItem(item, dc) {
    // Since the smallest interval is 0.3 to 0.5 so 0.099 is probably the smallest. However, the results don't match tables we see in 6e vol 2 p.97.
    // It's possible a better algorithm would produce something better but with this one:
    // 0.066666 appears to be too large. (1DC KA @ +1/4)
    // 0.04 appears to be too large. (1DC EA @ +1)
    // Epsilon observations also possibly indicate that the rules only use one of the attack types to determine part dice.
    const epsilon = 0.039;

    const isMartialOrManeuver = ["maneuver", "martialart"].includes(item.type);
    let martialOrManeuverEquivalentApPerDice = 0;
    if (isMartialOrManeuver) {
        const effect = item.system.EFFECT;
        if (effect.search("NORMALDC") !== -1) {
            martialOrManeuverEquivalentApPerDice = 5;
        } else if (effect.search("NNDDC") !== -1) {
            martialOrManeuverEquivalentApPerDice = 10;
        } else if (effect.search("KILLINGDC") !== -1) {
            martialOrManeuverEquivalentApPerDice = 15;
        } else {
            // FIXME: We shouldn't be calculating damage dice for things that don't do damage
            // Most maneuvers don't do damage. However there are some that use STR as a base so assume normal damage.
            martialOrManeuverEquivalentApPerDice = 5;
        }
    }

    const baseApPerDie =
        martialOrManeuverEquivalentApPerDice ||
        (item.system.XMLID === "TELEKINESIS" ? 5 : undefined) || // PH: FIXME: Kludge for time being. TK Behaves like strength
        item.baseInfo.costPerLevel(item);

    // const baseApPerDie =
    //     martialOrManeuverEquivalentApPerDice ||
    //     (item.system.XMLID === "TELEKINESIS" ? 5 : undefined) || // PH: FIXME: Kludge for time being. TK Behaves like strength
    //     item.system.basePointsPlusAdders / diceParts.dc;

    const fullDieValue = 1;
    let halfDieValue;
    let pipValue;
    if (baseApPerDie === 3) {
        halfDieValue = 2 / 3;
        pipValue = 1 / 3;
    } else if (baseApPerDie === 5) {
        halfDieValue = 3 / 5;
        pipValue = 2 / 5;
    } else if (baseApPerDie === 10) {
        halfDieValue = 5 / 10;
        pipValue = 3 / 10;
    } else if (baseApPerDie === 15) {
        halfDieValue = 10 / 15;
        pipValue = 5 / 15;
    } else {
        console.error(`Unhandled die of damage cost ${baseApPerDie} for ${item.name}/${item.system.XMLID}`);
    }

    let apPerDie;
    if (!isMartialOrManeuver) {
        // Some ugly stuff to deal with the case where we have adders to the base powers. We need to figure out
        // how much a die actually costs.
        // FIXME: would be nice to pull out the TK exception/special handling.
        const { diceParts } = item.baseInfo.baseEffectDiceParts(item, {});
        let diceValue = 0;
        diceValue += diceParts.d6Count * fullDieValue;
        diceValue += (diceParts.d6Less1DieCount + diceParts.halfDieCount) * halfDieValue;
        diceValue += diceParts.constant * pipValue;
        apPerDie =
            item.system.XMLID === "TELEKINESIS"
                ? 5 * (1 + item.system._advantagesDc)
                : item.system.activePointsDc / diceValue;
    } else {
        apPerDie = baseApPerDie * (1 + item.system._advantagesDc); // PH: FIXME: Shouldn't be able to be advantaged...
    }

    // MartialArts & Maneuvers have DC and no advantages. Others have active points with some advantages that contribute to DC.
    // See FRed pp 403, 404 6e vol 2 pp 96, 97
    const diceOfDamage = dc * (5 / apPerDie);

    const d6Count = Math.floor(diceOfDamage);
    const halfDieCount = (diceOfDamage % fullDieValue) - halfDieValue > -epsilon ? 1 : 0;
    const constant =
        item.system.XMLID === "TELEKINESIS"
            ? 0
            : (diceOfDamage % fullDieValue) - pipValue > -epsilon && !halfDieCount
              ? 1
              : 0;

    return {
        dc,
        d6Count,
        halfDieCount: halfDieCount,

        // PH: FIXME: Not implemented yet
        d6Less1DieCount: 0,
        constant,
    };
}

/**
 * Add two dice parts together by DCs and then update rest of the dice parts to match the DC.
 * For example: 1/2d6 + 1/2d6 = 1d6+1 when we're talking about a straight 15 AP/die killing attack (i.e. 2DC + 2DC = 4DC)
 *              1/2d6 + 1/2d6 = 1d6 when we're talking about a straight 10 AP/die ego attack (i.e. 1DC + 1DC = 2DC)
 * @param {HeroSystem6eItem} item
 * @param {HeroSystemFormulaDiceParts} firstDiceParts
 * @param {HeroSystemFormulaDiceParts} secondDiceParts
 * @param {boolean} useDieMinusOne
 * @returns
 */
export function addDiceParts(item, firstDiceParts, secondDiceParts, useDieMinusOne) {
    const firstDc = firstDiceParts.dc;
    const secondDc = secondDiceParts.dc;
    const dcSum = firstDc + secondDc;

    const diceParts = calculateDicePartsFromDcForItem(item, dcSum);
    if (useDieMinusOne) {
        diceParts.d6Less1DieCount = diceParts.halfDieCount;
        diceParts.halfDieCount = 0;
    }

    return diceParts;
}

/**
 * Subtract the second dice parts from the first dice parts by steps and not straight math.
 * For example: 1d6+1 - 1 = 1d6 when we're talking about a straight 15 AP/die killing attack (i.e. 4DC - 1DC = 3DC)
 *              1d6 - 1/2d6 = 1/2d6 when we're talking about a straight 10 AP/die ego attack (i.e. 2DC - 1DC = 1DC)
 * @param {HeroSystem6eItem} item
 * @param {HeroSystemFormulaDiceParts} firstDiceParts
 * @param {HeroSystemFormulaDiceParts} secondDiceParts
 * @param {boolean} useDieMinusOne - Should it try to return 1d6-1 rather than 1/2d6
 * @returns
 */
export function subtractDiceParts(item, firstDiceParts, secondDiceParts, useDieMinusOne) {
    const firstDc = firstDiceParts.dc;
    const secondDc = secondDiceParts.dc;
    const dcSub = firstDc - secondDc;

    const diceParts = calculateDicePartsFromDcForItem(item, dcSub);
    if (useDieMinusOne) {
        diceParts.d6Less1DieCount = diceParts.halfDieCount;
        diceParts.halfDieCount = 0;
    }

    return diceParts;
}

/**
 * Calculate the damage dice parts for an item based on the given options
 *
 * @param {HeroSystem6eItem} item
 * @param {Object} options
 * @returns {HeroSystemFormulaDicePartsBundle}
 */
export function calculateDicePartsForItem(item, options) {
    const doubleDamageLimitTags = [];
    const { diceParts: baseDiceParts, tags: baseTags } = item.baseInfo.baseEffectDiceParts(item, options);
    const {
        addedDamageBundle: { diceParts: addedDiceParts, tags: extraTags },
        velocityDamageBundle: { diceParts: velocityDiceParts, tags: velocityTags },
    } = calculateAddedDicePartsFromItem(item, options);
    const useDieMinusOne = !!item.findModsByXmlid("MINUSONEPIP");

    // Max Doubling Rules
    // 5e rule and 6e optional rule: A character cannot more than double the Damage Classes of their base attack, no
    // matter how many different methods they use to add damage.
    let sumDiceParts = addDiceParts(item, baseDiceParts, addedDiceParts, useDieMinusOne);
    if (doubleDamageLimit()) {
        // PH: FIXME: Need to implement these:
        // Exceptions to the rule (because it wouldn't be the hero system without exceptions) from FRed pg. 405:
        // 1) Weapons that do normal damage (this really means not killing attacks) in superheroic campaigns
        // 2) extra damage classes for unarmed martial maneuvers
        // 3) movement bonuses to normal damage (this really means not killing attacks)

        const baseDc = baseDiceParts.dc;
        const addDc = addedDiceParts.dc;

        const excessDc = addDc - baseDc;
        if (excessDc > 0) {
            const baseFormula = dicePartsToEffectFormula(baseDiceParts);
            const addedFormula = dicePartsToEffectFormula(addedDiceParts);

            const excessDiceParts = calculateDicePartsFromDcForItem(item, excessDc);
            const excessFormula = dicePartsToEffectFormula(excessDiceParts);
            doubleDamageLimitTags.push({
                value: `-(${excessFormula})`,
                name: "Double damage limit",
                title: `Base ${baseFormula}. Added ${addedFormula}. ${game.i18n.localize("Settings.DoubleDamageLimit.Hint")}`,
            });

            sumDiceParts = subtractDiceParts(item, sumDiceParts, excessDiceParts, useDieMinusOne);
        }
    }

    // Add velocity contributions too which were excluded from doubling considerations
    sumDiceParts = addDiceParts(item, sumDiceParts, velocityDiceParts, useDieMinusOne);

    // PH: FIXME: Should probably cap
    // // Doesn't really feel right to allow a total DC of less than 0 so cap it.
    // const finalDc = Math.max(0, baseDc.dc + addedDc.dc);

    return {
        diceParts: sumDiceParts,
        tags: [...baseTags, ...extraTags, ...doubleDamageLimitTags, ...velocityTags],
    };
}

export function getEffectForumulaFromItem(item, options) {
    // PH: FIXME: Need to stop looking at end returned from other functions.
    const { diceParts } = calculateDicePartsForItem(item, options);

    return dicePartsToEffectFormula(diceParts);
}

export function getFullyQualifiedEffectFormulaFromItem(item, options) {
    return `${getEffectForumulaFromItem(item, options)}${item.system.killing ? "K" : ""}`;
}

export function dicePartsToEffectFormula(diceParts) {
    return `${
        diceParts.d6Count + diceParts.d6Less1DieCount + diceParts.halfDieCount > 0
            ? `${
                  diceParts.d6Count + diceParts.d6Less1DieCount
                      ? `${diceParts.d6Count + diceParts.d6Less1DieCount}`
                      : ""
              }${diceParts.halfDieCount ? `½` : ""}d6`
            : ""
    }${
        diceParts.constant
            ? diceParts.d6Count + diceParts.d6Less1DieCount + diceParts.halfDieCount > 0
                ? "+1"
                : "1"
            : diceParts.d6Count + diceParts.d6Less1DieCount + diceParts.halfDieCount > 0
              ? `${diceParts.d6Less1DieCount > 0 ? "-1" : ""}`
              : "0"
    }`;
}

function addStrengthToBundle(item, options, dicePartsBundle) {
    // PH: FIXME: Need to figure in all the crazy rules around STR and STR with advantage

    const baseEffectiveStrength = effectiveStrength(item, options);
    let str = baseEffectiveStrength;

    // PH: FIXME: Review the STRMINIMUM stuff in 5e and 6e.
    // // STRMINIMUM
    // // A character using a weapon only adds damage for every full 5 points of STR he has above the weapon’s STR Minimum
    // const STRMINIMUM = item.findModsByXmlid("STRMINIMUM");
    // if (STRMINIMUM) {
    //     const strMinimum = parseInt(STRMINIMUM.OPTION_ALIAS.match(/\d+/)?.[0] || 0);
    //     const strMinDc = Math.ceil(strMinimum / 5);
    //     addedDamage.dc -= strMinDc;
    //     addedDamage.tags.push({
    //         value: `-${strMinDc}DC`,
    //         name: "STR Minimum",
    //         title: `${STRMINIMUM.OPTION_ALIAS} ${STRMINIMUM.ALIAS}`,
    //     });
    // }

    // MOVEBY halves STR
    if (item.system.XMLID === "MOVEBY") {
        str = RoundFavorPlayerUp(str / 2);
    }

    // NOTE: intentionally using fractional DC here.
    const strDiceParts = calculateDicePartsFromDcForItem(item, str / 5);
    const formula = dicePartsToEffectFormula(strDiceParts);

    if (str !== 0) {
        dicePartsBundle.diceParts = addDiceParts(item, dicePartsBundle.diceParts, strDiceParts);
        dicePartsBundle.tags.push({
            value: `+${formula}`,
            name: "STR",
            title: `${str} STR${item.system.XMLID === "MOVEBY" ? " halved due to MOVEBY" : ""} -> ${formula}`,
        });
    }

    return str;
}

export function maneuverBaseEffectDiceParts(item, options) {
    const baseDicePartsBundle = {
        diceParts: zeroDiceParts,
        tags: [],
    };

    // If unarmed combat
    if (["maneuver", "martialart"].includes(item.type) && !item.system.USEWEAPON) {
        // For Haymaker (with Strike presumably) and Martial Maneuvers, STR is the main weapon and the maneuver is additional damage
        if (isNonKillingStrengthBasedManeuver(item)) {
            const str = addStrengthToBundle(item, options, baseDicePartsBundle);

            // If a character is using at least a 1/2 d6 of STR they can add HA damage and it will figure into the base
            // strength for damage purposes.
            if (str >= 3) {
                const hthAttacks = item.actor?.items.filter((item) => item.system.XMLID === "HANDTOHANDATTACK") || [];
                hthAttacks.forEach((hthAttack) => {
                    const { diceParts: hthAttackDiceParts, tags } = hthAttack.baseInfo.baseEffectDiceParts(
                        hthAttack,
                        options,
                    );
                    baseDicePartsBundle.diceParts = addDiceParts(
                        item,
                        baseDicePartsBundle.diceParts,
                        hthAttackDiceParts,
                    );
                    baseDicePartsBundle.tags.push(tags);
                });
            }
        } else {
            let itemBaseDc = parseInt(item.system.DC);
            // In 5e only, DCs for killing attacks are halved.
            if (item.is5e && item.system.killing) {
                itemBaseDc = Math.floor(itemBaseDc / 2);
            }

            baseDicePartsBundle.diceParts = calculateDicePartsFromDcForItem(item, itemBaseDc);
        }

        // 5e martial arts EXTRADCs are baseDCs. Do the same for 6e in case they use the optional damage doubling rules too.
        if (item.type === "martialart" && !item.system.USEWEAPON) {
            addExtraDcsToBundle(item, baseDicePartsBundle, true);
        }

        return baseDicePartsBundle;
    }

    // PH: FIXME: Clean this up

    // If using a weapon
    else if (["maneuver", "martialart"].includes(item.type) && item.system.USEWEAPON) {
        // PH: FIXME: Damage is the weapon
        console.error(`${item.name}/${item.system.XMLID} weapon combat is not implemented`);
    } else {
        console.error(`${item.name}/${item.system.XMLID} should not be calling MANEUVER base damage`);
    }

    return {
        diceParts: {
            dc: 0,
            d6Count: 0,
            d6Less1DieCount: 0,
            halfDieCount: 0,
            constant: 0,
        },
        tags: [],
    };
}

export function calculateDcFromItem(item) {
    console.error(`${item.name}/${item.system.XMLID} called calculateDcFromItem`);

    return { end: 0 };
}
