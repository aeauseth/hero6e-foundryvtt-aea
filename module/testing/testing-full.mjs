import { HEROSYS } from "../herosystem6e.mjs";
import { HeroSystem6eActor } from "../actor/actor.mjs";
import {
    combatSkillLevelsForAttack,
    getEffectFormulaFromItem,
    getFullyQualifiedEffectFormulaFromItem,
} from "../utility/damage.mjs";

export function registerFullTests(quench) {
    quench.registerBatch(
        "hero6efoundryvttv2.utils.full",
        (context) => {
            const { afterEach, assert, before, beforeEach, describe, it } = context;

            describe("Characteristics 5e simple", function () {
                const contents = `
                    <?xml version="1.0" encoding="UTF-16"?>
                    <CHARACTER version="6.0" TEMPLATE="builtIn.Superheroic.hdt">
                    <BASIC_CONFIGURATION BASE_POINTS="200" DISAD_POINTS="150" EXPERIENCE="0" RULES="Default" />
                    <CHARACTER_INFO CHARACTER_NAME="5e superhero simple" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.46224760379584" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                        <BACKGROUND />
                        <PERSONALITY />
                        <QUOTE />
                        <TACTICS />
                        <CAMPAIGN_USE />
                        <APPEARANCE />
                        <NOTES1 />
                        <NOTES2 />
                        <NOTES3 />
                        <NOTES4 />
                        <NOTES5 />
                    </CHARACTER_INFO>
                    <CHARACTERISTICS>
                        <STR XMLID="STR" ID="1683328673465" BASECOST="0.0" LEVELS="1" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STR>
                        <DEX XMLID="DEX" ID="1683328012642" BASECOST="0.0" LEVELS="2" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DEX>
                        <CON XMLID="CON" ID="1683331008620" BASECOST="0.0" LEVELS="3" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </CON>
                        <BODY XMLID="BODY" ID="1683328674200" BASECOST="0.0" LEVELS="4" ALIAS="BODY" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </BODY>
                        <INT XMLID="INT" ID="1683331009492" BASECOST="0.0" LEVELS="5" ALIAS="INT" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </INT>
                        <EGO XMLID="EGO" ID="1683331009412" BASECOST="0.0" LEVELS="6" ALIAS="EGO" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </EGO>
                        <PRE XMLID="PRE" ID="1683331008889" BASECOST="0.0" LEVELS="7" ALIAS="PRE" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PRE>
                        <COM XMLID="COM" ID="1683331009574" BASECOST="0.0" LEVELS="8" ALIAS="COM" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </COM>
                        <PD XMLID="PD" ID="1683331009505" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PD>
                        <ED XMLID="ED" ID="1683331009320" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </ED>
                        <SPD XMLID="SPD" ID="1683328013371" BASECOST="0.0" LEVELS="2" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SPD>
                        <REC XMLID="REC" ID="1683331009019" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </REC>
                        <END XMLID="END" ID="1683331008978" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </END>
                        <STUN XMLID="STUN" ID="1683331009203" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STUN>
                        <RUNNING XMLID="RUNNING" ID="1683328673592" BASECOST="0.0" LEVELS="21" ALIAS="Running" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </RUNNING>
                        <SWIMMING XMLID="SWIMMING" ID="1683328673922" BASECOST="0.0" LEVELS="26" ALIAS="Swimming" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SWIMMING>
                        <LEAPING XMLID="LEAPING" ID="1683328674010" BASECOST="0.0" LEVELS="27" ALIAS="Leaping" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </LEAPING>
                    </CHARACTERISTICS>
                    <SKILLS />
                    <PERKS />
                    <TALENTS />
                    <MARTIALARTS />
                    <POWERS />
                    <DISADVANTAGES />
                    <EQUIPMENT />
                    </CHARACTER>
                `;

                let actor;

                before(async () => {
                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);
                });

                it("name", async function () {
                    console.log("name");
                    assert.equal(actor.name, "5e superhero simple");
                });

                it("str.max", async function () {
                    assert.equal(actor.system.characteristics.str.max, 11);
                });
                it("str.realCost", async function () {
                    assert.equal(actor.system.characteristics.str.realCost, 1);
                });

                it("dex.max", async function () {
                    assert.equal(actor.system.characteristics.dex.max, 12);
                });
                it("dex.realCost", async function () {
                    assert.equal(actor.system.characteristics.dex.realCost, 6);
                });

                it("con.max", async function () {
                    assert.equal(actor.system.characteristics.con.max, 13);
                });
                it("con.realCost", async function () {
                    assert.equal(actor.system.characteristics.con.realCost, 6);
                });

                it("body.max", async function () {
                    assert.equal(actor.system.characteristics.body.max, 14);
                });
                it("body.realCost", async function () {
                    assert.equal(actor.system.characteristics.body.realCost, 8);
                });

                it("int.max", async function () {
                    assert.equal(actor.system.characteristics.int.max, 15);
                });
                it("int.realCost", async function () {
                    assert.equal(actor.system.characteristics.int.realCost, 5);
                });

                it("ego.max", async function () {
                    assert.equal(actor.system.characteristics.ego.max, 16);
                });
                it("ego.realCost", async function () {
                    assert.equal(actor.system.characteristics.ego.realCost, 12);
                });

                it("pre.max", async function () {
                    assert.equal(actor.system.characteristics.pre.max, 17);
                });
                it("pre.realCost", async function () {
                    assert.equal(actor.system.characteristics.pre.realCost, 7);
                });

                it("com.max", async function () {
                    assert.equal(actor.system.characteristics.com.max, 18);
                });
                it("com.realCost", async function () {
                    assert.equal(actor.system.characteristics.com.realCost, 4);
                });

                it("pd.max", async function () {
                    assert.equal(actor.system.characteristics.pd.max, 2);
                });
                it("pd.realCost", async function () {
                    assert.equal(actor.system.characteristics.pd.realCost, 0);
                });

                it("ed.max", async function () {
                    assert.equal(actor.system.characteristics.ed.max, 3);
                });
                it("ed.realCost", async function () {
                    assert.equal(actor.system.characteristics.ed.realCost, 0);
                });

                it("spd.max", async function () {
                    assert.equal(actor.system.characteristics.spd.max, 4);
                });
                it("spd.realCost", async function () {
                    assert.equal(actor.system.characteristics.spd.realCost, 18);
                });

                it("rec.max", async function () {
                    assert.equal(actor.system.characteristics.rec.max, 5);
                });
                it("rec.realCost", async function () {
                    assert.equal(actor.system.characteristics.rec.realCost, 0);
                });

                it("end.max", async function () {
                    assert.equal(actor.system.characteristics.end.max, 26);
                });
                it("end.realCost", async function () {
                    assert.equal(actor.system.characteristics.end.realCost, 0);
                });

                it("stun.max", async function () {
                    assert.equal(actor.system.characteristics.stun.max, 27);
                });
                it("stun.realCost", async function () {
                    assert.equal(actor.system.characteristics.stun.realCost, 0);
                });

                it("ocv.max", async function () {
                    assert.equal(actor.system.characteristics.ocv.max, 4);
                });
                it("ocv.realCost", async function () {
                    assert.equal(actor.system.characteristics.ocv.realCost, 0);
                });

                it("dcv.max", async function () {
                    assert.equal(actor.system.characteristics.dcv.max, 4);
                });
                it("dcv.realCost", async function () {
                    assert.equal(actor.system.characteristics.dcv.realCost, 0);
                });

                it("omcv.max", async function () {
                    assert.equal(actor.system.characteristics.omcv.max, 5);
                });
                it("omcv.realCost", async function () {
                    assert.equal(actor.system.characteristics.omcv.realCost, 0);
                });

                it("dmcv.max", async function () {
                    assert.equal(actor.system.characteristics.dmcv.max, 5);
                });
                it("dmcv.realCost", async function () {
                    assert.equal(actor.system.characteristics.dmcv.realCost, 0);
                });

                it("running.max", async function () {
                    assert.equal(actor.system.characteristics.running.max, 27);
                });
                it("running.realCost", async function () {
                    assert.equal(actor.system.characteristics.running.realCost, 42);
                });

                it("swimming.max", async function () {
                    assert.equal(actor.system.characteristics.swimming.max, 28);
                });
                it("swimming.realCost", async function () {
                    assert.equal(actor.system.characteristics.swimming.realCost, 26);
                });

                it("leaping.max", async function () {
                    assert.equal(actor.system.characteristics.leaping.max, 29);
                });
                it("leaping.realCost", async function () {
                    assert.equal(actor.system.characteristics.leaping.realCost, 27);
                });

                it("tunneling.max", async function () {
                    assert.equal(actor.system.characteristics.tunneling.max, 0);
                });
                it("tunneling.realCost", async function () {
                    assert.equal(actor.system.characteristics.tunneling.realCost, 0);
                });

                it("flight.max", async function () {
                    assert.equal(actor.system.characteristics.flight.max, 0);
                });
                it("flight.realCost", async function () {
                    assert.equal(actor.system.characteristics.flight.realCost, 0);
                });

                it("gliding.max", async function () {
                    assert.equal(actor.system.characteristics.gliding.max, 0);
                });
                it("gliding.realCost", async function () {
                    assert.equal(actor.system.characteristics.gliding.realCost, 0);
                });

                it("realCost", async function () {
                    assert.equal(actor.system.realCost, 162);
                });

                it("activePoints", async function () {
                    assert.equal(actor.system.activePoints, 162);
                });
            });

            describe("Characteristics 5e buyback", function () {
                const contents = `
                <?xml version="1.0" encoding="UTF-16"?>
                <CHARACTER version="6.0" TEMPLATE="builtIn.Superheroic.hdt">
                  <BASIC_CONFIGURATION BASE_POINTS="200" DISAD_POINTS="150" EXPERIENCE="0" RULES="Default" />
                  <CHARACTER_INFO CHARACTER_NAME="5e superhero" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.46224760379584" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                    <BACKGROUND />
                    <PERSONALITY />
                    <QUOTE />
                    <TACTICS />
                    <CAMPAIGN_USE />
                    <APPEARANCE />
                    <NOTES1 />
                    <NOTES2 />
                    <NOTES3 />
                    <NOTES4 />
                    <NOTES5 />
                  </CHARACTER_INFO>
                  <CHARACTERISTICS>
                    <STR XMLID="STR" ID="1683328673465" BASECOST="0.0" LEVELS="-5" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </STR>
                    <DEX XMLID="DEX" ID="1683328012642" BASECOST="0.0" LEVELS="-5" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </DEX>
                    <CON XMLID="CON" ID="1683331008620" BASECOST="0.0" LEVELS="-5" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </CON>
                    <BODY XMLID="BODY" ID="1683328674200" BASECOST="0.0" LEVELS="-5" ALIAS="BODY" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </BODY>
                    <INT XMLID="INT" ID="1683331009492" BASECOST="0.0" LEVELS="-5" ALIAS="INT" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </INT>
                    <EGO XMLID="EGO" ID="1683331009412" BASECOST="0.0" LEVELS="-5" ALIAS="EGO" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </EGO>
                    <PRE XMLID="PRE" ID="1683331008889" BASECOST="0.0" LEVELS="-5" ALIAS="PRE" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </PRE>
                    <COM XMLID="COM" ID="1683331009574" BASECOST="0.0" LEVELS="-5" ALIAS="COM" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </COM>
                    <PD XMLID="PD" ID="1683331009505" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </PD>
                    <ED XMLID="ED" ID="1683331009320" BASECOST="0.0" LEVELS="-1" ALIAS="ED" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </ED>
                    <SPD XMLID="SPD" ID="1683328013371" BASECOST="0.0" LEVELS="0" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </SPD>
                    <REC XMLID="REC" ID="1683331009019" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </REC>
                    <END XMLID="END" ID="1683331008978" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </END>
                    <STUN XMLID="STUN" ID="1683331009203" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </STUN>
                    <RUNNING XMLID="RUNNING" ID="1683328673592" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </RUNNING>
                    <SWIMMING XMLID="SWIMMING" ID="1683328673922" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </SWIMMING>
                    <LEAPING XMLID="LEAPING" ID="1683328674010" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                      <NOTES />
                    </LEAPING>
                  </CHARACTERISTICS>
                  <SKILLS />
                  <PERKS />
                  <TALENTS />
                  <MARTIALARTS />
                  <POWERS />
                  <DISADVANTAGES />
                  <EQUIPMENT />
                </CHARACTER>
                `;

                let actor;

                before(async () => {
                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);
                });

                it("name", async function () {
                    assert.equal(actor.name, "5e superhero");
                });

                it("str.max", async function () {
                    assert.equal(actor.system.characteristics.str.max, 5);
                });
                it("str.realCost", async function () {
                    assert.equal(actor.system.characteristics.str.realCost, -5);
                });

                it("dex.max", async function () {
                    assert.equal(actor.system.characteristics.dex.max, 5);
                });
                it("dex.realCost", async function () {
                    assert.equal(actor.system.characteristics.dex.realCost, -15);
                });

                it("con.max", async function () {
                    assert.equal(actor.system.characteristics.con.max, 5);
                });
                it("con.realCost", async function () {
                    assert.equal(actor.system.characteristics.con.realCost, -10);
                });

                it("body.max", async function () {
                    assert.equal(actor.system.characteristics.body.max, 5);
                });
                it("body.realCost", async function () {
                    assert.equal(actor.system.characteristics.body.realCost, -10);
                });

                it("int.max", async function () {
                    assert.equal(actor.system.characteristics.int.max, 5);
                });
                it("int.realCost", async function () {
                    assert.equal(actor.system.characteristics.int.realCost, -5);
                });

                it("ego.max", async function () {
                    assert.equal(actor.system.characteristics.ego.max, 5);
                });
                it("ego.realCost", async function () {
                    assert.equal(actor.system.characteristics.ego.realCost, -10);
                });

                it("pre.max", async function () {
                    assert.equal(actor.system.characteristics.pre.max, 5);
                });
                it("pre.realCost", async function () {
                    assert.equal(actor.system.characteristics.pre.realCost, -5);
                });

                it("com.max", async function () {
                    assert.equal(actor.system.characteristics.com.max, 5);
                });
                it("com.realCost", async function () {
                    assert.equal(actor.system.characteristics.com.realCost, -2);
                });

                it("pd.max", async function () {
                    assert.equal(actor.system.characteristics.pd.max, 1);
                });
                it("pd.realCost", async function () {
                    assert.equal(actor.system.characteristics.pd.realCost, 0);
                });

                it("ed.max", async function () {
                    assert.equal(actor.system.characteristics.ed.max, 0);
                });
                it("ed.realCost", async function () {
                    assert.equal(actor.system.characteristics.ed.realCost, -1);
                });

                it("spd.max", async function () {
                    assert.equal(actor.system.characteristics.spd.max, 1);
                });
                it("spd.realCost", async function () {
                    assert.equal(actor.system.characteristics.spd.realCost, 0);
                });

                it("rec.max", async function () {
                    assert.equal(actor.system.characteristics.rec.max, 2);
                });
                it("rec.realCost", async function () {
                    assert.equal(actor.system.characteristics.rec.realCost, 0);
                });

                it("end.max", async function () {
                    assert.equal(actor.system.characteristics.end.max, 10);
                });
                it("end.realCost", async function () {
                    assert.equal(actor.system.characteristics.end.realCost, 0);
                });

                it("stun.max", async function () {
                    assert.equal(actor.system.characteristics.stun.max, 11);
                });
                it("stun.realCost", async function () {
                    assert.equal(actor.system.characteristics.stun.realCost, 0);
                });

                it("ocv.max", async function () {
                    assert.equal(actor.system.characteristics.ocv.max, 2);
                });
                it("ocv.realCost", async function () {
                    assert.equal(actor.system.characteristics.ocv.realCost, 0);
                });

                it("dcv.max", async function () {
                    assert.equal(actor.system.characteristics.dcv.max, 2);
                });
                it("dcv.realCost", async function () {
                    assert.equal(actor.system.characteristics.dcv.realCost, 0);
                });

                it("omcv.max", async function () {
                    assert.equal(actor.system.characteristics.omcv.max, 2);
                });
                it("omcv.realCost", async function () {
                    assert.equal(actor.system.characteristics.omcv.realCost, 0);
                });

                it("dmcv.max", async function () {
                    assert.equal(actor.system.characteristics.dmcv.max, 2);
                });
                it("dmcv.realCost", async function () {
                    assert.equal(actor.system.characteristics.dmcv.realCost, 0);
                });

                it("running.max", async function () {
                    assert.equal(actor.system.characteristics.running.max, 6);
                });
                it("running.realCost", async function () {
                    assert.equal(actor.system.characteristics.running.realCost, 0);
                });

                it("swimming.max", async function () {
                    assert.equal(actor.system.characteristics.swimming.max, 2);
                });
                it("swimming.realCost", async function () {
                    assert.equal(actor.system.characteristics.swimming.realCost, 0);
                });

                it("leaping.max", async function () {
                    assert.equal(actor.system.characteristics.leaping.max, 1);
                });
                it("leaping.realCost", async function () {
                    assert.equal(actor.system.characteristics.leaping.realCost, 0);
                });

                it("realCost", async function () {
                    assert.equal(actor.system.realCost, -63);
                });

                it("activePoints", async function () {
                    assert.equal(actor.system.activePoints, -63);
                });
            });

            describe("Enforcer", function () {
                const contents = `
                <?xml version="1.0" encoding="UTF-16"?>
                <CHARACTER version="6.0" TEMPLATE="builtIn.Superheroic.hdt">
                <BASIC_CONFIGURATION BASE_POINTS="200" DISAD_POINTS="75" EXPERIENCE="382" RULES="Default" />
                <CHARACTER_INFO CHARACTER_NAME="Enforcer" ALTERNATE_IDENTITIES="Dima Evtushenko" PLAYER_NAME="GM" HEIGHT="78.74015748031496" WEIGHT="220.4622476037958" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="525ah" GENRE="Fantasy" GM="Raymond">
                    <BACKGROUND />
                    <PERSONALITY />
                    <QUOTE />
                    <TACTICS />
                    <CAMPAIGN_USE />
                    <APPEARANCE />
                    <NOTES1 />
                    <NOTES2 />
                    <NOTES3 />
                    <NOTES4 />
                    <NOTES5 />
                </CHARACTER_INFO>
                <CHARACTERISTICS>
                    <STR XMLID="STR" ID="1125625057687" BASECOST="0.0" LEVELS="45" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </STR>
                    <DEX XMLID="DEX" ID="1125625057688" BASECOST="0.0" LEVELS="10" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </DEX>
                    <CON XMLID="CON" ID="1125625057689" BASECOST="0.0" LEVELS="25" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </CON>
                    <BODY XMLID="BODY" ID="1125625057690" BASECOST="0.0" LEVELS="15" ALIAS="BODY" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </BODY>
                    <INT XMLID="INT" ID="1125625057691" BASECOST="0.0" LEVELS="5" ALIAS="INT" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </INT>
                    <EGO XMLID="EGO" ID="1125625057692" BASECOST="0.0" LEVELS="4" ALIAS="EGO" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </EGO>
                    <PRE XMLID="PRE" ID="1125625057693" BASECOST="0.0" LEVELS="12" ALIAS="PRE" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </PRE>
                    <COM XMLID="COM" ID="1125625057694" BASECOST="0.0" LEVELS="0" ALIAS="COM" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </COM>
                    <PD XMLID="PD" ID="1125625057695" BASECOST="0.0" LEVELS="14" ALIAS="PD" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </PD>
                    <ED XMLID="ED" ID="1125625057696" BASECOST="0.0" LEVELS="13" ALIAS="ED" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </ED>
                    <SPD XMLID="SPD" ID="1125625057697" BASECOST="0.0" LEVELS="2" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </SPD>
                    <REC XMLID="REC" ID="1125625057698" BASECOST="0.0" LEVELS="3" ALIAS="REC" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </REC>
                    <END XMLID="END" ID="1125625057699" BASECOST="0.0" LEVELS="15" ALIAS="END" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </END>
                    <STUN XMLID="STUN" ID="1125625057700" BASECOST="0.0" LEVELS="54" ALIAS="STUN" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </STUN>
                    <RUNNING XMLID="RUNNING" ID="1125625057701" BASECOST="0.0" LEVELS="2" ALIAS="Running" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </RUNNING>
                    <SWIMMING XMLID="SWIMMING" ID="1125625057702" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </SWIMMING>
                    <LEAPING XMLID="LEAPING" ID="1125625057703" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </LEAPING>
                </CHARACTERISTICS>
                <SKILLS>
                    <SKILL XMLID="COMBAT_LEVELS" ID="1125625270718" BASECOST="0.0" LEVELS="5" ALIAS="Combat Skill Levels" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="HTH" OPTIONID="HTH" OPTION_ALIAS="with HTH Combat" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="GENERAL" FAMILIARITY="No" PROFICIENCY="No">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="BREAKFALL" ID="1125625280078" BASECOST="3.0" LEVELS="0" ALIAS="Breakfall" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="DEX" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="CLIMBING" ID="1125625282609" BASECOST="3.0" LEVELS="0" ALIAS="Climbing" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="DEX" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="COMPUTER_PROGRAMMING" ID="1125625285031" BASECOST="3.0" LEVELS="2" ALIAS="Computer Programming" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="INT" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="CONCEALMENT" ID="1125625291109" BASECOST="3.0" LEVELS="0" ALIAS="Concealment" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="INT" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="INTERROGATION" ID="1125625316609" BASECOST="3.0" LEVELS="0" ALIAS="Interrogation" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="PRE" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="KNOWLEDGE_SKILL" ID="1125625319687" BASECOST="3.0" LEVELS="0" ALIAS="KS" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="Chess" CHARACTERISTIC="INT" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No" TYPE="General">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="KNOWLEDGE_SKILL" ID="1125625329453" BASECOST="3.0" LEVELS="0" ALIAS="KS" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="The Military/Mercenary/Terrorist World" CHARACTERISTIC="INT" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No" TYPE="General">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="KNOWLEDGE_SKILL" ID="1125625346671" BASECOST="3.0" LEVELS="0" ALIAS="KS" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="The KGB" CHARACTERISTIC="INT" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No" TYPE="General">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="LANGUAGES" ID="1125625359359" BASECOST="4.0" LEVELS="0" ALIAS="Language" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="IDIOMATIC" OPTIONID="IDIOMATIC" OPTION_ALIAS="native" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="Russian" FAMILIARITY="No" PROFICIENCY="No" NATIVE_TONGUE="Yes">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="LANGUAGES" ID="1125625374750" BASECOST="2.0" LEVELS="0" ALIAS="Language" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="FLUENT" OPTIONID="FLUENT" OPTION_ALIAS="fluent conversation" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="English" FAMILIARITY="No" PROFICIENCY="No" NATIVE_TONGUE="No">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="MECHANICS" ID="1125625385796" BASECOST="3.0" LEVELS="0" ALIAS="Mechanics" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="INT" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="PROFESSIONAL_SKILL" ID="1125625389078" BASECOST="3.0" LEVELS="0" ALIAS="PS" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="Thug" CHARACTERISTIC="INT" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="STEALTH" ID="1125625401625" BASECOST="3.0" LEVELS="0" ALIAS="Stealth" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="DEX" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="SURVIVAL" ID="1125625404828" BASECOST="0.0" LEVELS="0" ALIAS="Survival" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="INT" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                    <NOTES />
                    <ADDER XMLID="ARCTIC" ID="1125625439949" BASECOST="2.0" LEVELS="0" ALIAS="Arctic/Subarctic" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="MOUNTAIN" ID="1125625442200" BASECOST="2.0" LEVELS="0" ALIAS="Mountain" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="URBAN" ID="1125625444936" BASECOST="2.0" LEVELS="0" ALIAS="Urban" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    </SKILL>
                    <SKILL XMLID="TACTICS" ID="1125625419156" BASECOST="1.0" LEVELS="0" ALIAS="Tactics" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="INT" FAMILIARITY="Yes" PROFICIENCY="No" LEVELSONLY="No" EVERYMAN="No">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="TRANSPORT_FAMILIARITY" ID="1125625427531" BASECOST="0.0" LEVELS="0" ALIAS="TF" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="GENERAL" FAMILIARITY="No" PROFICIENCY="No">
                    <NOTES />
                    <ADDER XMLID="COMMONMOTORIZED" ID="1125625466341" BASECOST="2.0" LEVELS="0" ALIAS="Common Motorized Ground Vehicles" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="AIR" ID="1125625474282" BASECOST="0.0" LEVELS="0" ALIAS="Air Vehicles" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="NO">
                        <NOTES />
                        <ADDER XMLID="HELICOPTERS" ID="1125625472529" BASECOST="1.0" LEVELS="0" ALIAS="Helicopters" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                        </ADDER>
                        <ADDER XMLID="SMALLPLANES" ID="1125625474281" BASECOST="1.0" LEVELS="0" ALIAS="Small Planes" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                        </ADDER>
                    </ADDER>
                    <ADDER XMLID="UNCOMMONMOTORIZEDGROUNDVEHICLES" ID="1125625479349" BASECOST="0.0" LEVELS="0" ALIAS="Uncommon Motorized Ground Vehicles" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="NO">
                        <NOTES />
                        <ADDER XMLID="TRACKEDMILITARY" ID="1125625476533" BASECOST="1.0" LEVELS="0" ALIAS="Tracked Military Vehicles" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                        </ADDER>
                        <ADDER XMLID="WHEELEDMILITARY" ID="1125625479348" BASECOST="1.0" LEVELS="0" ALIAS="Wheeled Military Vehicles" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                        </ADDER>
                    </ADDER>
                    </SKILL>
                    <SKILL XMLID="WEAPON_FAMILIARITY" ID="1125625450265" BASECOST="0.0" LEVELS="0" ALIAS="WF" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="GENERAL" FAMILIARITY="No" PROFICIENCY="No">
                    <NOTES />
                    <ADDER XMLID="SMALLARMS" ID="1125625491552" BASECOST="2.0" LEVELS="0" ALIAS="Small Arms" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    </SKILL>
                </SKILLS>
                <PERKS>
                    <PERK XMLID="CONTACT" ID="1125625196265" BASECOST="0.0" LEVELS="2" ALIAS="Contact" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="old KGB Colonel">
                    <NOTES />
                    <ADDER XMLID="ACCESSTOINSTITUTIONS" ID="1125625241948" BASECOST="1.0" LEVELS="0" ALIAS="Contact has access to major institutions" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="GOODRELATIONSHIP" ID="1125625243918" BASECOST="1.0" LEVELS="0" ALIAS="Good relationship with Contact" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    </PERK>
                    <PERK XMLID="FOLLOWER" ID="1125625215265" BASECOST="0.0" LEVELS="0" ALIAS="Followers: 16 agents built on 25 Base Points plus 25 points from Disadvantages" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" NUMBER="16" BASEPOINTS="25" DISADPOINTS="25">
                    <NOTES />
                    </PERK>
                    <PERK XMLID="MONEY" ID="1125625263859" BASECOST="5.0" LEVELS="0" ALIAS="Money" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="WELL_OFF" OPTIONID="WELL_OFF" OPTION_ALIAS="Well Off" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="">
                    <NOTES />
                    </PERK>
                </PERKS>
                <TALENTS />
                <MARTIALARTS>
                    <EXTRADC XMLID="EXTRADC" ID="1695412964884" BASECOST="0.0" LEVELS="2" ALIAS="+2 HTH Damage Class(es)" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="">
                    <NOTES />
                    </EXTRADC>
                    <MANEUVER XMLID="MANEUVER" ID="1695412983750" BASECOST="5.0" LEVELS="0" ALIAS="Defensive Block" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Defensive Block" OCV="+1" DCV="+3" DC="0" PHASE="1/2" EFFECT="Block, Abort" ADDSTR="No" ACTIVECOST="25" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="Block, Abort">
                    <NOTES />
                    </MANEUVER>
                    <MANEUVER XMLID="MANEUVER" ID="1695412989539" BASECOST="5.0" LEVELS="0" ALIAS="Defensive Strike" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Defensive Strike" OCV="+1" DCV="+3" DC="0" PHASE="1/2" EFFECT="[NORMALDC] Strike" ADDSTR="Yes" ACTIVECOST="20" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="Weapon [WEAPONDC] Strike">
                    <NOTES />
                    </MANEUVER>
                    <MANEUVER XMLID="MANEUVER" ID="1695412995677" BASECOST="5.0" LEVELS="0" ALIAS="Flying Dodge" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Flying Dodge" OCV="--" DCV="+4" DC="0" PHASE="1/2" EFFECT="Dodge All Attacks, Abort; FMove" ADDSTR="No" ACTIVECOST="50" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No">
                    <NOTES />
                    </MANEUVER>
                    <MANEUVER XMLID="MANEUVER" ID="1695413002849" BASECOST="5.0" LEVELS="0" ALIAS="Joint Break" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Joint Break" OCV="-1" DCV="-2" DC="4" PHASE="1/2" EFFECT="Grab One Limb; [KILLINGDC], Disable" ADDSTR="Yes" ACTIVECOST="0" DAMAGETYPE="0" MAXSTR="30" STRMULT="1" USEWEAPON="No">
                    <NOTES />
                    </MANEUVER>
                    <MANEUVER XMLID="MANEUVER" ID="1695413008772" BASECOST="5.0" LEVELS="0" ALIAS="Offensive Strike" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Offensive Strike" OCV="-2" DCV="+1" DC="4" PHASE="1/2" EFFECT="[NORMALDC] Strike" ADDSTR="Yes" ACTIVECOST="15" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="Weapon [WEAPONDC] Strike">
                    <NOTES />
                    </MANEUVER>
                    <MANEUVER XMLID="MANEUVER" ID="1695413043628" BASECOST="5.0" LEVELS="0" ALIAS="Takeaway" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Takeaway" OCV="+0" DCV="+0" DC="2" PHASE="1/2" EFFECT="Grab Weapon, [STRDC] to take weapon away" ADDSTR="Yes" ACTIVECOST="5" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="Grab Weapon, [STRDC] to take weapon away">
                    <NOTES />
                    </MANEUVER>
                </MARTIALARTS>
                <POWERS>
                    <POWER XMLID="ARMOR" ID="1125625114765" BASECOST="0.0" LEVELS="42" ALIAS="Armor" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Natural Toughness" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes" PDLEVELS="21" EDLEVELS="21">
                    <NOTES />
                    </POWER>
                    <POWER XMLID="DAMAGEREDUCTION" ID="1695412788508" BASECOST="60.0" LEVELS="0" ALIAS="Damage Reduction" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="LVL75RESISTANT" OPTIONID="LVL75RESISTANT" OPTION_ALIAS="Damage Reduction, Resistant, 75%" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Natural Tuffness" INPUT="Energy" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </POWER>
                    <POWER XMLID="DAMAGEREDUCTION" ID="1695412809652" BASECOST="60.0" LEVELS="0" ALIAS="Damage Reduction" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="LVL75RESISTANT" OPTIONID="LVL75RESISTANT" OPTION_ALIAS="Damage Reduction, Resistant, 75%" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Natural Tuffness" INPUT="Physical" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </POWER>
                    <POWER XMLID="HEALING" ID="1125625126750" BASECOST="0.0" LEVELS="1" ALIAS="Healing" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Fast Healing" INPUT="BODY" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    <MODIFIER XMLID="REDUCEDEND" ID="1125625168197" BASECOST="0.5" LEVELS="0" ALIAS="Reduced Endurance" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="ZERO" OPTIONID="ZERO" OPTION_ALIAS="0 END" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                        <NOTES />
                    </MODIFIER>
                    <MODIFIER XMLID="PERSISTENT" ID="1125625176030" BASECOST="0.5" LEVELS="0" ALIAS="Persistent" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                        <NOTES />
                    </MODIFIER>
                    <MODIFIER XMLID="REGENEXTRATIME" ID="1125625181954" BASECOST="-1.25" LEVELS="0" ALIAS="Extra Time" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="TURN" OPTIONID="TURN" OPTION_ALIAS="1 Turn (Post-Segment 12)" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                        <NOTES />
                    </MODIFIER>
                    <MODIFIER XMLID="SELFONLY" ID="1125625190104" BASECOST="-0.5" LEVELS="0" ALIAS="Self Only" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                        <NOTES />
                    </MODIFIER>
                    </POWER>
                    <RUNNING XMLID="RUNNING" ID="1125625165984" BASECOST="0.0" LEVELS="5" ALIAS="Running" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Head Of Steam" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes" ADD_MODIFIERS_TO_BASE="No">
                    <NOTES />
                    </RUNNING>
                    <POWER XMLID="LIFESUPPORT" ID="1125625177656" BASECOST="0.0" LEVELS="0" ALIAS="LS" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Enhanced Physiology" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    <ADDER XMLID="HIGHPRESSURE" ID="1125625217704" BASECOST="1.0" LEVELS="0" ALIAS="Safe in High Pressure" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="INTENSECOLD" ID="1125625219986" BASECOST="2.0" LEVELS="0" ALIAS="Safe in Intense Cold" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="INTENSEHEAT" ID="1125625221706" BASECOST="2.0" LEVELS="0" ALIAS="Safe in Intense Heat" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="LOWPRESSUREVACUUM" ID="1125625223113" BASECOST="2.0" LEVELS="0" ALIAS="Safe in Low Pressure/Vacuum" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    </POWER>
                </POWERS>
                <DISADVANTAGES>
                    <DISAD XMLID="HUNTED" ID="1125625462875" BASECOST="0.0" LEVELS="0" ALIAS="Hunted" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="KGB">
                    <NOTES />
                    <ADDER XMLID="APPEARANCE" ID="1125625498401" BASECOST="0.0" LEVELS="0" ALIAS="Appearance" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="EIGHT" OPTIONID="EIGHT" OPTION_ALIAS="8-" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="CAPABILITIES" ID="1125625498407" BASECOST="10.0" LEVELS="0" ALIAS="Capabilities" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="AS" OPTIONID="AS" OPTION_ALIAS="(As Pow" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="MOTIVATION" ID="1125625498414" BASECOST="0.0" LEVELS="0" ALIAS="Motivation" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="CAPTURE" OPTIONID="CAPTURE" OPTION_ALIAS="Capture" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="NCI" ID="1125625505144" BASECOST="5.0" LEVELS="0" ALIAS="NCI" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    </DISAD>
                    <DISAD XMLID="HUNTED" ID="1125625479890" BASECOST="0.0" LEVELS="0" ALIAS="Hunted" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="Stalnoy Volk">
                    <NOTES />
                    <ADDER XMLID="APPEARANCE" ID="1125625515707" BASECOST="0.0" LEVELS="0" ALIAS="Appearance" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="EIGHT" OPTIONID="EIGHT" OPTION_ALIAS="8-" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="CAPABILITIES" ID="1125625515713" BASECOST="15.0" LEVELS="0" ALIAS="Capabilities" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="MORE" OPTIONID="MORE" OPTION_ALIAS="(Mo Pow" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="MOTIVATION" ID="1125625515720" BASECOST="0.0" LEVELS="0" ALIAS="Motivation" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="CAPTURE" OPTIONID="CAPTURE" OPTION_ALIAS="Capture" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    </DISAD>
                    <DISAD XMLID="PSYCHOLOGICALLIMITATION" ID="1125625499328" BASECOST="0.0" LEVELS="0" ALIAS="Psychological Limitation" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="Greedy">
                    <NOTES />
                    <ADDER XMLID="SITUATION" ID="1125625535408" BASECOST="15.0" LEVELS="0" ALIAS="Situation Is" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="VERYCOMMON" OPTIONID="VERYCOMMON" OPTION_ALIAS="(Very Common" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="INTENSITY" ID="1125625535414" BASECOST="5.0" LEVELS="0" ALIAS="Intensity Is" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="STRONG" OPTIONID="STRONG" OPTION_ALIAS="Strong" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    </DISAD>
                    <DISAD XMLID="PSYCHOLOGICALLIMITATION" ID="1125625511718" BASECOST="0.0" LEVELS="0" ALIAS="Psychological Limitation" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="Sadistic">
                    <NOTES />
                    <ADDER XMLID="SITUATION" ID="1125625547964" BASECOST="10.0" LEVELS="0" ALIAS="Situation Is" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="COMMON" OPTIONID="COMMON" OPTION_ALIAS="(Common" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="INTENSITY" ID="1125625547970" BASECOST="5.0" LEVELS="0" ALIAS="Intensity Is" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" OPTION="STRONG" OPTIONID="STRONG" OPTION_ALIAS="Strong" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    </DISAD>
                    <DISAD XMLID="UNLUCK" ID="1125625524500" BASECOST="0.0" LEVELS="2" ALIAS="Unluck: 2d6" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="No" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="">
                    <NOTES />
                    </DISAD>
                </DISADVANTAGES>
                <EQUIPMENT />
                </CHARACTER>
                `;

                let actor;

                before(async () => {
                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);
                });

                it("name", async function () {
                    assert.equal(actor.name, "Enforcer");
                });

                it("str.max", async function () {
                    assert.equal(actor.system.characteristics.str.max, 55);
                });
                it("str.realCost", async function () {
                    assert.equal(actor.system.characteristics.str.realCost, 45);
                });

                it("dex.max", async function () {
                    assert.equal(actor.system.characteristics.dex.max, 20);
                });
                it("dex.realCost", async function () {
                    assert.equal(actor.system.characteristics.dex.realCost, 30);
                });

                it("con.max", async function () {
                    assert.equal(actor.system.characteristics.con.max, 35);
                });
                it("con.realCost", async function () {
                    assert.equal(actor.system.characteristics.con.realCost, 50);
                });

                it("body.max", async function () {
                    assert.equal(actor.system.characteristics.body.max, 25);
                });
                it("body.realCost", async function () {
                    assert.equal(actor.system.characteristics.body.realCost, 30);
                });

                it("int.max", async function () {
                    assert.equal(actor.system.characteristics.int.max, 15);
                });
                it("int.realCost", async function () {
                    assert.equal(actor.system.characteristics.int.realCost, 5);
                });

                it("ego.max", async function () {
                    assert.equal(actor.system.characteristics.ego.max, 14);
                });
                it("ego.realCost", async function () {
                    assert.equal(actor.system.characteristics.ego.realCost, 8);
                });

                it("pre.max", async function () {
                    assert.equal(actor.system.characteristics.pre.max, 22);
                });
                it("pre.realCost", async function () {
                    assert.equal(actor.system.characteristics.pre.realCost, 12);
                });

                it("com.max", async function () {
                    assert.equal(actor.system.characteristics.com.max, 10);
                });
                it("com.realCost", async function () {
                    assert.equal(actor.system.characteristics.com.realCost, 0);
                });

                it("pd.max", async function () {
                    assert.equal(actor.system.characteristics.pd.max, 25);
                });
                it("pd.realCost", async function () {
                    assert.equal(actor.system.characteristics.pd.realCost, 14);
                });

                it("ed.max", async function () {
                    assert.equal(actor.system.characteristics.ed.max, 20);
                });
                it("ed.realCost", async function () {
                    assert.equal(actor.system.characteristics.ed.realCost, 13);
                });

                it("spd.max", async function () {
                    assert.equal(actor.system.characteristics.spd.max, 5);
                });
                it("spd.realCost", async function () {
                    assert.equal(actor.system.characteristics.spd.realCost, 20);
                });

                it("rec.max", async function () {
                    assert.equal(actor.system.characteristics.rec.max, 21);
                });
                it("rec.realCost", async function () {
                    assert.equal(actor.system.characteristics.rec.realCost, 6);
                });

                it("end.max", async function () {
                    assert.equal(actor.system.characteristics.end.max, 85);
                });
                it("end.realCost", async function () {
                    assert.equal(actor.system.characteristics.end.realCost, 8);
                });

                it("stun.max", async function () {
                    assert.equal(actor.system.characteristics.stun.max, 125);
                });
                it("stun.realCost", async function () {
                    assert.equal(actor.system.characteristics.stun.realCost, 54);
                });

                it("ocv.max", async function () {
                    assert.equal(actor.system.characteristics.ocv.max, 7);
                });
                it("ocv.realCost", async function () {
                    assert.equal(actor.system.characteristics.ocv.realCost, 0);
                });

                it("dcv.max", async function () {
                    assert.equal(actor.system.characteristics.dcv.max, 7);
                });
                it("dcv.realCost", async function () {
                    assert.equal(actor.system.characteristics.dcv.realCost, 0);
                });

                it("omcv.max", async function () {
                    assert.equal(actor.system.characteristics.omcv.max, 5);
                });
                it("omcv.realCost", async function () {
                    assert.equal(actor.system.characteristics.omcv.realCost, 0);
                });

                it("dmcv.max", async function () {
                    assert.equal(actor.system.characteristics.dmcv.max, 5);
                });
                it("dmcv.realCost", async function () {
                    assert.equal(actor.system.characteristics.dmcv.realCost, 0);
                });

                it("running.max", async function () {
                    assert.equal(actor.system.characteristics.running.max, 8); //8 + 5 (Active Effect)
                });
                it("running.realCost", async function () {
                    assert.equal(actor.system.characteristics.running.realCost, 4);
                });

                it("swimming.max", async function () {
                    assert.equal(actor.system.characteristics.swimming.max, 2);
                });
                it("swimming.realCost", async function () {
                    assert.equal(actor.system.characteristics.swimming.realCost, 0);
                });

                it("leaping.max", async function () {
                    assert.equal(actor.system.characteristics.leaping.max, 11);
                });
                it("leaping.realCost", async function () {
                    assert.equal(actor.system.characteristics.leaping.realCost, 0);
                });

                it("total points spent", async function () {
                    assert.equal(actor.system.realCost, 657);
                });
            });

            describe("civilian6e", function () {
                const contents = `
                <?xml version="1.0" encoding="UTF-16"?>
                <CHARACTER version="6.0" TEMPLATE="builtIn.Superheroic6E.hdt">
                <BASIC_CONFIGURATION BASE_POINTS="175" DISAD_POINTS="50" EXPERIENCE="0" />
                <CHARACTER_INFO CHARACTER_NAME="civilian6e" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.4622476037958" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                    <BACKGROUND />
                    <PERSONALITY />
                    <QUOTE />
                    <TACTICS />
                    <CAMPAIGN_USE />
                    <APPEARANCE />
                    <NOTES1 />
                    <NOTES2 />
                    <NOTES3 />
                    <NOTES4 />
                    <NOTES5 />
                </CHARACTER_INFO>
                <CHARACTERISTICS>
                    <STR XMLID="STR" ID="1698337460103" BASECOST="0.0" LEVELS="0" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </STR>
                    <DEX XMLID="DEX" ID="1698337460774" BASECOST="0.0" LEVELS="0" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </DEX>
                    <CON XMLID="CON" ID="1698337460480" BASECOST="0.0" LEVELS="0" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </CON>
                    <INT XMLID="INT" ID="1698337460801" BASECOST="0.0" LEVELS="0" ALIAS="INT" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </INT>
                    <EGO XMLID="EGO" ID="1698337460800" BASECOST="0.0" LEVELS="0" ALIAS="EGO" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </EGO>
                    <PRE XMLID="PRE" ID="1698337460238" BASECOST="0.0" LEVELS="0" ALIAS="PRE" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </PRE>
                    <OCV XMLID="OCV" ID="1698337720439" BASECOST="0.0" LEVELS="0" ALIAS="OCV" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </OCV>
                    <DCV XMLID="DCV" ID="1698337720495" BASECOST="0.0" LEVELS="0" ALIAS="DCV" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </DCV>
                    <OMCV XMLID="OMCV" ID="1698337720823" BASECOST="0.0" LEVELS="0" ALIAS="OMCV" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </OMCV>
                    <DMCV XMLID="DMCV" ID="1698337720787" BASECOST="0.0" LEVELS="0" ALIAS="DMCV" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </DMCV>
                    <SPD XMLID="SPD" ID="1698337460757" BASECOST="0.0" LEVELS="0" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </SPD>
                    <PD XMLID="PD" ID="1698337460831" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </PD>
                    <ED XMLID="ED" ID="1698337460370" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </ED>
                    <REC XMLID="REC" ID="1698337460800" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </REC>
                    <END XMLID="END" ID="1698337460286" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </END>
                    <BODY XMLID="BODY" ID="1698337460679" BASECOST="0.0" LEVELS="0" ALIAS="BODY" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </BODY>
                    <STUN XMLID="STUN" ID="1698337459991" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </STUN>
                    <RUNNING XMLID="RUNNING" ID="1698337460783" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </RUNNING>
                    <SWIMMING XMLID="SWIMMING" ID="1698337460402" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </SWIMMING>
                    <LEAPING XMLID="LEAPING" ID="1698337460611" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </LEAPING>
                </CHARACTERISTICS>
                <SKILLS />
                <PERKS />
                <TALENTS />
                <MARTIALARTS />
                <POWERS />
                <DISADVANTAGES />
                <EQUIPMENT />
                <RULES name="HoTA" path="civilian6e.hdc" BASEPOINTS="175" DISADPOINTS="50" APPEREND="10" STRAPPEREND="10" NCMSELECTED="No" NCMUSERCHANGEABLE="Yes" ATTACKAPMAXVALUE="57" ATTACKAPMAXRESPONSE="1" DEFENSEAPMAXVALUE="35" DEFENSEAPMAXRESPONSE="1" DISADCATEGORYMAXVALUE="75" DISADCATEGORYMAXRESPONSE="1" AVAILDISADPOINTSRESPONSE="1" AVAILTOTALPOINTSRESPONSE="0" CHARACTERISTICMAXVALUE="1000" CHARACTERISTICMAXRESPONSE="0" MANEUVERMAXVALUE="1000" MANEUVERMAXRESPONSE="0" SKILLMAXVALUE="1000" SKILLMAXRESPONSE="0" PERKMAXVALUE="1000" PERKMAXRESPONSE="0" TALENTMAXVALUE="1000" TALENTMAXRESPONSE="0" POWERMAXVALUE="1000" POWERMAXRESPONSE="0" EQUIPMENTCOSTVALUE="1000" EQUIPMENTCOSTRESPONSE="0" EQUIPMENTCOSTUNITS="$" EQUIPMENTCOSTCONVERSION="1.0" EQUIPMENTCOSTDECIMALPLACES="0" EQUIPMENTUNITSPREFIX="Yes" STANDARDEFFECTALLOWED="Yes" USEEXPANDEDGROWTHCHART="No" DEFAULTSTANDARDEFFECT="No" MULTIPLIERALLOWED="No" LANGUAGESIMILARITIESUSED="No" LITERACYFREE="No" NATIVELITERACYFREE="Yes" EQUIPMENTALLOWED="No" PENALIZENOLEVEL1="No" ONLYSELLONEFIGURED="Yes" USEINCREASEDDAMAGEDIFFERENTIATION="No" AUTOMATICALLYAPPLYNOFIGURED="Yes" LINKACROSSFRAMEWORK="2" SPECIALTYPEINFRAMEWORK="1" NONENDUSINGABILITYINEC="1" USESKILLMAXIMA="No" USESKILLMULTIPLIERS="No" LANGUAGESASINTSKILL="No" SKILLMAXIMALIMIT="13" SKILLROLLBASE="9" SKILLROLLDENOMINATOR="5.0" CHARROLLBASE="9" CHARROLLDENOMINATOR="5.0" USENOTES1="No" USENOTES2="No" USENOTES3="No" USENOTES4="No" USENOTES5="No" NOTES1LABEL="Notes 1" NOTES2LABEL="Notes 2" NOTES3LABEL="Notes 3" NOTES4LABEL="Notes 4" NOTES5LABEL="Notes 5" />
                </CHARACTER>
                `;

                let actor;

                before(async () => {
                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);
                });

                it("name", async function () {
                    assert.equal(actor.name, "civilian6e");
                });

                it("str.max", async function () {
                    assert.equal(actor.system.characteristics.str.max, 10);
                });
                it("str.realCost", async function () {
                    assert.equal(actor.system.characteristics.str.realCost, 0);
                });

                it("dex.max", async function () {
                    assert.equal(actor.system.characteristics.dex.max, 10);
                });
                it("dex.realCost", async function () {
                    assert.equal(actor.system.characteristics.dex.realCost, 0);
                });

                it("con.max", async function () {
                    assert.equal(actor.system.characteristics.con.max, 10);
                });
                it("con.realCost", async function () {
                    assert.equal(actor.system.characteristics.con.realCost, 0);
                });

                it("body.max", async function () {
                    assert.equal(actor.system.characteristics.body.max, 10);
                });
                it("body.realCost", async function () {
                    assert.equal(actor.system.characteristics.body.realCost, 0);
                });

                it("int.max", async function () {
                    assert.equal(actor.system.characteristics.int.max, 10);
                });
                it("int.realCost", async function () {
                    assert.equal(actor.system.characteristics.int.realCost, 0);
                });

                it("ego.max", async function () {
                    assert.equal(actor.system.characteristics.ego.max, 10);
                });
                it("ego.realCost", async function () {
                    assert.equal(actor.system.characteristics.ego.realCost, 0);
                });

                it("pre.max", async function () {
                    assert.equal(actor.system.characteristics.pre.max, 10);
                });
                it("pre.realCost", async function () {
                    assert.equal(actor.system.characteristics.pre.realCost, 0);
                });

                it("pd.max", async function () {
                    assert.equal(actor.system.characteristics.pd.max, 2);
                });
                it("pd.realCost", async function () {
                    assert.equal(actor.system.characteristics.pd.realCost, 0);
                });

                it("ed.max", async function () {
                    assert.equal(actor.system.characteristics.ed.max, 2);
                });
                it("ed.realCost", async function () {
                    assert.equal(actor.system.characteristics.ed.realCost, 0);
                });

                it("spd.max", async function () {
                    assert.equal(actor.system.characteristics.spd.max, 2);
                });
                it("spd.realCost", async function () {
                    assert.equal(actor.system.characteristics.spd.realCost, 0);
                });

                it("rec.max", async function () {
                    assert.equal(actor.system.characteristics.rec.max, 4);
                });
                it("rec.realCost", async function () {
                    assert.equal(actor.system.characteristics.rec.realCost, 0);
                });

                it("end.max", async function () {
                    assert.equal(actor.system.characteristics.end.max, 20);
                });
                it("end.realCost", async function () {
                    assert.equal(actor.system.characteristics.end.realCost, 0);
                });

                it("stun.max", async function () {
                    assert.equal(actor.system.characteristics.stun.max, 20);
                });
                it("stun.realCost", async function () {
                    assert.equal(actor.system.characteristics.stun.realCost, 0);
                });

                it("ocv.max", async function () {
                    assert.equal(actor.system.characteristics.ocv.max, 3);
                });
                it("ocv.realCost", async function () {
                    assert.equal(actor.system.characteristics.ocv.realCost, 0);
                });

                it("dcv.max", async function () {
                    assert.equal(actor.system.characteristics.dcv.max, 3);
                });
                it("dcv.realCost", async function () {
                    assert.equal(actor.system.characteristics.dcv.realCost, 0);
                });

                it("omcv.max", async function () {
                    assert.equal(actor.system.characteristics.omcv.max, 3);
                });
                it("omcv.realCost", async function () {
                    assert.equal(actor.system.characteristics.omcv.realCost, 0);
                });

                it("dmcv.max", async function () {
                    assert.equal(actor.system.characteristics.dmcv.max, 3);
                });
                it("dmcv.realCost", async function () {
                    assert.equal(actor.system.characteristics.dmcv.realCost, 0);
                });

                it("running.max", async function () {
                    assert.equal(actor.system.characteristics.running.max, 12);
                });
                it("running.realCost", async function () {
                    assert.equal(actor.system.characteristics.running.realCost, 0);
                });

                it("swimming.max", async function () {
                    assert.equal(actor.system.characteristics.swimming.max, 4);
                });
                it("swimming.realCost", async function () {
                    assert.equal(actor.system.characteristics.swimming.realCost, 0);
                });

                it("leaping.max", async function () {
                    assert.equal(actor.system.characteristics.leaping.max, 4);
                });
                it("leaping.realCost", async function () {
                    assert.equal(actor.system.characteristics.leaping.realCost, 0);
                });

                it("gliding.max", async function () {
                    assert.equal(actor.system.characteristics.gliding.max, 0);
                });
                it("gliding.realCost", async function () {
                    assert.equal(actor.system.characteristics.gliding.realCost, 0);
                });

                it("realCost", async function () {
                    assert.equal(actor.system.realCost, 0);
                });
            });
            describe("Unnamed character", function () {
                const contents = `
                <CHARACTER version="6.0" TEMPLATE="builtIn.Heroic6E.hdt">
                    <BASIC_CONFIGURATION BASE_POINTS="175" DISAD_POINTS="50" EXPERIENCE="0" RULES="Default"/>
                    <CHARACTER_INFO CHARACTER_NAME="" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.46224760379584" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                        <BACKGROUND/>
                        <PERSONALITY/>
                        <QUOTE/>
                        <TACTICS/>
                        <CAMPAIGN_USE/>
                        <APPEARANCE/>
                        <NOTES1/>
                        <NOTES2/>
                        <NOTES3/>
                        <NOTES4/>
                        <NOTES5/>
                    </CHARACTER_INFO>
                    <CHARACTERISTICS>
                        <STR XMLID="STR" ID="1701947568288" BASECOST="0.0" LEVELS="5" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </STR>
                        <DEX XMLID="DEX" ID="1701947568682" BASECOST="0.0" LEVELS="3" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </DEX>
                        <CON XMLID="CON" ID="1701947568427" BASECOST="0.0" LEVELS="5" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </CON>
                        <INT XMLID="INT" ID="1701947568682" BASECOST="0.0" LEVELS="2" ALIAS="INT" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </INT>
                        <EGO XMLID="EGO" ID="1701947569026" BASECOST="0.0" LEVELS="2" ALIAS="EGO" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </EGO>
                        <PRE XMLID="PRE" ID="1701947569217" BASECOST="0.0" LEVELS="4" ALIAS="PRE" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </PRE>
                        <OCV XMLID="OCV" ID="1701947568802" BASECOST="0.0" LEVELS="2" ALIAS="OCV" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </OCV>
                        <DCV XMLID="DCV" ID="1701947568614" BASECOST="0.0" LEVELS="1" ALIAS="DCV" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </DCV>
                        <OMCV XMLID="OMCV" ID="1701947568408" BASECOST="0.0" LEVELS="0" ALIAS="OMCV" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </OMCV>
                        <DMCV XMLID="DMCV" ID="1701947568999" BASECOST="0.0" LEVELS="0" ALIAS="DMCV" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </DMCV>
                        <SPD XMLID="SPD" ID="1701947568497" BASECOST="0.0" LEVELS="1" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </SPD>
                        <PD XMLID="PD" ID="1701947568954" BASECOST="0.0" LEVELS="3" ALIAS="PD" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </PD>
                        <ED XMLID="ED" ID="1701947568556" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </ED>
                        <REC XMLID="REC" ID="1701947568265" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </REC>
                        <END XMLID="END" ID="1701947569082" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </END>
                        <BODY XMLID="BODY" ID="1701947569204" BASECOST="0.0" LEVELS="10" ALIAS="BODY" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </BODY>
                        <STUN XMLID="STUN" ID="1701947568535" BASECOST="0.0" LEVELS="10" ALIAS="STUN" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </STUN>
                        <RUNNING XMLID="RUNNING" ID="1701947568811" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="18" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </RUNNING>
                        <SWIMMING XMLID="SWIMMING" ID="1701947568524" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="19" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </SWIMMING>
                        <LEAPING XMLID="LEAPING" ID="1701947568759" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="20" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        </LEAPING>
                    </CHARACTERISTICS>
                    <SKILLS>
                        <SKILL XMLID="BREAKFALL" ID="1701949046980" BASECOST="3.0" LEVELS="0" ALIAS="Breakfall" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="DEX" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                        <NOTES/>
                        </SKILL>
                        <SKILL XMLID="SLEIGHT_OF_HAND" ID="1701949231428" BASECOST="3.0" LEVELS="2" ALIAS="Sleight Of Hand" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="DEX" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                        <NOTES/>
                        </SKILL>
                    </SKILLS>
                    <PERKS/>
                    <TALENTS/>
                    <MARTIALARTS/>
                    <POWERS>
                        <POWER XMLID="TELEKINESIS" ID="1701947959674" BASECOST="0.0" LEVELS="20" ALIAS="Telekinesis" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Magnetic" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                        <NOTES/>
                        <MODIFIER XMLID="LIMITEDTYPES" ID="1702648349818" BASECOST="-0.5" LEVELS="0" ALIAS="Only Works On Limited Types Of Objects" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="LIMITED" OPTIONID="LIMITED" OPTION_ALIAS="Limited Group of Objects" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="metallic objects" PRIVATE="No" FORCEALLOW="No">
                            <NOTES/>
                        </MODIFIER>
                        </POWER>
                    </POWERS>
                    <DISADVANTAGES>
                    </DISADVANTAGES>
                    <EQUIPMENT/>
                    </CHARACTER>
                `;

                const defaultActorName = "Quench Actor";
                let actor;

                before(async () => {
                    actor = new HeroSystem6eActor(
                        {
                            name: defaultActorName,
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);
                });

                it("should default to the basic name when there is no name provided in the HDC", async function () {
                    assert.equal(actor.name, defaultActorName);
                });
            });

            describe("Martial DCs and Enhanced Perception", function () {
                const contents = `
                    <?xml version="1.0" encoding="UTF-16"?>
                <CHARACTER version="6.0" TEMPLATE="builtIn.Heroic6E.hdt">
                <BASIC_CONFIGURATION BASE_POINTS="200" DISAD_POINTS="150" EXPERIENCE="12" RULES="Default" />
                <CHARACTER_INFO CHARACTER_NAME="ManeuverActor" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.46224760379584" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                    <BACKGROUND />
                    <PERSONALITY />
                    <QUOTE />
                    <TACTICS />
                    <CAMPAIGN_USE />
                    <APPEARANCE />
                    <NOTES1 />
                    <NOTES2 />
                    <NOTES3 />
                    <NOTES4 />
                    <NOTES5 />
                </CHARACTER_INFO>
                <CHARACTERISTICS>
                    <STR XMLID="STR" ID="1710726364049" BASECOST="0.0" LEVELS="40" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </STR>
                    <DEX XMLID="DEX" ID="1710726364497" BASECOST="0.0" LEVELS="0" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </DEX>
                    <CON XMLID="CON" ID="1710726363957" BASECOST="0.0" LEVELS="0" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </CON>
                    <INT XMLID="INT" ID="1710726363828" BASECOST="0.0" LEVELS="2" ALIAS="INT" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </INT>
                    <EGO XMLID="EGO" ID="1710726364513" BASECOST="0.0" LEVELS="0" ALIAS="EGO" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </EGO>
                    <PRE XMLID="PRE" ID="1710726364620" BASECOST="0.0" LEVELS="0" ALIAS="PRE" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </PRE>
                    <OCV XMLID="OCV" ID="1710726364543" BASECOST="0.0" LEVELS="0" ALIAS="OCV" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </OCV>
                    <DCV XMLID="DCV" ID="1710726363787" BASECOST="0.0" LEVELS="0" ALIAS="DCV" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </DCV>
                    <OMCV XMLID="OMCV" ID="1710726363737" BASECOST="0.0" LEVELS="1" ALIAS="OMCV" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </OMCV>
                    <DMCV XMLID="DMCV" ID="1710726364453" BASECOST="0.0" LEVELS="-2" ALIAS="DMCV" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </DMCV>
                    <SPD XMLID="SPD" ID="1710726364191" BASECOST="0.0" LEVELS="0" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </SPD>
                    <PD XMLID="PD" ID="1710726364262" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </PD>
                    <ED XMLID="ED" ID="1710726364629" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </ED>
                    <REC XMLID="REC" ID="1710726364570" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </REC>
                    <END XMLID="END" ID="1710726364551" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </END>
                    <BODY XMLID="BODY" ID="1710726364030" BASECOST="0.0" LEVELS="0" ALIAS="BODY" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </BODY>
                    <STUN XMLID="STUN" ID="1710726364101" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </STUN>
                    <RUNNING XMLID="RUNNING" ID="1710726364233" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="18" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </RUNNING>
                    <SWIMMING XMLID="SWIMMING" ID="1710726364470" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="19" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </SWIMMING>
                    <LEAPING XMLID="LEAPING" ID="1710726364250" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="20" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </LEAPING>
                </CHARACTERISTICS>
                <SKILLS>
                    <SKILL XMLID="KNOWLEDGE_SKILL" ID="1722647089371" BASECOST="3.0" LEVELS="3" ALIAS="KS" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="Magic" CHARACTERISTIC="INT" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No" TYPE="General">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="ANALYZE" ID="1723147179349" BASECOST="3.0" LEVELS="0" ALIAS="Analyze" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="Mark Quality" CHARACTERISTIC="INT" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                    <NOTES />
                    </SKILL>
                    <SKILL XMLID="CLIMBING" ID="1723431816452" BASECOST="3.0" LEVELS="0" ALIAS="Climbing" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="DEX" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="No">
                    <NOTES />
                    </SKILL>
                </SKILLS>
                <PERKS />
                <TALENTS />
                <MARTIALARTS>
                    <MANEUVER XMLID="MANEUVER" ID="1723406694834" BASECOST="4.0" LEVELS="0" ALIAS="Killing Strike" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Killing Strike" OCV="-2" DCV="+0" DC="2" PHASE="1/2" EFFECT="[KILLINGDC]" ADDSTR="Yes" ACTIVECOST="10" DAMAGETYPE="0" MAXSTR="50" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="[WEAPONKILLINGDC]">
                    <NOTES />
                    </MANEUVER>
                    <MANEUVER XMLID="MANEUVER" ID="1724545320876" BASECOST="4.0" LEVELS="0" ALIAS="Martial Strike" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Martial Strike" OCV="+0" DCV="+2" DC="2" PHASE="1/2" EFFECT="[NORMALDC] Strike" ADDSTR="Yes" ACTIVECOST="20" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="Weapon [WEAPONDC] Strike">
                    <NOTES />
                    </MANEUVER>
                    <EXTRADC XMLID="EXTRADC" ID="1723406759822" BASECOST="0.0" LEVELS="22" ALIAS="+22 HTH Damage Class(es)" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="">
                    <NOTES />
                    </EXTRADC>
                </MARTIALARTS>
                <POWERS>
                    <POWER XMLID="ENHANCEDPERCEPTION" ID="1724447218089" BASECOST="0.0" LEVELS="6" ALIAS="Enhanced Perception" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="ALL" OPTIONID="ALL" OPTION_ALIAS="all Sense Groups" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                    <NOTES />
                    </POWER>
                </POWERS>
                <DISADVANTAGES>
                    <DISAD XMLID="PSYCHOLOGICALLIMITATION" ID="1719196047424" BASECOST="0.0" LEVELS="0" ALIAS="Psychological Complication" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="">
                    <NOTES />
                    <ADDER XMLID="SITUATION" ID="1719196086834" BASECOST="10.0" LEVELS="0" ALIAS="Situation Is" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="COMMON" OPTIONID="COMMON" OPTION_ALIAS="(Common" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    <ADDER XMLID="INTENSITY" ID="1719196086840" BASECOST="5.0" LEVELS="0" ALIAS="Intensity Is" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="STRONG" OPTIONID="STRONG" OPTION_ALIAS="Strong" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                        <NOTES />
                    </ADDER>
                    </DISAD>
                </DISADVANTAGES>
                <EQUIPMENT>
                    <POWER XMLID="COMPOUNDPOWER" ID="1723512936537" BASECOST="0.0" LEVELS="0" ALIAS="Compound Power" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" PRICE="0.0" WEIGHT="0.0" CARRIED="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Magic Sword" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                    <NOTES>My notes</NOTES>
                    <POWER XMLID="HKA" ID="1723513008909" BASECOST="0.0" LEVELS="3" ALIAS="Killing Attack - Hand-To-Hand" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        <ADDER XMLID="PLUSONEPIP" ID="1725417653175" BASECOST="5.0" LEVELS="0" ALIAS="+1 pip" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="Yes" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                            <NOTES />
                        </ADDER>
                    </POWER>
                    <SKILL XMLID="COMBAT_LEVELS" ID="1723513022920" BASECOST="0.0" LEVELS="2" ALIAS="Combat Skill Levels" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="SINGLE" OPTIONID="SINGLE" OPTION_ALIAS="with any single attack" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="GENERAL" FAMILIARITY="No" PROFICIENCY="No">
                        <NOTES />
                    </SKILL>
                    </POWER>
                </EQUIPMENT>
                </CHARACTER>
                `;

                let actor;

                before(async () => {
                    const previousDoubleDamageLimitSetting = await game.settings.set(
                        HEROSYS.module,
                        "DoubleDamageLimit",
                    );
                    await game.settings.set(HEROSYS.module, "DoubleDamageLimit", false);

                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);

                    await game.settings.set(HEROSYS.module, "DoubleDamageLimit", previousDoubleDamageLimitSetting);
                });

                it("Killing Strike damage", async function () {
                    // Killing Strike: 2DC killing, EXTRADC (+22 DC), 40 STR (+8 DC), 2 CSL (+1 DC) = 34 DC (killing) = 11d6+1
                    assert.equal(actor.items.find((o) => o.system.ALIAS === "Killing Strike").system.damage, "11d6+1K");
                });

                it("Killing Strike OCV", async function () {
                    assert.equal(actor.items.find((o) => o.system.ALIAS === "Killing Strike").system.ocvEstimated, "1");
                });

                it("Killing Strike DCV", async function () {
                    assert.equal(actor.items.find((o) => o.system.ALIAS === "Killing Strike").system.dcvEstimated, "3");
                });

                it("Martial Strike damage", async function () {
                    // Martial Strike: 2DC, EXTRADC (+22 DC),  40 STR (+8 DC), 2 CSL (+1 DC) = 34 DC (normal) = 34d6
                    assert.equal(actor.items.find((o) => o.system.ALIAS === "Martial Strike").system.damage, "34d6");
                });

                it("Martial Strike OCV", async function () {
                    assert.equal(actor.items.find((o) => o.system.ALIAS === "Martial Strike").system.ocvEstimated, "3");
                });

                it("Martial Strike DCV", async function () {
                    assert.equal(actor.items.find((o) => o.system.ALIAS === "Martial Strike").system.dcvEstimated, "5");
                });

                it("HKA damage", async function () {
                    // HKA 3d6+1, 50 STR
                    assert.equal(actor.items.find((o) => o.system.XMLID === "HKA").system.damage, "6½d6K");
                });

                it("HKA CSL", async function () {
                    assert.equal(
                        combatSkillLevelsForAttack(actor.items.find((o) => o.system.XMLID === "HKA"))[0].ocv,
                        2,
                    );
                });

                it("Enhanced Perception", async function () {
                    assert.equal(actor.items.find((o) => o.system.XMLID === "PERCEPTION").system.roll, "17-");
                });

                it("realCost", async function () {
                    assert.equal(actor.system.realCost, 165);
                });

                it("activePoints", async function () {
                    assert.equal(actor.system.activePoints, 219);
                });
            });

            // From Misc Equipment Compendium
            describe("Thieves’ Tools (High quality)", function () {
                const contents = `<?xml version="1.0" encoding="UTF-16"?>
                    <CHARACTER version="6.0" TEMPLATE="builtIn.Heroic6E.hdt">
                    <BASIC_CONFIGURATION BASE_POINTS="175" DISAD_POINTS="50" EXPERIENCE="0" />
                    <CHARACTER_INFO CHARACTER_NAME="" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.46224760379584" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                        <BACKGROUND />
                        <PERSONALITY />
                        <QUOTE />
                        <TACTICS />
                        <CAMPAIGN_USE />
                        <APPEARANCE />
                        <NOTES1 />
                        <NOTES2 />
                        <NOTES3 />
                        <NOTES4 />
                        <NOTES5 />
                    </CHARACTER_INFO>
                    <CHARACTERISTICS>
                        <STR XMLID="STR" ID="1729875364748" BASECOST="0.0" LEVELS="0" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STR>
                        <DEX XMLID="DEX" ID="1729875365075" BASECOST="0.0" LEVELS="0" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DEX>
                        <CON XMLID="CON" ID="1729875365571" BASECOST="0.0" LEVELS="0" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </CON>
                        <INT XMLID="INT" ID="1729875365197" BASECOST="0.0" LEVELS="0" ALIAS="INT" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </INT>
                        <EGO XMLID="EGO" ID="1729875364767" BASECOST="0.0" LEVELS="0" ALIAS="EGO" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </EGO>
                        <PRE XMLID="PRE" ID="1729875364645" BASECOST="0.0" LEVELS="0" ALIAS="PRE" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PRE>
                        <OCV XMLID="OCV" ID="1729875365388" BASECOST="0.0" LEVELS="0" ALIAS="OCV" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </OCV>
                        <DCV XMLID="DCV" ID="1729875364868" BASECOST="0.0" LEVELS="0" ALIAS="DCV" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DCV>
                        <OMCV XMLID="OMCV" ID="1729875364695" BASECOST="0.0" LEVELS="0" ALIAS="OMCV" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </OMCV>
                        <DMCV XMLID="DMCV" ID="1729875365091" BASECOST="0.0" LEVELS="0" ALIAS="DMCV" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DMCV>
                        <SPD XMLID="SPD" ID="1729875365265" BASECOST="0.0" LEVELS="0" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SPD>
                        <PD XMLID="PD" ID="1729875365395" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PD>
                        <ED XMLID="ED" ID="1729875364630" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </ED>
                        <REC XMLID="REC" ID="1729875365129" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </REC>
                        <END XMLID="END" ID="1729875365234" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </END>
                        <BODY XMLID="BODY" ID="1729875365354" BASECOST="0.0" LEVELS="0" ALIAS="BODY" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </BODY>
                        <STUN XMLID="STUN" ID="1729875365424" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STUN>
                        <RUNNING XMLID="RUNNING" ID="1729875364951" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="18" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </RUNNING>
                        <SWIMMING XMLID="SWIMMING" ID="1729875364867" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="19" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SWIMMING>
                        <LEAPING XMLID="LEAPING" ID="1729875365232" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="20" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </LEAPING>
                    </CHARACTERISTICS>
                    <SKILLS />
                    <PERKS />
                    <TALENTS />
                    <MARTIALARTS />
                    <POWERS />
                    <DISADVANTAGES />
                    <EQUIPMENT>
                        <POWER XMLID="COMPOUNDPOWER" ID="1729876310162" BASECOST="0.0" LEVELS="0" ALIAS="Compound Power" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" PRICE="180.0" WEIGHT="0.022046224760379582" CARRIED="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Thieves’ Tools (High quality)" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="No">
                        <NOTES />
                        <SKILL XMLID="LOCKPICKING" ID="1729387070122" BASECOST="0.0" LEVELS="1" ALIAS="Lockpicking" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="DEX" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="Yes">
                            <NOTES />
                            <ADDER XMLID="GENERIC_OBJECT" ID="1729387375273" BASECOST="0.0" LEVELS="0" ALIAS="PD&amp;ED: 1, BODY: 1" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                            <NOTES />
                            </ADDER>
                            <MODIFIER XMLID="FOCUS" ID="1729387373813" BASECOST="-1.0" LEVELS="0" ALIAS="Focus" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="OAF" OPTIONID="OAF" OPTION_ALIAS="OAF" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                            <NOTES />
                            </MODIFIER>
                        </SKILL>
                        <SKILL XMLID="SECURITY_SYSTEMS" ID="1729387099314" BASECOST="0.0" LEVELS="1" ALIAS="Security Systems" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="INT" FAMILIARITY="No" PROFICIENCY="No" LEVELSONLY="Yes">
                            <NOTES />
                            <MODIFIER XMLID="FOCUS" ID="1729387279548" BASECOST="-1.0" LEVELS="0" ALIAS="Focus" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="OAF" OPTIONID="OAF" OPTION_ALIAS="OAF" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                            <NOTES />
                            </MODIFIER>
                        </SKILL>
                        </POWER>
                    </EQUIPMENT>
                    <RULES name="HoTA" path="Vahzilok_Reaper_100.hdc" BASEPOINTS="175" DISADPOINTS="50" APPEREND="10" STRAPPEREND="10" NCMSELECTED="No" NCMUSERCHANGEABLE="Yes" ATTACKAPMAXVALUE="70" ATTACKAPMAXRESPONSE="1" DEFENSEAPMAXVALUE="70" DEFENSEAPMAXRESPONSE="1" DISADCATEGORYMAXVALUE="75" DISADCATEGORYMAXRESPONSE="1" AVAILDISADPOINTSRESPONSE="1" AVAILTOTALPOINTSRESPONSE="0" CHARACTERISTICMAXVALUE="1000" CHARACTERISTICMAXRESPONSE="0" MANEUVERMAXVALUE="1000" MANEUVERMAXRESPONSE="0" SKILLMAXVALUE="1000" SKILLMAXRESPONSE="0" PERKMAXVALUE="1000" PERKMAXRESPONSE="0" TALENTMAXVALUE="1000" TALENTMAXRESPONSE="0" POWERMAXVALUE="1000" POWERMAXRESPONSE="0" EQUIPMENTCOSTVALUE="1000" EQUIPMENTCOSTRESPONSE="0" EQUIPMENTCOSTUNITS="$" EQUIPMENTCOSTCONVERSION="1.0" EQUIPMENTCOSTDECIMALPLACES="0" EQUIPMENTUNITSPREFIX="Yes" STANDARDEFFECTALLOWED="Yes" USEEXPANDEDGROWTHCHART="No" DEFAULTSTANDARDEFFECT="No" MULTIPLIERALLOWED="No" LANGUAGESIMILARITIESUSED="No" LITERACYFREE="No" NATIVELITERACYFREE="Yes" EQUIPMENTALLOWED="Yes" PENALIZENOLEVEL1="No" ONLYSELLONEFIGURED="Yes" USEINCREASEDDAMAGEDIFFERENTIATION="No" AUTOMATICALLYAPPLYNOFIGURED="Yes" LINKACROSSFRAMEWORK="2" SPECIALTYPEINFRAMEWORK="1" NONENDUSINGABILITYINEC="1" USESKILLMAXIMA="No" USESKILLMULTIPLIERS="No" LANGUAGESASINTSKILL="No" SKILLMAXIMALIMIT="13" SKILLROLLBASE="9" SKILLROLLDENOMINATOR="5.0" CHARROLLBASE="9" CHARROLLDENOMINATOR="5.0" USENOTES1="No" USENOTES2="No" USENOTES3="No" USENOTES4="No" USENOTES5="No" NOTES1LABEL="Notes 1" NOTES2LABEL="Notes 2" NOTES3LABEL="Notes 3" NOTES4LABEL="Notes 4" NOTES5LABEL="Notes 5" />
                    </CHARACTER>
                `;

                let actor;
                let parentItem;

                before(async () => {
                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);
                    parentItem = actor.items.find((o) => o.system.XMLID === "COMPOUNDPOWER");
                });

                it("Name Compound", async function () {
                    assert.equal(parentItem.name, `Thieves’ Tools (High quality)`);
                });

                it("SkillName Lockpicking", async function () {
                    assert.equal(parentItem.childItems[0].name, `Lockpicking`);
                });
                it("SkillDesc Lockpicking", async function () {
                    assert.equal(
                        parentItem.childItems[0].system.description,
                        "Lockpicking 12- (PD&ED: 1, BODY: 1) (2 Active Points); OAF (-1)",
                    );
                });

                it("SkillName Security Systems", async function () {
                    assert.equal(parentItem.childItems[1].name, `Security Systems`);
                });
                it("SkillDesc Security Systems", async function () {
                    assert.equal(
                        parentItem.childItems[1].system.description,
                        "Security Systems 12- (2 Active Points); OAF (-1)",
                    );
                });

                it("realCost", async function () {
                    assert.equal(actor.system.realCost, 0);
                });

                it("activePoints", async function () {
                    assert.equal(actor.system.activePoints, 4);
                });
            });

            describe("5e - base vs added DCs", function () {
                const contents = `
                <?xml version="1.0" encoding="UTF-16"?>
                    <CHARACTER version="6.0" TEMPLATE="builtIn.Superheroic.hdt">
                    <BASIC_CONFIGURATION BASE_POINTS="200" DISAD_POINTS="150" EXPERIENCE="0" />
                    <CHARACTER_INFO CHARACTER_NAME="base vs added DCs Test" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.4622476037958" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                        <BACKGROUND />
                        <PERSONALITY />
                        <QUOTE />
                        <TACTICS />
                        <CAMPAIGN_USE />
                        <APPEARANCE />
                        <NOTES1 />
                        <NOTES2 />
                        <NOTES3 />
                        <NOTES4 />
                        <NOTES5 />
                    </CHARACTER_INFO>
                    <CHARACTERISTICS>
                        <STR XMLID="STR" ID="1735337504125" BASECOST="0.0" LEVELS="60" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STR>
                        <DEX XMLID="DEX" ID="1735337503912" BASECOST="0.0" LEVELS="0" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DEX>
                        <CON XMLID="CON" ID="1735337503964" BASECOST="0.0" LEVELS="0" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </CON>
                        <BODY XMLID="BODY" ID="1735337504092" BASECOST="0.0" LEVELS="0" ALIAS="BODY" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </BODY>
                        <INT XMLID="INT" ID="1735337504091" BASECOST="0.0" LEVELS="0" ALIAS="INT" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </INT>
                        <EGO XMLID="EGO" ID="1735337504562" BASECOST="0.0" LEVELS="0" ALIAS="EGO" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </EGO>
                        <PRE XMLID="PRE" ID="1735337504596" BASECOST="0.0" LEVELS="0" ALIAS="PRE" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PRE>
                        <COM XMLID="COM" ID="1735337504526" BASECOST="0.0" LEVELS="0" ALIAS="COM" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </COM>
                        <PD XMLID="PD" ID="1735337504806" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PD>
                        <ED XMLID="ED" ID="1735337503860" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </ED>
                        <SPD XMLID="SPD" ID="1735337503827" BASECOST="0.0" LEVELS="0" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SPD>
                        <REC XMLID="REC" ID="1735337504790" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </REC>
                        <END XMLID="END" ID="1735337504217" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </END>
                        <STUN XMLID="STUN" ID="1735337503922" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STUN>
                        <RUNNING XMLID="RUNNING" ID="1735337503998" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </RUNNING>
                        <SWIMMING XMLID="SWIMMING" ID="1735337504502" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SWIMMING>
                        <LEAPING XMLID="LEAPING" ID="1735337504789" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </LEAPING>
                    </CHARACTERISTICS>
                    <SKILLS>
                        <SKILL XMLID="COMBAT_LEVELS" ID="1735338325968" BASECOST="0.0" LEVELS="11" ALIAS="Combat Skill Levels" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="ALL" OPTIONID="ALL" OPTION_ALIAS="with All Combat" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="GENERAL" FAMILIARITY="No" PROFICIENCY="No">
                        <NOTES />
                        </SKILL>
                    </SKILLS>
                    <PERKS />
                    <TALENTS>
                        <TALENT XMLID="DEADLYBLOW" ID="1735338353513" BASECOST="0.0" LEVELS="3" ALIAS="Deadly Blow:  +3d6" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="ANY" OPTIONID="ANY" OPTION_ALIAS="any circumstances, any HTH weapon" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="">
                        <NOTES />
                        </TALENT>
                    </TALENTS>
                    <MARTIALARTS>
                        <EXTRADC XMLID="EXTRADC" ID="1735337519112" BASECOST="0.0" LEVELS="10" ALIAS="+10 HTH Damage Class(es)" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="">
                        <NOTES />
                        </EXTRADC>
                        <EXTRADC XMLID="EXTRADC" ID="1735337540820" BASECOST="0.0" LEVELS="1" ALIAS="+1 HTH Damage Class(es)" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="">
                        <NOTES />
                        </EXTRADC>
                        <MANEUVER XMLID="MANEUVER" ID="1735337570473" BASECOST="4.0" LEVELS="0" ALIAS="Nerve Strike" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Nerve Strike" OCV="-1" DCV="+1" DC="4" PHASE="1/2" EFFECT="[NNDDC]" ADDSTR="No" ACTIVECOST="15" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="[NNDDC]">
                        <NOTES />
                        </MANEUVER>
                        <MANEUVER XMLID="MANEUVER" ID="1735337587944" BASECOST="4.0" LEVELS="0" ALIAS="Killing Strike" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Killing Strike" OCV="-2" DCV="+0" DC="4" PHASE="1/2" EFFECT="[KILLINGDC]" ADDSTR="Yes" ACTIVECOST="10" DAMAGETYPE="0" MAXSTR="70" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="[WEAPONKILLINGDC]">
                        <NOTES />
                        </MANEUVER>
                        <MANEUVER XMLID="MANEUVER" ID="1735337623705" BASECOST="4.0" LEVELS="0" ALIAS="Martial Strike" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Martial Strike" OCV="+0" DCV="+2" DC="2" PHASE="1/2" EFFECT="[NORMALDC] Strike" ADDSTR="Yes" ACTIVECOST="20" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="Weapon [WEAPONDC] Strike">
                        <NOTES />
                        </MANEUVER>
                        <MANEUVER XMLID="MANEUVER" ID="1735337662832" BASECOST="4.0" LEVELS="0" ALIAS="Martial Flash" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="Hearing" CATEGORY="Hand To Hand" DISPLAY="Martial Flash" OCV="-1" DCV="-1" DC="4" PHASE="1/2" EFFECT="[FLASHDC]" ADDSTR="No" ACTIVECOST="10" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="[FLASHDC]">
                        <NOTES />60
                        </MANEUVER>
                        <MANEUVER XMLID="MANEUVER" ID="1735337713693" BASECOST="5.0" LEVELS="0" ALIAS="Sacrifice Strike" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Sacrifice Strike" OCV="+1" DCV="-2" DC="4" PHASE="1/2" EFFECT="[NORMALDC] Strike" ADDSTR="Yes" ACTIVECOST="15" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="Weapon [WEAPONDC] Strike">
                        <NOTES />
                        </MANEUVER>
                    </MARTIALARTS>
                    <POWERS>
                        <POWER XMLID="HKA" ID="1735338119256" BASECOST="0.0" LEVELS="1" ALIAS="Killing Attack - Hand-To-Hand" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        <ADDER XMLID="PLUSONEHALFDIE" ID="1735338266616" BASECOST="10.0" LEVELS="0" ALIAS="+1/2 d6" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                            <NOTES />
                        </ADDER>
                        </POWER>
                        <POWER XMLID="HKA" ID="1735338133849" BASECOST="0.0" LEVELS="0" ALIAS="Killing Attack - Hand-To-Hand" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        <ADDER XMLID="MINUSONEPIP" ID="1735338276494" BASECOST="10.0" LEVELS="0" ALIAS="+1d6 -1" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                            <NOTES />
                        </ADDER>
                        </POWER>
                        <POWER XMLID="HKA" ID="1735338147368" BASECOST="0.0" LEVELS="1" ALIAS="Killing Attack - Hand-To-Hand" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        <ADDER XMLID="MINUSONEPIP" ID="1735338293092" BASECOST="10.0" LEVELS="0" ALIAS="+1d6 -1" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                            <NOTES />
                        </ADDER>
                        </POWER>
                    </POWERS>
                    <DISADVANTAGES />
                    <EQUIPMENT />
                    <RULES name="Default" path="foo.hdr" BASEPOINTS="200" DISADPOINTS="150" APPEREND="10" STRAPPEREND="10" NCMSELECTED="No" NCMUSERCHANGEABLE="Yes" ATTACKAPMAXVALUE="90" ATTACKAPMAXRESPONSE="0" DEFENSEAPMAXVALUE="90" DEFENSEAPMAXRESPONSE="0" DISADCATEGORYMAXVALUE="75" DISADCATEGORYMAXRESPONSE="0" AVAILDISADPOINTSRESPONSE="0" AVAILTOTALPOINTSRESPONSE="0" CHARACTERISTICMAXVALUE="1000" CHARACTERISTICMAXRESPONSE="0" MANEUVERMAXVALUE="1000" MANEUVERMAXRESPONSE="0" SKILLMAXVALUE="1000" SKILLMAXRESPONSE="0" PERKMAXVALUE="1000" PERKMAXRESPONSE="0" TALENTMAXVALUE="1000" TALENTMAXRESPONSE="0" POWERMAXVALUE="1000" POWERMAXRESPONSE="0" EQUIPMENTCOSTVALUE="1000" EQUIPMENTCOSTRESPONSE="0" EQUIPMENTCOSTUNITS="$" EQUIPMENTCOSTCONVERSION="1.0" EQUIPMENTCOSTDECIMALPLACES="0" EQUIPMENTUNITSPREFIX="Yes" STANDARDEFFECTALLOWED="Yes" USEEXPANDEDGROWTHCHART="No" DEFAULTSTANDARDEFFECT="No" MULTIPLIERALLOWED="No" LANGUAGESIMILARITIESUSED="No" LITERACYFREE="No" NATIVELITERACYFREE="Yes" EQUIPMENTALLOWED="Yes" PENALIZENOLEVEL1="No" ONLYSELLONEFIGURED="Yes" USEINCREASEDDAMAGEDIFFERENTIATION="No" AUTOMATICALLYAPPLYNOFIGURED="Yes" LINKACROSSFRAMEWORK="2" SPECIALTYPEINFRAMEWORK="1" NONENDUSINGABILITYINEC="1" USESKILLMAXIMA="No" USESKILLMULTIPLIERS="No" LANGUAGESASINTSKILL="No" SKILLMAXIMALIMIT="13" SKILLROLLBASE="9" SKILLROLLDENOMINATOR="5.0" CHARROLLBASE="9" CHARROLLDENOMINATOR="5.0" USENOTES1="No" USENOTES2="No" USENOTES3="No" USENOTES4="No" USENOTES5="No" NOTES1LABEL="Notes 1" NOTES2LABEL="Notes 2" NOTES3LABEL="Notes 3" NOTES4LABEL="Notes 4" NOTES5LABEL="Notes 5" />
                    </CHARACTER>
                `;

                let actor;
                let previousSetting;

                beforeEach(async () => {
                    previousSetting = await game.settings.get(HEROSYS.module, "DoubleDamageLimit");
                    await game.settings.set(HEROSYS.module, "DoubleDamageLimit", true);

                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);
                });

                afterEach(async () => {
                    await game.settings.set(HEROSYS.module, "DoubleDamageLimit", previousSetting);
                });

                // Verify the cost of powers
                it("should match the overall cost of HD", function () {
                    assert.equal(actor.system.points, 303);
                });
                it("should match the cost breakdown of HD", function () {
                    assert.deepEqual(actor.system.pointsDetail, {
                        characteristics: 60,
                        martialart: 65,
                        power: 60,
                        skill: 88,
                        talent: 30,
                    });
                });

                describe("MANEUVERs with Velocity", function () {
                    it("should add velocity damage for Move Through", function () {
                        // Base DCs: Move Through (STR 20 -> 4DC)  => 4DC
                        // Added DCs: velocity 30"/3 -> 10DC => +10DC
                        // Base + Added = 4DC + 10DC (doubling rule does not apply) = 14 DC. Move Through is 5AP/die => 14d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((item) => item.system.XMLID === "MOVETHROUGH"),
                                { effectivestr: 20, velocity: 30 },
                            ),
                            "14d6",
                        );
                    });

                    it("should add velocity damage for Move Through (not subject to doubling rule)", function () {
                        // Base DCs: Move Through (STR 20 -> 4DC)  => 4DC
                        // Added DCs: velocity 90"/3 -> 30DC => +30DC
                        // Base + Added = 4DC + 30DC (doubling rule does not apply) = 34 DC. Move Through is 5AP/die => 34d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((item) => item.system.XMLID === "MOVETHROUGH"),
                                { effectivestr: 20, velocity: 90 },
                            ),
                            "34d6",
                        );
                    });

                    it("should add velocity damage for Move By", function () {
                        // Base DCs: Move By (STR 20 -> 4DC/2 -> 2DC)  => 2DC
                        // Added DCs: velocity 10"/5 -> 3DC => +3DC
                        // Base + Added = 2DC + 3DC (doubling rule does not apply) = 4 DC. Move By is 5AP/die => 4d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((item) => item.system.XMLID === "MOVEBY"),
                                { effectivestr: 20, velocity: 10 },
                            ),
                            "4d6",
                        );
                    });

                    it("should add velocity damage for Move By (not subject to doubling rule)", function () {
                        // Base DCs: Move By (STR 20 -> 4DC/2 -> 2DC) => 2DC
                        // Added DCs: velocity 90"/5 -> 18DC => +18DC
                        // Base + Added = 2DC + 18DC (doubling rule does not apply) = 20 DC. Move By is 5AP/die => 20d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((item) => item.system.XMLID === "MOVEBY"),
                                { effectivestr: 20, velocity: 90 },
                            ),
                            "20d6",
                        );
                    });

                    // TODO: move through with weapon
                    // TODO: move by with weapon
                });

                describe("Martial Arts", function () {
                    it("should have the correct damage for Nerve Strike", function () {
                        // Base DCs: Nerve Strike 4DC (aka 2d6), EXTRADC +11DC => 15DC.
                        // Added DCs: Does not use STR => +0 DC
                        // Base + Added = 15DC. Nerve Strike is an NND (10AP/die) => 7½d6
                        assert.equal(actor.items.find((o) => o.system.ALIAS === "Nerve Strike").system.damage, "7½d6");
                    });

                    it("should have the correct damage for Killing Strike", function () {
                        // Added DCs: Killing Strike 4DC (killing halved in 5e becomes 2DC), EXTRADC +11DC (killing halved in 5e becomes 5DC) => 7 DC
                        // Base: STR +14 DC (STR 70) => +14 DC  =>  14DC
                        // Base + Added = 7C + 14DC (doubling rule clamps the strength added DC) = 14DC. Killing strike is 14AP/die => 4½d6
                        // NOTE: HD gets 5d6K as it seems to be more than doubling the equivalent HKA. Math rounding problems in HD?
                        assert.equal(
                            actor.items.find((o) => o.system.ALIAS === "Killing Strike").system.damage,
                            "4½d6K",
                        );
                    });

                    it("should have the correct damage for Martial Strike", function () {
                        assert.equal(
                            // Base DCs: STR +14 DC (STR 70),  EXTRADC +11DC => +25 DC
                            // Added DCs: Martial Strike 2DC =>  +2 DC
                            // Base + Added = 25DC + 2DC (doubling rule does not apply) = 27DC. Martial Strike is 5AP/die => 27d6
                            actor.items.find((o) => o.system.ALIAS === "Martial Strike").system.damage,
                            "27d6",
                        );
                    });

                    it("should have the correct damage for Martial Flash", function () {
                        // Base DCs: Martial Flash 4DC (aka 2d6), EXTRADC +11DC => 15DC.
                        // Added DCs: Does not use STR => +0 DC
                        // Base + Added = 15DC. Martial Flash is a 5AP/die => 15d6
                        assert.equal(actor.items.find((o) => o.system.ALIAS === "Martial Flash").system.damage, "15d6");
                    });

                    it("should have the correct damage for Sacrifice Strike", function () {
                        // Base DCs:  STR +14 DC (STR 70),  EXTRADC +11DC =>  25DC
                        // Added: Sacrifice Strike 4DC =>  4DC
                        // Base + Added = 15DC + 4DC (doubling rule does not apply) = 29DC. Sacrifice Strike is 5AP/die => 29d6
                        assert.equal(
                            actor.items.find((o) => o.system.ALIAS === "Sacrifice Strike").system.damage,
                            "29d6",
                        );
                    });
                });

                describe("Maneuvers with CSLs", function () {
                    let cslItem;
                    let cslPreviousActiveState;
                    let cslPreviousAllocation;

                    beforeEach(function () {
                        // Turn on the CSLs
                        cslItem = actor.items.find((item) => item.system.XMLID === "COMBAT_LEVELS");
                        cslPreviousActiveState = cslItem.system.active;
                        cslItem.system.active = true;

                        // Set the CSLs for DCs
                        cslPreviousAllocation = cslItem.system.csl;
                        cslItem.system.csl = Array(parseInt(cslItem.system.LEVELS || 0)).fill("dc");
                    });

                    afterEach(function () {
                        // Turn off the CSLs
                        cslItem.system.active = cslPreviousActiveState;

                        // Set the CSLs to previous
                        cslItem.system.csl = cslPreviousAllocation;
                    });

                    it("should have the correct damage for Nerve Strike", function () {
                        // Base DCs: Nerve Strike 4DC (aka 2d6), EXTRADC +11DC => 15DC.
                        // Added DCs: (11 CSL) 2:1 +5DC
                        // Base + Added = 20DC. Nerve Strike is an NND (10AP/die) => 10d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((o) => o.system.ALIAS === "Nerve Strike"),
                                {},
                            ),
                            "10d6",
                        );
                    });

                    it("should have the correct damage for Killing Strike", function () {
                        // Base DCs: Killing Strike 4DC (killing halved in 5e becomes 2DC), EXTRADC +11DC (killing halved in 5e becomes 5DC) => 7 DC
                        // Added DCs: (11 CSL) 2:1 +5DC, STR +0 DC (STR 0)  => +5DC
                        // Base + Added = 7C + 5DC (doubling rule not applied) = 12DC. Killing strike is 15AP/die => 4d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((o) => o.system.ALIAS === "Killing Strike"),
                                { effectivestr: 0 },
                            ),
                            "4d6",
                        );
                    });

                    it("should have the correct damage for Martial Strike", function () {
                        assert.equal(
                            // Base DCs: STR +14 DC (STR 70),  EXTRADC +11DC => +25 DC
                            // Added DCs: Martial Strike 2DC, (11 CSL) 2:1 +5DC =>  +7 DC
                            // Base + Added = 25DC + 7DC (doubling rule does not apply) = 32DC. Martial Strike is 5AP/die => 32d6
                            getEffectFormulaFromItem(
                                actor.items.find((o) => o.system.ALIAS === "Martial Strike"),
                                {},
                            ),
                            "32d6",
                        );
                    });

                    it("should have the correct damage for Martial Flash", function () {
                        // Base DCs: Martial Flash 4DC (aka 2d6), EXTRADC +11DC => 15DC.
                        // Added DCs: Does not use STR, (11 CSL) 2:1 +5DC => +5 DC
                        // Base + Added = 20DC. Martial Flash is a 5AP/die => 20d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((o) => o.system.ALIAS === "Martial Flash"),
                                {},
                            ),
                            "20d6",
                        );
                    });

                    it("should have the correct damage for Sacrifice Strike", function () {
                        // Base DCs:  STR +14 DC (STR 70),  EXTRADC +11DC =>  25DC
                        // Added: Sacrifice Strike 4DC, (11 CSL) 2:1 +5DC =>  9DC
                        // Base + Added = 15DC + 9DC (doubling rule does not apply) = 34DC. Sacrifice Strike is 5AP/die => 34d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((o) => o.system.ALIAS === "Sacrifice Strike"),
                                {},
                            ),
                            "34d6",
                        );
                    });

                    it("should add velocity damage for Move By", function () {
                        // Base DCs: Move By (STR 20 -> 4DC/2 -> 2DC)  => 2DC
                        // Added DCs: velocity 10"/5 -> 2DC, (11 CSL) 2:1 +5DC => +7DC
                        // Base + Added = 2DC + 7DC (doubling rule does apply but not to velocity) = 6 DC. Move By is 5AP/die => 6d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((item) => item.system.XMLID === "MOVEBY"),
                                { effectivestr: 20, velocity: 10 },
                            ),
                            "6d6",
                        );
                    });
                });
            });

            describe("5e - Maneuvers - base vs added DCs with HTH attacks", function () {
                const contents = `
                    <?xml version="1.0" encoding="UTF-16"?>
                    <CHARACTER version="6.0" TEMPLATE="builtIn.Superheroic.hdt">
                    <BASIC_CONFIGURATION BASE_POINTS="200" DISAD_POINTS="150" EXPERIENCE="0" />
                    <CHARACTER_INFO CHARACTER_NAME="base vs added DCs Test" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.46224760379584" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                        <BACKGROUND />
                        <PERSONALITY />
                        <QUOTE />1
                        <TACTICS />
                        <CAMPAIGN_USE />
                        <APPEARANCE />
                        <NOTES1 />
                        <NOTES2 />
                        <NOTES3 />
                        <NOTES4 />
                        <NOTES5 />
                    </CHARACTER_INFO>
                    <CHARACTERISTICS>
                        <STR XMLID="STR" ID="1735337504125" BASECOST="0.0" LEVELS="0" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STR>
                        <DEX XMLID="DEX" ID="1735337503912" BASECOST="0.0" LEVELS="0" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DEX>
                        <CON XMLID="CON" ID="1735337503964" BASECOST="0.0" LEVELS="0" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </CON>
                        <BODY XMLID="BODY" ID="1735337504092" BASECOST="0.0" LEVELS="0" ALIAS="BODY" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </BODY>
                        <INT XMLID="INT" ID="1735337504091" BASECOST="0.0" LEVELS="0" ALIAS="INT" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </INT>
                        <EGO XMLID="EGO" ID="1735337504562" BASECOST="0.0" LEVELS="0" ALIAS="EGO" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </EGO>
                        <PRE XMLID="PRE" ID="1735337504596" BASECOST="0.0" LEVELS="0" ALIAS="PRE" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PRE>
                        <COM XMLID="COM" ID="1735337504526" BASECOST="0.0" LEVELS="0" ALIAS="COM" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </COM>
                        <PD XMLID="PD" ID="1735337504806" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PD>
                        <ED XMLID="ED" ID="1735337503860" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </ED>
                        <SPD XMLID="SPD" ID="1735337503827" BASECOST="0.0" LEVELS="0" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SPD>
                        <REC XMLID="REC" ID="1735337504790" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </REC>
                        <END XMLID="END" ID="1735337504217" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </END>
                        <STUN XMLID="STUN" ID="1735337503922" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STUN>
                        <RUNNING XMLID="RUNNING" ID="1735337503998" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </RUNNING>
                        <SWIMMING XMLID="SWIMMING" ID="1735337504502" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SWIMMING>
                        <LEAPING XMLID="LEAPING" ID="1735337504789" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </LEAPING>
                    </CHARACTERISTICS>
                    <SKILLS>
                        <SKILL XMLID="COMBAT_LEVELS" ID="1735835785525" BASECOST="0.0" LEVELS="11" ALIAS="Combat Skill Levels" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="ALL" OPTIONID="ALL" OPTION_ALIAS="with All Combat" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="GENERAL" FAMILIARITY="No" PROFICIENCY="No">
                        <NOTES />
                        </SKILL>
                    </SKILLS>
                    <PERKS />
                    <TALENTS />
                    <MARTIALARTS>
                        <MANEUVER XMLID="MANEUVER" ID="1735337587944" BASECOST="4.0" LEVELS="0" ALIAS="Killing Strike" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Killing Strike" OCV="-2" DCV="+0" DC="4" PHASE="1/2" EFFECT="[KILLINGDC]" ADDSTR="Yes" ACTIVECOST="10" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="[WEAPONKILLINGDC]">
                            <NOTES />
                        </MANEUVER>
                        <MANEUVER XMLID="MANEUVER" ID="1735337623705" BASECOST="4.0" LEVELS="0" ALIAS="Martial Strike" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Martial Strike" OCV="+0" DCV="+2" DC="2" PHASE="1/2" EFFECT="[NORMALDC] Strike" ADDSTR="Yes" ACTIVECOST="20" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="Weapon [WEAPONDC] Strike">
                            <NOTES />
                        </MANEUVER>
                        <MANEUVER XMLID="MANEUVER" ID="1735337570473" BASECOST="4.0" LEVELS="0" ALIAS="Nerve Strike" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Nerve Strike" OCV="-1" DCV="+1" DC="4" PHASE="1/2" EFFECT="[NNDDC]" ADDSTR="No" ACTIVECOST="15" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="[NNDDC]">
                            <NOTES />
                        </MANEUVER>
                        <MANEUVER XMLID="MANEUVER" ID="1735337662832" BASECOST="4.0" LEVELS="0" ALIAS="Martial Flash" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="Hearing" CATEGORY="Hand To Hand" DISPLAY="Martial Flash" OCV="-1" DCV="-1" DC="4" PHASE="1/2" EFFECT="[FLASHDC]" ADDSTR="No" ACTIVECOST="10" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="[FLASHDC]">
                            <NOTES />
                        </MANEUVER>
                        <MANEUVER XMLID="MANEUVER" ID="1735337713693" BASECOST="5.0" LEVELS="0" ALIAS="Sacrifice Strike" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Sacrifice Strike" OCV="+1" DCV="-2" DC="4" PHASE="1/2" EFFECT="[NORMALDC] Strike" ADDSTR="Yes" ACTIVECOST="15" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No" WEAPONEFFECT="Weapon [WEAPONDC] Strike">
                            <NOTES />
                        </MANEUVER>
                        <MANEUVER XMLID="MANEUVER" ID="1735422272832" BASECOST="4.0" LEVELS="0" ALIAS="Martial Strike" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Martial Strike" OCV="+0" DCV="+2" DC="2" PHASE="1/2" EFFECT="[NORMALDC] Strike" ADDSTR="Yes" ACTIVECOST="20" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="Yes" WEAPONEFFECT="Weapon [WEAPONDC] Strike">
                            <NOTES />
                        </MANEUVER>
                        <MANEUVER XMLID="MANEUVER" ID="1736741448829" BASECOST="5.0" LEVELS="0" ALIAS="Flying Dodge" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Flying Dodge" OCV="--" DCV="+4" DC="0" PHASE="1/2" EFFECT="Dodge All Attacks, Abort; FMove" ADDSTR="No" ACTIVECOST="50" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="No">
                            <NOTES />
                        </MANEUVER>
                    </MARTIALARTS>
                    <POWERS>
                        <POWER XMLID="HKA" ID="1735338119256" BASECOST="0.0" LEVELS="1" ALIAS="Killing Attack - Hand-To-Hand" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="HKA1" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        <ADDER XMLID="PLUSONEHALFDIE" ID="1735341333479" BASECOST="10.0" LEVELS="0" ALIAS="+1/2 d6" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                            <NOTES />
                        </ADDER>
                        </POWER>
                        <POWER XMLID="HKA" ID="1735338133849" BASECOST="0.0" LEVELS="0" ALIAS="Killing Attack - Hand-To-Hand" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="HKA2" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        <ADDER XMLID="MINUSONEPIP" ID="1735341346922" BASECOST="10.0" LEVELS="0" ALIAS="+1d6 -1" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                            <NOTES />
                        </ADDER>
                        </POWER>
                        <POWER XMLID="HKA" ID="1735338147368" BASECOST="0.0" LEVELS="1" ALIAS="Killing Attack - Hand-To-Hand" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="HKA3" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        <ADDER XMLID="MINUSONEPIP" ID="1735341355413" BASECOST="10.0" LEVELS="0" ALIAS="+1d6 -1" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                            <NOTES />
                        </ADDER>
                        </POWER>
                        <POWER XMLID="HKA" ID="1735504607262" BASECOST="0.0" LEVELS="2" ALIAS="Killing Attack - Hand-To-Hand" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="HKA3" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        <ADDER XMLID="PLUSONEPIP" ID="1735504900458" BASECOST="5.0" LEVELS="0" ALIAS="+1 pip" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                            <NOTES />
                        </ADDER>
                        </POWER>
                        <POWER XMLID="HANDTOHANDATTACK" ID="1735510411182" BASECOST="0.0" LEVELS="14" ALIAS="Hand-To-Hand Attack" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        <MODIFIER XMLID="HANDTOHANDATTACK" ID="1735510801302" BASECOST="-0.5" LEVELS="0" ALIAS="Hand-To-Hand Attack" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                            <NOTES />
                        </MODIFIER>
                        </POWER>
                    </POWERS>
                    <DISADVANTAGES />
                    <EQUIPMENT />
                    <RULES name="Default" path="foo.hdr" BASEPOINTS="200" DISADPOINTS="150" APPEREND="10" STRAPPEREND="10" NCMSELECTED="No" NCMUSERCHANGEABLE="Yes" ATTACKAPMAXVALUE="90" ATTACKAPMAXRESPONSE="0" DEFENSEAPMAXVALUE="90" DEFENSEAPMAXRESPONSE="0" DISADCATEGORYMAXVALUE="75" DISADCATEGORYMAXRESPONSE="0" AVAILDISADPOINTSRESPONSE="0" AVAILTOTALPOINTSRESPONSE="0" CHARACTERISTICMAXVALUE="1000" CHARACTERISTICMAXRESPONSE="0" MANEUVERMAXVALUE="1000" MANEUVERMAXRESPONSE="0" SKILLMAXVALUE="1000" SKILLMAXRESPONSE="0" PERKMAXVALUE="1000" PERKMAXRESPONSE="0" TALENTMAXVALUE="1000" TALENTMAXRESPONSE="0" POWERMAXVALUE="1000" POWERMAXRESPONSE="0" EQUIPMENTCOSTVALUE="1000" EQUIPMENTCOSTRESPONSE="0" EQUIPMENTCOSTUNITS="$" EQUIPMENTCOSTCONVERSION="1.0" EQUIPMENTCOSTDECIMALPLACES="0" EQUIPMENTUNITSPREFIX="Yes" STANDARDEFFECTALLOWED="Yes" USEEXPANDEDGROWTHCHART="No" DEFAULTSTANDARDEFFECT="No" MULTIPLIERALLOWED="No" LANGUAGESIMILARITIESUSED="No" LITERACYFREE="No" NATIVELITERACYFREE="Yes" EQUIPMENTALLOWED="Yes" PENALIZENOLEVEL1="No" ONLYSELLONEFIGURED="Yes" USEINCREASEDDAMAGEDIFFERENTIATION="No" AUTOMATICALLYAPPLYNOFIGURED="Yes" LINKACROSSFRAMEWORK="2" SPECIALTYPEINFRAMEWORK="1" NONENDUSINGABILITYINEC="1" USESKILLMAXIMA="No" USESKILLMULTIPLIERS="No" LANGUAGESASINTSKILL="No" SKILLMAXIMALIMIT="13" SKILLROLLBASE="9" SKILLROLLDENOMINATOR="5.0" CHARROLLBASE="9" CHARROLLDENOMINATOR="5.0" USENOTES1="No" USENOTES2="No" USENOTES3="No" USENOTES4="No" USENOTES5="No" NOTES1LABEL="Notes 1" NOTES2LABEL="Notes 2" NOTES3LABEL="Notes 3" NOTES4LABEL="Notes 4" NOTES5LABEL="Notes 5" />
                    </CHARACTER>
                `;

                let actor;
                let previousSetting;
                let hthAttack;

                beforeEach(async () => {
                    previousSetting = await game.settings.get(HEROSYS.module, "DoubleDamageLimit");
                    await game.settings.set(HEROSYS.module, "DoubleDamageLimit", true);

                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);

                    hthAttack = actor.items.find((item) => item.system.XMLID === "HANDTOHANDATTACK");
                });

                afterEach(async () => {
                    await game.settings.set(HEROSYS.module, "DoubleDamageLimit", previousSetting);
                });

                // Verify the cost of powers
                it("should match the overall cost of HD", function () {
                    assert.equal(actor.system.points, 260);
                });

                it("should match the cost breakdown of HD", function () {
                    assert.deepEqual(actor.system.pointsDetail, {
                        characteristics: 0,
                        martialart: 30,
                        power: 142,
                        skill: 88,
                    });
                });

                describe("maneuver END usage", function () {
                    // Non strength combat maneuvers use 1 END
                    describe("BLOCK Combat Maneuver", function () {
                        it("should use 1 END", function () {
                            const blockCombatManeuver = actor.items.find((item) => item.system.XMLID === "BLOCK");
                            assert.equal(blockCombatManeuver.system.end, 1);
                        });
                    });

                    // Non strength combat maneuvers use 1 END
                    describe("DODGE Combat Maneuver", function () {
                        it("should use 1 END", function () {
                            const dodgeCombatManeuver = actor.items.find((item) => item.system.XMLID === "DODGE");
                            assert.equal(dodgeCombatManeuver.system.end, 1);
                        });
                    });

                    // Martial maneuvers use 0 END
                    describe("Flying Dodge Martial Art Maneuver", function () {
                        it("should use 0 END", function () {
                            const blockCombatManeuver = actor.items.find(
                                (item) => item.system.XMLID === "MANEUVER" && item.name === "Flying Dodge",
                            );
                            assert.equal(blockCombatManeuver.system.end, 0);
                        });
                    });
                });

                describe("basic maneuvers", function () {
                    it("should have the correct damage for a strike", function () {
                        // Base DCs: STR +2 DC (STR 10), HA Damage +14 DC (+14d6)=> +16 DC
                        // Added DCs: Strike 0DC =>  +0 DC
                        // Base + Added = 16DC + 0DC (doubling rule does not apply) = 16 DC. Martial Strike is 5AP/die => 16d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((item) => item.system.XMLID === "STRIKE"),
                                { hthAttackItems: [hthAttack] },
                            ),
                            "16d6",
                        );
                    });

                    it("should have the correct damage for a strike without HTH Attack", function () {
                        // Base DCs: STR +2 DC (STR 10) => +2 DC
                        // Added DCs: Strike 0DC =>  +0 DC
                        // Base + Added = 2DC + 0DC (doubling rule does not apply) = 2 DC. Martial Strike is 5AP/die => 2d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((item) => item.system.XMLID === "STRIKE"),
                                {},
                            ),
                            "2d6",
                        );
                    });
                });

                describe("Haymaker", function () {
                    let haymakerManeuver;

                    beforeEach(function () {
                        // Turn on the haymaker
                        haymakerManeuver = actor.items.find(
                            (item) => item.type === "maneuver" && item.system.XMLID === "HAYMAKER",
                        );
                    });

                    it("should increase the damage of a Strike", function () {
                        // Base DCs: STR +2 DC (STR 10), HA Damage +14 DC (+14d6)=> +16 DC
                        // Added DCs: Strike 0DC, Haymaker +4DC =>  +4 DC
                        // Base + Added = 16DC + 4DC (doubling rule does not apply) = 16 DC. Martial Strike is 5AP/die => 20d6
                        const strikeItem = actor.items.find((item) => item.system.XMLID === "STRIKE");
                        assert.equal(
                            getEffectFormulaFromItem(strikeItem, {
                                haymakerManeuverActiveItem: haymakerManeuver,
                                hthAttackItems: [hthAttack],
                            }),
                            "20d6",
                        );
                    });

                    it("should not increase the damage of a move through", function () {
                        // Base DCs: Move Through (STR 10 -> 2d6/2DC) => 2DC
                        // Added DCs: Haymaker does not apply since we are executing a maneuver and this is not a Strike, velocity 20"/3 -> 6d6/6DC,
                        // Base + Added = 2DC + 6DC (doubling rule does not apply) = 8 DC. Move Through is 5AP/die => 8d6
                        const moveThroughItem = actor.items.find((item) => item.system.XMLID === "MOVETHROUGH");
                        assert.equal(
                            getEffectFormulaFromItem(moveThroughItem, {
                                haymakerManeuverActiveItem: haymakerManeuver,
                                velocity: 20,
                            }),
                            "8d6",
                        );
                    });
                });

                describe("MANEUVER with Velocity", function () {
                    it("should add velocity damage for Move Through", function () {
                        // Base DCs: Move Through (STR 20 -> 4DC)  => 4DC
                        // Added DCs: velocity 30"/3 -> 10DC => +10DC
                        // Base + Added = 4DC + 10DC (doubling rule does not apply) = 14 DC. Move Through is 5AP/die => 14d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((item) => item.system.XMLID === "MOVETHROUGH"),
                                { effectivestr: 20, velocity: 30 },
                            ),
                            "14d6",
                        );
                    });

                    it("should add velocity damage for Move Through (not subject to doubling rule)", function () {
                        // Base DCs: Move Through (STR 20 -> 4DC)  => 4DC
                        // Added DCs: velocity 90"/3 -> 30DC => +30DC
                        // Base + Added = 4DC + 30DC (doubling rule does not apply) = 34 DC. Move Through is 5AP/die => 34d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((item) => item.system.XMLID === "MOVETHROUGH"),
                                { effectivestr: 20, velocity: 90 },
                            ),
                            "34d6",
                        );
                    });

                    it("should add velocity damage for Move By", function () {
                        // Base DCs: Move By (STR 20 -> 4 DC/2 -> 2DC), +14 DC HTH/2 -> +7DC => 9DC
                        // Added DCs: velocity 10"/5 -> 2DC => +2DC
                        // Base + Added = 9DC + 2DC (doubling rule does not apply) = 11 DC. Move By is 5AP/die => 11d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((item) => item.system.XMLID === "MOVEBY"),
                                { hthAttackItems: [hthAttack], effectivestr: 20, velocity: 10 },
                            ),
                            "11d6",
                        );
                    });

                    it("should add velocity damage for Move By (not subject to doubling rule)", function () {
                        // Base DCs: Move By (STR 20 -> 4DC/2 -> 2DC) => 2DC
                        // Added DCs: velocity 90"/5 -> 18DC => +18DC
                        // Base + Added = 2DC + 18DC (doubling rule does not apply) = 20 DC. Move By is 5AP/die => 20d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((item) => item.system.XMLID === "MOVEBY"),
                                { effectivestr: 20, velocity: 90 },
                            ),
                            "20d6",
                        );
                    });

                    // TODO: move through with weapon
                    // TODO: move by with weapon
                });

                describe("Martial Arts", function () {
                    it("should have the correct damage for Nerve Strike", function () {
                        // Base DCs: Nerve Strike 4DC (aka 2d6) => 4DC.
                        // Added DCs: Does not use STR, HTH doesn't activate as STR < 0 => +0 DC
                        // Base + Added = 4DC. Nerve Strike is an NND (10AP/die) => 2d6
                        const moveBy = actor.items.find((item) => item.system.ALIAS === "Nerve Strike");
                        assert.equal(
                            getEffectFormulaFromItem(moveBy, {
                                hthAttackItems: [hthAttack],
                                effectivestr: 20,
                                velocity: 90,
                            }),
                            "2d6",
                        );
                    });

                    it("should have the correct damage for Killing Strike", function () {
                        // Base: Killing Strike 4DC (killing halved in 5e becomes 2DC) => 2 DC
                        // Added DCs: STR +2 DC (STR 10), HA Damage +14 DC (+14d6) => +16 DC
                        // Base + Added = 2C + 16DC (doubling rule clamps the strength added DC) = 4DC. Killing strike is 15AP/die => 1d6+1
                        const moveBy = actor.items.find((item) => item.system.ALIAS === "Killing Strike");

                        assert.equal(
                            getEffectFormulaFromItem(moveBy, {
                                hthAttackItems: [hthAttack],
                                effectivestr: 20,
                                velocity: 90,
                            }),
                            "1d6+1",
                        );
                    });

                    it("should have the correct damage for Martial Strike", function () {
                        // Base DCs: STR +2 DC (STR 10), HA Damage +14 DC (+14d6)=> +16 DC
                        // Added DCs: Martial Strike 2DC =>  +2 DC
                        // Base + Added = 16DC + 2DC (doubling rule does not apply) = 18 DC. Martial Strike is 5AP/die => 18d6
                        const msItem = actor.items.find((o) => o.system.ALIAS === "Martial Strike");

                        assert.equal(getEffectFormulaFromItem(msItem, { hthAttackItems: [hthAttack] }), "18d6");
                    });

                    it("should have the correct damage for Martial Flash", function () {
                        // Base DCs: Martial Flash 4DC => 4DC.
                        // Added DCs: Does not use STR and no HTH Attack  => +0 DC
                        // Base + Added = 4DC. Martial Flash is a 5AP/die => 4d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((item) => item.system.ALIAS === "Martial Flash"),
                                { hthAttackItems: [hthAttack], effectivestr: 20, velocity: 90 },
                            ),
                            "4d6",
                        );
                    });

                    it("should have the correct damage for Sacrifice Strike", function () {
                        // Base DCs: STR +2 DC (STR 10), HA Damage +14 DC (+14d6)=> +16 DC
                        // Added: Sacrifice Strike 4DC =>  4DC
                        // Base + Added = 16DC + 4DC (doubling rule does not apply) = 20DC. Sacrifice Strike is 5AP/die => 20d6
                        const ssItem = actor.items.find((o) => o.system.ALIAS === "Sacrifice Strike");
                        assert.equal(getEffectFormulaFromItem(ssItem, { hthAttackItems: [hthAttack] }), "20d6");
                    });
                });

                describe("Martial Arts with CSLs", function () {
                    let cslItem;
                    let cslPreviousActiveState;
                    let cslPreviousAllocation;

                    beforeEach(function () {
                        // Turn on the CSLs
                        cslItem = actor.items.find((item) => item.system.XMLID === "COMBAT_LEVELS");
                        cslPreviousActiveState = cslItem.system.active;
                        cslItem.system.active = true;

                        // Set the CSLs for DCs
                        cslPreviousAllocation = cslItem.system.csl;
                        cslItem.system.csl = Array(parseInt(cslItem.system.LEVELS || 0)).fill("dc");
                    });

                    afterEach(function () {
                        // Turn off the CSLs
                        cslItem.system.active = cslPreviousActiveState;

                        // Set the CSLs to previous
                        cslItem.system.csl = cslPreviousAllocation;
                    });

                    it("should have the correct damage for Nerve Strike", function () {
                        // Base DCs: Nerve Strike 4DC (aka 2d6) => 4DC.
                        // Added DCs: (11 CSL) 2:1 +5DC
                        // Base + Added = 4 DC + 5DC (Doubling rule kicks in) => 8DC. Nerve Strike is an NND (10AP/die) => 4d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((o) => o.system.ALIAS === "Nerve Strike"),
                                {},
                            ),
                            "4d6",
                        );
                    });

                    it("should have the correct damage for Killing Strike", function () {
                        // Base DCs: Killing Strike 4DC (killing halved in 5e becomes 2DC) => 2 DC
                        // Added DCs: (11 CSL) 2:1 +5DC, STR +0 DC (STR 0)  => +5DC
                        // Base + Added = 2DC + 5DC (doubling rule kicks in) = 4DC. Killing strike is 15AP/die => 1d6+1
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((o) => o.system.ALIAS === "Killing Strike"),
                                { effectivestr: 0 },
                            ),
                            "1d6+1",
                        );
                    });

                    it("should have the correct damage for Martial Strike", function () {
                        assert.equal(
                            // Base DCs: STR +2 DC (STR 10), HA Damage +14 DC (+14d6) => +16 DC
                            // Added DCs: Martial Strike 2DC, (11 CSL) 2:1 +5DC =>  +7 DC
                            // Base + Added = 16DC + 7DC (doubling rule does not apply) = 23DC. Martial Strike is 5AP/die => 23d6
                            getEffectFormulaFromItem(
                                actor.items.find((o) => o.system.ALIAS === "Martial Strike"),
                                { hthAttackItems: [hthAttack] },
                            ),
                            "23d6",
                        );
                    });

                    it("should have the correct damage for Martial Flash", function () {
                        // Base DCs: Martial Flash 4DC (aka 2d6) => 4DC.
                        // Added DCs: Does not use STR, (11 CSL) 2:1 +5DC => +5 DC
                        // Base + Added = 4DC + 5DC (doubling rule kicks in) => 8DC. Martial Flash is a 5AP/die => 8d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((o) => o.system.ALIAS === "Martial Flash"),
                                { hthAttackItems: [hthAttack] },
                            ),
                            "8d6",
                        );
                    });

                    it("should have the correct damage for Sacrifice Strike", function () {
                        // Base DCs: STR +2 DC (STR 10), HA Damage +14 DC (+14d6) => +16 DC
                        // Added: Sacrifice Strike 4DC, (11 CSL) 2:1 +5DC =>  9DC
                        // Base + Added = 16DC + 9DC (doubling rule does not apply) = 25DC. Sacrifice Strike is 5AP/die => 25d6
                        assert.equal(
                            getEffectFormulaFromItem(
                                actor.items.find((o) => o.system.ALIAS === "Sacrifice Strike"),
                                { hthAttackItems: [hthAttack] },
                            ),
                            "25d6",
                        );
                    });
                });

                describe("Underwater", function () {
                    let previousStatuses;

                    beforeEach(function () {
                        // Pretend that we have the underwater status on
                        previousStatuses = actor.statuses;
                        actor.statuses = new Set(["underwater"]);
                    });

                    afterEach(function () {
                        actor.statuses = previousStatuses;
                    });

                    it("should decrease the damage of a Strike", function () {
                        // Base DCs: STR +2 DC (STR 10), HA Damage +14 DC (+14d6) => +16 DC
                        // Added DCs: Strike 0DC, Underwater -2DC =>  -2 DC
                        // Base + Added = 16DC - 2DC (doubling rule does not apply) = 14 DC. Martial Strike is 5AP/die => 14d6
                        const strikeItem = actor.items.find((item) => item.system.XMLID === "STRIKE");
                        assert.equal(getEffectFormulaFromItem(strikeItem, { hthAttackItems: [hthAttack] }), "14d6");
                    });

                    it("should decrease the damage of a move through", function () {
                        // Base DCs: Move Through (STR 10 -> 2d6/2DC) => 2DC
                        // Added DCs: Underwater -2DC, Velocity 20" -> 6DC =>  +4 DC
                        // Base + Added = 2DC + 4DC (doubling rule does not apply) = 6 DC. Move Through is 5AP/die => 6d6
                        const moveThroughItem = actor.items.find((item) => item.system.XMLID === "MOVETHROUGH");
                        assert.equal(getEffectFormulaFromItem(moveThroughItem, { velocity: 20 }), "6d6");
                    });

                    it("should not be possible to do negative damage", function () {
                        // Base DCs: Move Through (STR 10 -> 2d6/2DC) => 2DC
                        // Added DCs: Underwater -2DC, velocity 2" -> 0d6 =>  -2 DC
                        // Base + Added = 1DC - 2DC (doubling rule does not apply) = 0 DC. Move Through is 5AP/die => 0d6
                        const moveThroughItem = actor.items.find((item) => item.system.XMLID === "MOVETHROUGH");
                        assert.equal(getEffectFormulaFromItem(moveThroughItem, { effectivestr: 5, velocity: 2 }), "0");
                    });
                });
            });

            describe("5e - Powers - base vs added DCs with HTH attacks", function () {
                const contents = `
                    <?xml version="1.0" encoding="UTF-16"?>
                    <CHARACTER version="6.0" TEMPLATE="builtIn.Superheroic.hdt">
                    <BASIC_CONFIGURATION BASE_POINTS="200" DISAD_POINTS="150" EXPERIENCE="0" />
                    <CHARACTER_INFO CHARACTER_NAME="Test boostable charges" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.4622476037958" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                        <BACKGROUND />
                        <PERSONALITY />
                        <QUOTE />
                        <TACTICS />
                        <CAMPAIGN_USE />
                        <APPEARANCE />
                        <NOTES1 />
                        <NOTES2 />
                        <NOTES3 />
                        <NOTES4 />
                        <NOTES5 />
                    </CHARACTER_INFO>
                    <CHARACTERISTICS>
                        <STR XMLID="STR" ID="1735766445105" BASECOST="0.0" LEVELS="0" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STR>
                        <DEX XMLID="DEX" ID="1735766445641" BASECOST="0.0" LEVELS="0" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DEX>
                        <CON XMLID="CON" ID="1735766445971" BASECOST="0.0" LEVELS="0" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </CON>
                        <BODY XMLID="BODY" ID="1735766445805" BASECOST="0.0" LEVELS="0" ALIAS="BODY" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </BODY>
                        <INT XMLID="INT" ID="1735766445348" BASECOST="0.0" LEVELS="0" ALIAS="INT" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </INT>
                        <EGO XMLID="EGO" ID="1735766445336" BASECOST="0.0" LEVELS="0" ALIAS="EGO" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </EGO>
                        <PRE XMLID="PRE" ID="1735766445965" BASECOST="0.0" LEVELS="0" ALIAS="PRE" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PRE>
                        <COM XMLID="COM" ID="1735766445460" BASECOST="0.0" LEVELS="0" ALIAS="COM" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </COM>
                        <PD XMLID="PD" ID="1735766445097" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PD>
                        <ED XMLID="ED" ID="1735766445982" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </ED>
                        <SPD XMLID="SPD" ID="1735766445446" BASECOST="0.0" LEVELS="0" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SPD>
                        <REC XMLID="REC" ID="1735766445544" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </REC>
                        <END XMLID="END" ID="1735766445535" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </END>
                        <STUN XMLID="STUN" ID="1735766445567" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STUN>
                        <RUNNING XMLID="RUNNING" ID="1735766445501" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </RUNNING>
                        <SWIMMING XMLID="SWIMMING" ID="1735766445708" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SWIMMING>
                        <LEAPING XMLID="LEAPING" ID="1735766445584" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </LEAPING>
                    </CHARACTERISTICS>
                    <SKILLS />
                    <PERKS />
                    <TALENTS />
                    <MARTIALARTS />
                    <POWERS>
                        <POWER XMLID="ENERGYBLAST" ID="1735766587654" BASECOST="0.0" LEVELS="3" ALIAS="Energy Blast" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Little" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="CHARGES" ID="1735767372525" BASECOST="-0.25" LEVELS="0" ALIAS="Charges" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="TWELVE" OPTIONID="TWELVE" OPTION_ALIAS="12" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                                <ADDER XMLID="BOOSTABLE" ID="1735767372461" BASECOST="0.25" LEVELS="0" ALIAS="Boostable" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="ENERGYBLAST" ID="1735767170919" BASECOST="0.0" LEVELS="4" ALIAS="Energy Blast" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="CHARGES" ID="1735767170913" BASECOST="-0.25" LEVELS="0" ALIAS="Charges" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="TWELVE" OPTIONID="TWELVE" OPTION_ALIAS="12" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                                <ADDER XMLID="BOOSTABLE" ID="1735767170849" BASECOST="0.25" LEVELS="0" ALIAS="Boostable" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="EGOATTACK" ID="1735766550110" BASECOST="0.0" LEVELS="1" ALIAS="Ego Attack" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Little" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <ADDER XMLID="PLUSONEHALFDIE" ID="1735767380221" BASECOST="5.0" LEVELS="0" ALIAS="+1/2 d6" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                                <NOTES />
                            </ADDER>
                            <MODIFIER XMLID="CHARGES" ID="1735767380286" BASECOST="-0.25" LEVELS="0" ALIAS="Charges" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="TWELVE" OPTIONID="TWELVE" OPTION_ALIAS="12" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                                <ADDER XMLID="BOOSTABLE" ID="1735767380222" BASECOST="0.25" LEVELS="0" ALIAS="Boostable" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="EGOATTACK" ID="1735767176022" BASECOST="0.0" LEVELS="2" ALIAS="Ego Attack" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="CHARGES" ID="1735767175956" BASECOST="-0.25" LEVELS="0" ALIAS="Charges" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="TWELVE" OPTIONID="TWELVE" OPTION_ALIAS="12" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                                <ADDER XMLID="BOOSTABLE" ID="1735767175892" BASECOST="0.25" LEVELS="0" ALIAS="Boostable" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="TRANSFORM" ID="1735766646334" BASECOST="0.0" LEVELS="1" ALIAS="Transform" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="MAJOR" OPTIONID="MAJOR" OPTION_ALIAS="Major" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Little" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <ADDER XMLID="HEALEDBY" ID="1735767387694" BASECOST="0.0" LEVELS="0" ALIAS="Healed back by" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="METHOD" OPTIONID="METHOD" OPTION_ALIAS="" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                                <NOTES />
                            </ADDER>
                            <MODIFIER XMLID="CHARGES" ID="1735767387759" BASECOST="-0.25" LEVELS="0" ALIAS="Charges" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="TWELVE" OPTIONID="TWELVE" OPTION_ALIAS="12" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                                <ADDER XMLID="BOOSTABLE" ID="1735767387695" BASECOST="0.25" LEVELS="0" ALIAS="Boostable" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="TRANSFORM" ID="1735767180647" BASECOST="0.0" LEVELS="2" ALIAS="Transform" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="MAJOR" OPTIONID="MAJOR" OPTION_ALIAS="Major" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <ADDER XMLID="HEALEDBY" ID="1735767397201" BASECOST="0.0" LEVELS="0" ALIAS="Healed back by" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="METHOD" OPTIONID="METHOD" OPTION_ALIAS="" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                                <NOTES />
                            </ADDER>
                            <ADDER XMLID="PLUSONEHALFDIE" ID="1735767401273" BASECOST="10.0" LEVELS="0" ALIAS="+1/2 d6" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                                <NOTES />
                            </ADDER>
                            <MODIFIER XMLID="CHARGES" ID="1735767397266" BASECOST="-0.25" LEVELS="0" ALIAS="Charges" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="TWELVE" OPTIONID="TWELVE" OPTION_ALIAS="12" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                                <ADDER XMLID="BOOSTABLE" ID="1735767397202" BASECOST="0.25" LEVELS="0" ALIAS="Boostable" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </MODIFIER>
                        </POWER>
                    </POWERS>
                    <DISADVANTAGES />
                    <EQUIPMENT />
                    <RULES name="Default" path="foo.hdr" BASEPOINTS="200" DISADPOINTS="150" APPEREND="10" STRAPPEREND="10" NCMSELECTED="No" NCMUSERCHANGEABLE="Yes" ATTACKAPMAXVALUE="90" ATTACKAPMAXRESPONSE="0" DEFENSEAPMAXVALUE="90" DEFENSEAPMAXRESPONSE="0" DISADCATEGORYMAXVALUE="75" DISADCATEGORYMAXRESPONSE="0" AVAILDISADPOINTSRESPONSE="0" AVAILTOTALPOINTSRESPONSE="0" CHARACTERISTICMAXVALUE="1000" CHARACTERISTICMAXRESPONSE="0" MANEUVERMAXVALUE="1000" MANEUVERMAXRESPONSE="0" SKILLMAXVALUE="1000" SKILLMAXRESPONSE="0" PERKMAXVALUE="1000" PERKMAXRESPONSE="0" TALENTMAXVALUE="1000" TALENTMAXRESPONSE="0" POWERMAXVALUE="1000" POWERMAXRESPONSE="0" EQUIPMENTCOSTVALUE="1000" EQUIPMENTCOSTRESPONSE="0" EQUIPMENTCOSTUNITS="$" EQUIPMENTCOSTCONVERSION="1.0" EQUIPMENTCOSTDECIMALPLACES="0" EQUIPMENTUNITSPREFIX="Yes" STANDARDEFFECTALLOWED="Yes" USEEXPANDEDGROWTHCHART="No" DEFAULTSTANDARDEFFECT="No" MULTIPLIERALLOWED="No" LANGUAGESIMILARITIESUSED="No" LITERACYFREE="No" NATIVELITERACYFREE="Yes" EQUIPMENTALLOWED="Yes" PENALIZENOLEVEL1="No" ONLYSELLONEFIGURED="Yes" USEINCREASEDDAMAGEDIFFERENTIATION="No" AUTOMATICALLYAPPLYNOFIGURED="Yes" LINKACROSSFRAMEWORK="2" SPECIALTYPEINFRAMEWORK="1" NONENDUSINGABILITYINEC="1" USESKILLMAXIMA="No" USESKILLMULTIPLIERS="No" LANGUAGESASINTSKILL="No" SKILLMAXIMALIMIT="13" SKILLROLLBASE="9" SKILLROLLDENOMINATOR="5.0" CHARROLLBASE="9" CHARROLLDENOMINATOR="5.0" USENOTES1="No" USENOTES2="No" USENOTES3="No" USENOTES4="No" USENOTES5="No" NOTES1LABEL="Notes 1" NOTES2LABEL="Notes 2" NOTES3LABEL="Notes 3" NOTES4LABEL="Notes 4" NOTES5LABEL="Notes 5" />
                    </CHARACTER>
                `;

                let actor;
                let previousSetting;
                let threeDcEnergyBlast;
                let fourDcEnergyBlast;
                let threeDcEgoAttack;
                let fourDcEgoAttack;
                let threeDcTransform;
                let eightDcTransform;

                beforeEach(async () => {
                    previousSetting = await game.settings.get(HEROSYS.module, "DoubleDamageLimit");
                    await game.settings.set(HEROSYS.module, "DoubleDamageLimit", true);

                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);

                    threeDcEnergyBlast = actor.items.find(
                        (item) => item.system.XMLID === "ENERGYBLAST" && item.name === "Little",
                    );
                    fourDcEnergyBlast = actor.items.find(
                        (item) => item.system.XMLID === "ENERGYBLAST" && item.name !== "Little",
                    );
                    threeDcEgoAttack = actor.items.find(
                        (item) => item.system.XMLID === "EGOATTACK" && item.name === "Little",
                    );
                    fourDcEgoAttack = actor.items.find(
                        (item) => item.system.XMLID === "EGOATTACK" && item.name !== "Little",
                    );
                    threeDcTransform = actor.items.find(
                        (item) => item.system.XMLID === "TRANSFORM" && item.name === "Little",
                    );
                    eightDcTransform = actor.items.find(
                        (item) => item.system.XMLID === "TRANSFORM" && item.name !== "Little",
                    );
                });

                afterEach(async function () {
                    await game.settings.set(HEROSYS.module, "DoubleDamageLimit", previousSetting);
                });

                // Verify the cost of powers
                it("should match the overall cost of HD", function () {
                    assert.equal(actor.system.points, 125);
                });

                it("should match the cost breakdown of HD", function () {
                    assert.deepEqual(actor.system.pointsDetail, {
                        characteristics: 0,
                        power: 125,
                    });
                });

                describe("Energy Blast", function () {
                    it("should have the correct cost for the little EB", function () {
                        assert.equal(threeDcEnergyBlast.system.activePoints, 15);
                    });

                    it("should have the correct END cost for the little EB", function () {
                        assert.equal(threeDcEnergyBlast.system.end, 0);
                    });

                    it("should have the correct damage for the little EB", function () {
                        assert.equal(getEffectFormulaFromItem(threeDcEnergyBlast, { boostableCharges: 0 }), "3d6");
                    });

                    it("should have the correct damage for a minimally boosted little EB", function () {
                        assert.equal(getEffectFormulaFromItem(threeDcEnergyBlast, { boostableCharges: 1 }), "4d6");
                    });

                    it("should have the correct damage for a fully boosted little EB", function () {
                        assert.equal(getEffectFormulaFromItem(threeDcEnergyBlast, { boostableCharges: 4 }), "6d6");
                    });

                    it("should have the correct cost for the big EB", function () {
                        assert.equal(fourDcEnergyBlast.system.activePoints, 20);
                    });

                    it("should have the correct END cost for the big EB", function () {
                        assert.equal(fourDcEnergyBlast.system.end, 0);
                    });

                    it("should have the correct damage for the big EB", function () {
                        assert.equal(getEffectFormulaFromItem(fourDcEnergyBlast, { boostableCharges: 0 }), "4d6");
                    });

                    it("should have the correct damage for a minimally boosted little EB", function () {
                        assert.equal(getEffectFormulaFromItem(fourDcEnergyBlast, { boostableCharges: 1 }), "5d6");
                    });

                    it("should have the correct damage for a fully boosted big EB", function () {
                        assert.equal(getEffectFormulaFromItem(fourDcEnergyBlast, { boostableCharges: 4 }), "8d6");
                    });

                    it("should have the correct damage for an over boosted big EB", function () {
                        assert.equal(getEffectFormulaFromItem(fourDcEnergyBlast, { boostableCharges: 5 }), "8d6");
                    });
                });

                describe("Ego Attack", function () {
                    it("should have the correct cost for the little Ego Attack", function () {
                        assert.equal(threeDcEgoAttack.system.activePoints, 15);
                    });

                    it("should have the correct END cost for the little Ego Attack", function () {
                        assert.equal(threeDcEgoAttack.system.end, 0);
                    });

                    it("should have the correct damage for the little Ego Attack", function () {
                        assert.equal(getEffectFormulaFromItem(threeDcEgoAttack, { boostableCharges: 0 }), "1½d6");
                    });

                    it("should have the correct damage for a minimally boosted little Ego Attack", function () {
                        assert.equal(getEffectFormulaFromItem(threeDcEgoAttack, { boostableCharges: 1 }), "2d6");
                    });

                    it("should have the correct damage for a fully boosted little Ego Attack", function () {
                        assert.equal(getEffectFormulaFromItem(threeDcEgoAttack, { boostableCharges: 4 }), "3d6");
                    });

                    it("should have the correct cost for the big Ego Attack", function () {
                        assert.equal(fourDcEgoAttack.system.activePoints, 20);
                    });

                    it("should have the correct END cost for the big Ego Attack", function () {
                        assert.equal(fourDcEgoAttack.system.end, 0);
                    });

                    it("should have the correct damage for the big Ego Attack", function () {
                        assert.equal(getEffectFormulaFromItem(fourDcEgoAttack, { boostableCharges: 0 }), "2d6");
                    });

                    it("should have the correct damage for a minimally boosted little Ego Attack", function () {
                        assert.equal(getEffectFormulaFromItem(fourDcEgoAttack, { boostableCharges: 1 }), "2½d6");
                    });

                    it("should have the correct damage for a fully boosted big Ego Attack", function () {
                        assert.equal(getEffectFormulaFromItem(fourDcEgoAttack, { boostableCharges: 4 }), "4d6");
                    });

                    it("should have the correct damage for an over boosted big Ego Attack", function () {
                        assert.equal(getEffectFormulaFromItem(fourDcEgoAttack, { boostableCharges: 5 }), "4d6");
                    });
                });

                describe("Major Transform", function () {
                    it("should have the correct cost for the little Transform", function () {
                        assert.equal(threeDcTransform.system.activePoints, 15);
                    });

                    it("should have the correct END cost for the little Transform", function () {
                        assert.equal(threeDcTransform.system.end, 0);
                    });

                    it("should have the correct damage for the little Transform", function () {
                        assert.equal(getEffectFormulaFromItem(threeDcTransform, { boostableCharges: 0 }), "1d6");
                    });

                    it("should have the correct damage for a minimally boosted little Transform", function () {
                        assert.equal(getEffectFormulaFromItem(threeDcTransform, { boostableCharges: 1 }), "1d6+1");
                    });

                    it("should have the correct damage for a fully boosted little Transform", function () {
                        assert.equal(getEffectFormulaFromItem(threeDcTransform, { boostableCharges: 4 }), "2d6");
                    });

                    it("should have the correct cost for the big Transform", function () {
                        assert.equal(eightDcTransform.system.activePoints, 40);
                    });

                    it("should have the correct END cost for the big Transform", function () {
                        assert.equal(eightDcTransform.system.end, 0);
                    });

                    it("should have the correct damage for the big Transform", function () {
                        assert.equal(getEffectFormulaFromItem(eightDcTransform, { boostableCharges: 0 }), "2½d6");
                    });

                    it("should have the correct damage for a minimally boosted big Transform", function () {
                        assert.equal(getEffectFormulaFromItem(eightDcTransform, { boostableCharges: 1 }), "3d6");
                    });

                    it("should have the correct damage for a fully boosted big Transform", function () {
                        assert.equal(getEffectFormulaFromItem(eightDcTransform, { boostableCharges: 4 }), "4d6");
                    });

                    it("should have the correct damage for an over boosted big Transform", function () {
                        assert.equal(getEffectFormulaFromItem(eightDcTransform, { boostableCharges: 5 }), "4d6");
                    });
                });
            });

            describe("5e - Real Weapons", function () {
                const contents = `
                        <?xml version="1.0" encoding="UTF-16"?>
                        <CHARACTER version="6.0" TEMPLATE="builtIn.Heroic.hdt">
                        <BASIC_CONFIGURATION BASE_POINTS="200" DISAD_POINTS="150" EXPERIENCE="0" />
                        <CHARACTER_INFO CHARACTER_NAME="Test Real Weapons" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.46224760379584" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                            <BACKGROUND />
                            <PERSONALITY />
                            <QUOTE />
                            <TACTICS />
                            <CAMPAIGN_USE />
                            <APPEARANCE />
                            <NOTES1 />
                            <NOTES2 />
                            <NOTES3 />
                            <NOTES4 />
                            <NOTES5 />
                        </CHARACTER_INFO>
                        <CHARACTERISTICS>
                            <STR XMLID="STR" ID="1735935457317" BASECOST="0.0" LEVELS="0" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </STR>
                            <DEX XMLID="DEX" ID="1735935456632" BASECOST="0.0" LEVELS="0" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </DEX>
                            <CON XMLID="CON" ID="1735935457364" BASECOST="0.0" LEVELS="0" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </CON>
                            <BODY XMLID="BODY" ID="1735935457346" BASECOST="0.0" LEVELS="0" ALIAS="BODY" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </BODY>
                            <INT XMLID="INT" ID="1735935456982" BASECOST="0.0" LEVELS="0" ALIAS="INT" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </INT>
                            <EGO XMLID="EGO" ID="1735935456855" BASECOST="0.0" LEVELS="0" ALIAS="EGO" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </EGO>
                            <PRE XMLID="PRE" ID="1735935457138" BASECOST="0.0" LEVELS="0" ALIAS="PRE" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </PRE>
                            <COM XMLID="COM" ID="1735935457067" BASECOST="0.0" LEVELS="0" ALIAS="COM" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </COM>
                            <PD XMLID="PD" ID="1735935456773" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </PD>
                            <ED XMLID="ED" ID="1735935457089" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </ED>
                            <SPD XMLID="SPD" ID="1735935457589" BASECOST="0.0" LEVELS="0" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </SPD>
                            <REC XMLID="REC" ID="1735935457342" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </REC>
                            <END XMLID="END" ID="1735935457206" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </END>
                            <STUN XMLID="STUN" ID="1735935456609" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </STUN>
                            <RUNNING XMLID="RUNNING" ID="1735935457044" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </RUNNING>
                            <SWIMMING XMLID="SWIMMING" ID="1735935457384" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </SWIMMING>
                            <LEAPING XMLID="LEAPING" ID="1735935457540" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            </LEAPING>
                        </CHARACTERISTICS>
                        <SKILLS />
                        <PERKS />
                        <TALENTS />
                        <MARTIALARTS>
                            <MANEUVER XMLID="MANEUVER" ID="1735943103238" BASECOST="3.0" LEVELS="0" ALIAS="Basic Strike" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Basic Strike" OCV="+1" DCV="+0" DC="2" PHASE="1/2" EFFECT="[NORMALDC] Strike" ADDSTR="Yes" ACTIVECOST="15" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="Yes" WEAPONEFFECT="Weapon [WEAPONDC] Strike">
                            <NOTES />
                            </MANEUVER>
                            <MANEUVER XMLID="MANEUVER" ID="1735946408484" BASECOST="4.0" LEVELS="0" ALIAS="Martial Strike" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CATEGORY="Hand To Hand" DISPLAY="Martial Strike" OCV="+0" DCV="+2" DC="2" PHASE="1/2" EFFECT="[NORMALDC] Strike" ADDSTR="Yes" ACTIVECOST="20" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="Yes" WEAPONEFFECT="Weapon [WEAPONDC] Strike">
                            <NOTES />
                            </MANEUVER>
                            <MANEUVER XMLID="MANEUVER" ID="1736042211258" BASECOST="3.0" LEVELS="0" ALIAS="Custom 4DC attack" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CUSTOM="Yes" CATEGORY="Ranged" DISPLAY="Custom Maneuver" OCV="+0" DCV="+0" DC="4" PHASE="1/2" EFFECT="Strike" ADDSTR="Yes" ACTIVECOST="0" DAMAGETYPE="0" MAXSTR="0" STRMULT="1" USEWEAPON="Yes" WEAPONEFFECT="Strike" RANGE="0">
                            <NOTES />
                            </MANEUVER>
                            <WEAPON_ELEMENT XMLID="WEAPON_ELEMENT" ID="1736042852826" BASECOST="0.0" LEVELS="0" ALIAS="Weapon Element" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="">
                            <NOTES />
                            <ADDER XMLID="COMMONMISSILE" ID="1736043697740" BASECOST="0.0" LEVELS="0" ALIAS="Common Missile Weapons" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="NO">
                                <NOTES />
                                <ADDER XMLID="BOWS" ID="1736043697739" BASECOST="1.0" LEVELS="0" ALIAS="Bows" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </ADDER>
                            </WEAPON_ELEMENT>
                        </MARTIALARTS>
                        <POWERS>
                            <POWER XMLID="RKA" ID="1735936415724" BASECOST="0.0" LEVELS="0" ALIAS="Killing Attack - Ranged" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Point Bow 1" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                                <NOTES />
                                <ADDER XMLID="PLUSONEPIP" ID="1736045943020" BASECOST="5.0" LEVELS="0" ALIAS="+1 pip" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                                    <NOTES />
                                </ADDER>
                                <MODIFIER XMLID="FOCUS" ID="1736045943047" BASECOST="-1.0" LEVELS="0" ALIAS="Focus" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="OAF" OPTIONID="OAF" OPTION_ALIAS="OAF" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                    <NOTES />
                                </MODIFIER>
                                <MODIFIER XMLID="REALWEAPON" ID="1736045943049" BASECOST="-0.25" LEVELS="0" ALIAS="Real Weapon" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                    <NOTES />
                                </MODIFIER>
                                <MODIFIER XMLID="STRMINIMUM" ID="1736045943057" BASECOST="-0.25" LEVELS="0" ALIAS="STR Minimum (low fidelity)" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="1-5" OPTIONID="1-5" OPTION_ALIAS="1-5" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                    <NOTES />
                                </MODIFIER>
                            </POWER>
                            <POWER XMLID="HKA" ID="1736044888537" BASECOST="0.0" LEVELS="1" ALIAS="Killing Attack - Hand-To-Hand" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                                <NOTES />
                                <MODIFIER XMLID="FOCUS" ID="1736045985448" BASECOST="-1.0" LEVELS="0" ALIAS="Focus" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="OAF" OPTIONID="OAF" OPTION_ALIAS="OAF" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                    <NOTES />
                                </MODIFIER>
                                <MODIFIER XMLID="REALWEAPON" ID="1736045995578" BASECOST="-0.25" LEVELS="0" ALIAS="Real Weapon" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                    <NOTES />
                                </MODIFIER>
                                <MODIFIER XMLID="STRMINIMUM" ID="1736046001066" BASECOST="-0.5" LEVELS="0" ALIAS="STR Minimum" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="6-14" OPTIONID="6-14" OPTION_ALIAS="12" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                    <NOTES />
                                </MODIFIER>
                            </POWER>
                        </POWERS>
                        <DISADVANTAGES />
                        <EQUIPMENT>
                            
                        </EQUIPMENT>
                        <RULES name="Default" path="foo.hdr" BASEPOINTS="200" DISADPOINTS="150" APPEREND="10" STRAPPEREND="10" NCMSELECTED="No" NCMUSERCHANGEABLE="Yes" ATTACKAPMAXVALUE="90" ATTACKAPMAXRESPONSE="0" DEFENSEAPMAXVALUE="90" DEFENSEAPMAXRESPONSE="0" DISADCATEGORYMAXVALUE="75" DISADCATEGORYMAXRESPONSE="0" AVAILDISADPOINTSRESPONSE="0" AVAILTOTALPOINTSRESPONSE="0" CHARACTERISTICMAXVALUE="1000" CHARACTERISTICMAXRESPONSE="0" MANEUVERMAXVALUE="1000" MANEUVERMAXRESPONSE="0" SKILLMAXVALUE="1000" SKILLMAXRESPONSE="0" PERKMAXVALUE="1000" PERKMAXRESPONSE="0" TALENTMAXVALUE="1000" TALENTMAXRESPONSE="0" POWERMAXVALUE="1000" POWERMAXRESPONSE="0" EQUIPMENTCOSTVALUE="1000" EQUIPMENTCOSTRESPONSE="0" EQUIPMENTCOSTUNITS="$" EQUIPMENTCOSTCONVERSION="1.0" EQUIPMENTCOSTDECIMALPLACES="0" EQUIPMENTUNITSPREFIX="Yes" STANDARDEFFECTALLOWED="Yes" USEEXPANDEDGROWTHCHART="No" DEFAULTSTANDARDEFFECT="No" MULTIPLIERALLOWED="No" LANGUAGESIMILARITIESUSED="No" LITERACYFREE="No" NATIVELITERACYFREE="Yes" EQUIPMENTALLOWED="Yes" PENALIZENOLEVEL1="No" ONLYSELLONEFIGURED="Yes" USEINCREASEDDAMAGEDIFFERENTIATION="No" AUTOMATICALLYAPPLYNOFIGURED="Yes" LINKACROSSFRAMEWORK="2" SPECIALTYPEINFRAMEWORK="1" NONENDUSINGABILITYINEC="1" USESKILLMAXIMA="No" USESKILLMULTIPLIERS="No" LANGUAGESASINTSKILL="No" SKILLMAXIMALIMIT="13" SKILLROLLBASE="9" SKILLROLLDENOMINATOR="5.0" CHARROLLBASE="9" CHARROLLDENOMINATOR="5.0" USENOTES1="No" USENOTES2="No" USENOTES3="No" USENOTES4="No" USENOTES5="No" NOTES1LABEL="Notes 1" NOTES2LABEL="Notes 2" NOTES3LABEL="Notes 3" NOTES4LABEL="Notes 4" NOTES5LABEL="Notes 5" />
                        </CHARACTER>
                `;
                let actor;

                let previousSetting;

                let rkaItem;
                let hkaItem;

                let moveByManeuverItem;
                let martialStrikeManeuverItem;
                let customMartialFourDcManeuverItem;

                beforeEach(async () => {
                    previousSetting = await game.settings.get(HEROSYS.module, "DoubleDamageLimit");
                    await game.settings.set(HEROSYS.module, "DoubleDamageLimit", true);

                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);

                    rkaItem = actor.items.find((item) => item.system.XMLID === "RKA");
                    hkaItem = actor.items.find((item) => item.system.XMLID === "HKA");

                    moveByManeuverItem = actor.items.find((item) => item.system.XMLID === "MOVEBY");

                    martialStrikeManeuverItem = actor.items.find(
                        (item) => item.system.XMLID === "MANEUVER" && item.name === "Martial Strike",
                    );

                    customMartialFourDcManeuverItem = actor.items.find(
                        (item) => item.system.XMLID === "MANEUVER" && item.name === "Custom 4DC attack",
                    );
                });

                afterEach(async function () {
                    await game.settings.set(HEROSYS.module, "DoubleDamageLimit", previousSetting);
                });

                describe("straight forward martial maneuvers with weapons", function () {
                    it("should recognize RKA associated with martial arts", function () {
                        // Base: RKA +1k (1 DC) => 1DC
                        // Added: Martial Strike (+2 DC halved because it's a killing attack = +1 DC) => +1 DC
                        // Base + Added 1DC + 1DC (Double rule does not apply) => 2DC at 15AP/die = 1/2d6
                        assert.equal(
                            getFullyQualifiedEffectFormulaFromItem(martialStrikeManeuverItem, {
                                maWeaponItem: rkaItem,
                            }),
                            "½d6K",
                        );
                    });

                    it("should recognize HKA associated with martial arts", function () {
                        // Base: HKA 1d6k (3 DC) => 3DC
                        // Added: STR 10 = +2 DC, Martial Strike (+2 DC halved because it's a killing attack = +1 DC) => +3 DC
                        // Base + Added 3DC + 3DC (Double rule does not apply) => 6 DC at 15AP/die = 2d6
                        assert.equal(
                            getFullyQualifiedEffectFormulaFromItem(martialStrikeManeuverItem, {
                                maWeaponItem: hkaItem,
                            }),
                            "2d6K",
                        );
                    });
                });

                describe("double damage limit with martial maneuvers", function () {
                    it("should recognize double damage limit for martial maneuver with an RKA", function () {
                        // Base: RKA +1k (1 DC) => 1DC
                        // Added: Martial Strike (+4 DC halved because it's a killing attack = +2 DC) => +2 DC
                        // Base + Added 1DC + 1DC (Double rule applies) => 2DC at 15AP/die = 1/2d6
                        assert.equal(
                            getFullyQualifiedEffectFormulaFromItem(customMartialFourDcManeuverItem, {
                                maWeaponItem: rkaItem,
                            }),
                            "½d6K",
                        );
                    });

                    it("should recognize double damage limit for martial maneuver with an HKA", function () {
                        // Base: HKA +1d6k (3 DC) => 3DC
                        // Added: STR 10 = +2 DC, Martial Strike (+4 DC halved because it's a killing attack = +2 DC) => +4 DC
                        // Base + Added 3DC + 4DC (Double rule applies) => 6DC at 15AP/die = 2d6
                        assert.equal(
                            getFullyQualifiedEffectFormulaFromItem(customMartialFourDcManeuverItem, {
                                maWeaponItem: hkaItem,
                            }),
                            "2d6K",
                        );
                    });

                    it("should recognize velocity isn't in the double damage limit for move by maneuver with an HKA", function () {
                        // Base: HKA 1d6k (3 DC) => 3DC
                        // Added: STR 10 = +2 DC, Move Through (+0 DC halved because it's a killing attack = +0 DC), velocity 30"/5 = 6DC => +8 DC
                        // Base + Added 3DC + 8DC (Double rule partially applies) => 11 DC at 15AP/die = 31/2d6
                        assert.equal(
                            getFullyQualifiedEffectFormulaFromItem(moveByManeuverItem, {
                                velocity: 30,
                                maWeaponItem: hkaItem,
                            }),
                            "3½d6K",
                        );
                    });
                });
            });

            describe("5e - recognizing DC altering advantages", function () {
                const contents = `
                    <?xml version="1.0" encoding="UTF-16"?>
                    <CHARACTER version="6.0" TEMPLATE="builtIn.Superheroic.hdt">
                    <BASIC_CONFIGURATION BASE_POINTS="200" DISAD_POINTS="150" EXPERIENCE="0" />
                    <CHARACTER_INFO CHARACTER_NAME="Test for DC advantages" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.4622476037958" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                        <BACKGROUND />
                        <PERSONALITY />
                        <QUOTE />
                        <TACTICS />
                        <CAMPAIGN_USE />
                        <APPEARANCE />
                        <NOTES1 />
                        <NOTES2 />
                        <NOTES3 />
                        <NOTES4 />
                        <NOTES5 />
                    </CHARACTER_INFO>
                    <CHARACTERISTICS>
                        <STR XMLID="STR" ID="1735535944886" BASECOST="0.0" LEVELS="0" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STR>
                        <DEX XMLID="DEX" ID="1735535945057" BASECOST="0.0" LEVELS="0" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DEX>
                        <CON XMLID="CON" ID="1735535945104" BASECOST="0.0" LEVELS="0" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </CON>
                        <BODY XMLID="BODY" ID="1735535945011" BASECOST="0.0" LEVELS="0" ALIAS="BODY" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </BODY>
                        <INT XMLID="INT" ID="1735535944953" BASECOST="0.0" LEVELS="0" ALIAS="INT" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </INT>
                        <EGO XMLID="EGO" ID="1735535945256" BASECOST="0.0" LEVELS="0" ALIAS="EGO" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </EGO>
                        <PRE XMLID="PRE" ID="1735535945129" BASECOST="0.0" LEVELS="0" ALIAS="PRE" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PRE>
                        <COM XMLID="COM" ID="1735535944957" BASECOST="0.0" LEVELS="0" ALIAS="COM" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </COM>
                        <PD XMLID="PD" ID="1735535944982" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PD>
                        <ED XMLID="ED" ID="1735535945837" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </ED>
                        <SPD XMLID="SPD" ID="1735535945027" BASECOST="0.0" LEVELS="0" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SPD>
                        <REC XMLID="REC" ID="1735535945553" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </REC>
                        <END XMLID="END" ID="1735535945553" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </END>
                        <STUN XMLID="STUN" ID="1735535945815" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STUN>
                        <RUNNING XMLID="RUNNING" ID="1735535945622" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </RUNNING>
                        <SWIMMING XMLID="SWIMMING" ID="1735535945527" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SWIMMING>
                        <LEAPING XMLID="LEAPING" ID="1735535945257" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </LEAPING>
                    </CHARACTERISTICS>
                    <SKILLS />
                    <PERKS />
                    <TALENTS />
                    <MARTIALARTS />
                    <POWERS>
                        <POWER XMLID="ENERGYBLAST" ID="1735535975123" BASECOST="0.0" LEVELS="4" ALIAS="Energy Blast" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="AOE" ID="1735602821836" BASECOST="0.5" LEVELS="0" ALIAS="Area Of Effect" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="HEX" OPTIONID="HEX" OPTION_ALIAS="One Hex" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="ARMORPIERCING" ID="1735602821840" BASECOST="0.0" LEVELS="1" ALIAS="Armor Piercing" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="AVLD" ID="1735602821841" BASECOST="0.75" LEVELS="0" ALIAS="Attack Versus Limited Defense" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="AUTOFIRE" ID="1735602821849" BASECOST="0.25" LEVELS="0" ALIAS="Autofire" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="TWO" OPTIONID="TWO" OPTION_ALIAS="2 Shots" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                                <ADDER XMLID="ODDPOWER" ID="1735602855475" BASECOST="1.0" LEVELS="0" ALIAS="Non-Standard Attack Power" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </MODIFIER>
                            <MODIFIER XMLID="BOECV" ID="1735602821860" BASECOST="1.0" LEVELS="0" ALIAS="Based On EGO Combat Value" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="MENTAL" OPTIONID="MENTAL" OPTION_ALIAS="Mental Defense applies" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                                <ADDER XMLID="RANGEMODSAPPLY" ID="1735602821851" BASECOST="-0.25" LEVELS="0" ALIAS="Range Modifiers Apply" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                                <ADDER XMLID="ATTACKERCHOOSESDEFENSE" ID="1735602821852" BASECOST="0.5" LEVELS="0" ALIAS="Attacker Chooses Defense" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </MODIFIER>
                            <MODIFIER XMLID="CONTINUOUS" ID="1735602821862" BASECOST="1.0" LEVELS="0" ALIAS="Continuous" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="DOESBODY" ID="1735602821863" BASECOST="1.0" LEVELS="0" ALIAS="Does BODY" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="PENETRATING" ID="1735602821864" BASECOST="0.0" LEVELS="1" ALIAS="Penetrating" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="DOUBLEKB" ID="1735602821869" BASECOST="0.5" LEVELS="0" ALIAS="Does x1 1/2 Knockback" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="ONEANDAHALFTIMES" OPTIONID="ONEANDAHALFTIMES" OPTION_ALIAS="1.5x KB" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="TRIGGER" ID="1735602821911" BASECOST="0.25" LEVELS="0" ALIAS="Trigger" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="SET" OPTIONID="SET" OPTION_ALIAS="Set Trigger" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                                <ADDER XMLID="ACTIVATION" ID="1735602821875" BASECOST="0.0" LEVELS="0" ALIAS="Activation Modifiers" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="ZEROPHASE" OPTIONID="ZEROPHASE" OPTION_ALIAS="Activating the Trigger requires a Zero Phase Action" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                                <ADDER XMLID="RESET" ID="1735602821883" BASECOST="-0.5" LEVELS="0" ALIAS="Reset Parameters" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="TURN" OPTIONID="TURN" OPTION_ALIAS="Trigger requires a Turn or more to reset" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="Yes" INCLUDEINBASE="Yes" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                                <ADDER XMLID="EXPIRE" ID="1735602821884" BASECOST="-0.25" LEVELS="0" ALIAS="Trigger can expire (it has a time limit)" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                                <ADDER XMLID="NOCONTROL" ID="1735602821885" BASECOST="-0.25" LEVELS="0" ALIAS="Character does not control activation of personal Trigger" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                                <ADDER XMLID="MISFIRE" ID="1735602821886" BASECOST="-0.25" LEVELS="0" ALIAS="Misfire" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                                <ADDER XMLID="TWOCONDITIONS" ID="1735602821887" BASECOST="0.25" LEVELS="0" ALIAS="Two activation conditions apply simultaneously" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </MODIFIER>
                            <MODIFIER XMLID="UNCONTROLLED" ID="1735602821913" BASECOST="0.5" LEVELS="0" ALIAS="Uncontrolled" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="VARIABLEADVANTAGE" ID="1735602821916" BASECOST="2.0" LEVELS="0" ALIAS="Variable Advantage" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                                <ADDER XMLID="LIMITEDGROUP" ID="1735602821914" BASECOST="-0.25" LEVELS="0" ALIAS="Limited Group of Advantages" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </MODIFIER>
                            <MODIFIER XMLID="VARIABLESFX" ID="1735602821921" BASECOST="0.5" LEVELS="0" ALIAS="Variable Special Effects" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="ANY" OPTIONID="ANY" OPTION_ALIAS="Any SFX" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="ENTANGLE" ID="1735536194443" BASECOST="0.0" LEVELS="1" ALIAS="Entangle" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="STICKY" ID="1735536581282" BASECOST="0.5" LEVELS="0" ALIAS="Sticky" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="STANDARD" OPTIONID="STANDARD" OPTION_ALIAS="Standard" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="EXPLOSION" ID="1735536581291" BASECOST="0.5" LEVELS="1" ALIAS="Explosion" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="NORMAL" OPTIONID="NORMAL" OPTION_ALIAS="Normal (Radius)" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="DOESKB" ID="1735536581293" BASECOST="0.25" LEVELS="0" ALIAS="Does Knockback" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="CONTINUOUS" ID="1735536585958" BASECOST="1.0" LEVELS="0" ALIAS="Continuous" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="DAMAGESHIELD" ID="1735536599061" BASECOST="0.5" LEVELS="0" ALIAS="Damage Shield" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="FLIGHT" ID="1735536321364" BASECOST="0.0" LEVELS="1" ALIAS="Flight" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" QUANTITY="1" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="UOO" ID="1735536634554" BASECOST="1.0" LEVELS="0" ALIAS="Usable As Attack" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="UAA" OPTIONID="UAA" OPTION_ALIAS="Usable As Attack" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            <MODIFIER XMLID="NND" ID="1735536656343" BASECOST="1.0" LEVELS="0" ALIAS="No Normal Defense" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="STANDARD" OPTIONID="STANDARD" OPTION_ALIAS="[Standard]" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                    </POWERS>
                    <DISADVANTAGES />
                    <EQUIPMENT />
                    <RULES name="Default" path="foo.hdr" BASEPOINTS="200" DISADPOINTS="150" APPEREND="10" STRAPPEREND="10" NCMSELECTED="No" NCMUSERCHANGEABLE="Yes" ATTACKAPMAXVALUE="90" ATTACKAPMAXRESPONSE="0" DEFENSEAPMAXVALUE="90" DEFENSEAPMAXRESPONSE="0" DISADCATEGORYMAXVALUE="75" DISADCATEGORYMAXRESPONSE="0" AVAILDISADPOINTSRESPONSE="0" AVAILTOTALPOINTSRESPONSE="0" CHARACTERISTICMAXVALUE="1000" CHARACTERISTICMAXRESPONSE="0" MANEUVERMAXVALUE="1000" MANEUVERMAXRESPONSE="0" SKILLMAXVALUE="1000" SKILLMAXRESPONSE="0" PERKMAXVALUE="1000" PERKMAXRESPONSE="0" TALENTMAXVALUE="1000" TALENTMAXRESPONSE="0" POWERMAXVALUE="1000" POWERMAXRESPONSE="0" EQUIPMENTCOSTVALUE="1000" EQUIPMENTCOSTRESPONSE="0" EQUIPMENTCOSTUNITS="$" EQUIPMENTCOSTCONVERSION="1.0" EQUIPMENTCOSTDECIMALPLACES="0" EQUIPMENTUNITSPREFIX="Yes" STANDARDEFFECTALLOWED="Yes" USEEXPANDEDGROWTHCHART="No" DEFAULTSTANDARDEFFECT="No" MULTIPLIERALLOWED="No" LANGUAGESIMILARITIESUSED="No" LITERACYFREE="No" NATIVELITERACYFREE="Yes" EQUIPMENTALLOWED="Yes" PENALIZENOLEVEL1="No" ONLYSELLONEFIGURED="Yes" USEINCREASEDDAMAGEDIFFERENTIATION="No" AUTOMATICALLYAPPLYNOFIGURED="Yes" LINKACROSSFRAMEWORK="2" SPECIALTYPEINFRAMEWORK="1" NONENDUSINGABILITYINEC="1" USESKILLMAXIMA="No" USESKILLMULTIPLIERS="No" LANGUAGESASINTSKILL="No" SKILLMAXIMALIMIT="13" SKILLROLLBASE="9" SKILLROLLDENOMINATOR="5.0" CHARROLLBASE="9" CHARROLLDENOMINATOR="5.0" USENOTES1="No" USENOTES2="No" USENOTES3="No" USENOTES4="No" USENOTES5="No" NOTES1LABEL="Notes 1" NOTES2LABEL="Notes 2" NOTES3LABEL="Notes 3" NOTES4LABEL="Notes 4" NOTES5LABEL="Notes 5" />
                    </CHARACTER>
                `;

                let actor;
                let energyBlastItem;
                let entangleItem;
                let flightItem;

                before(async () => {
                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);
                    energyBlastItem = actor.items.find((o) => o.system.XMLID === "ENERGYBLAST");
                    entangleItem = actor.items.find((o) => o.system.XMLID === "ENTANGLE");
                    flightItem = actor.items.find((o) => o.system.XMLID === "FLIGHT");
                });

                it("Description", async function () {
                    assert.equal(
                        energyBlastItem.system.description,
                        `Energy Blast 4d6 (ED), Trigger (Activating the Trigger requires a Zero Phase Action, Trigger requires a Turn or more to reset, Trigger can expire (it has a time limit), Character does not control activation of personal Trigger, Misfire, Two activation conditions apply simultaneously; +1/4), Area Of Effect (1" One Hex; +1/2), Armor Piercing (+1/2), Penetrating (+1/2), Does x1 1/2 Knockback (+1/2), Uncontrolled (+1/2), Variable Special Effects (Any SFX; +1/2), Attack Versus Limited Defense (+3/4), Continuous (+1), Does BODY (+1), Autofire (2 shots; +1/4), Non-Standard Attack Power (+1), Based On EGO Combat Value (Mental Defense applies; +1), Range Modifiers Apply (-1/4), Attacker Chooses Defense (+1/2), Variable Advantage (+1 Advantages; Limited Group of Advantages; +1 3/4)`,
                    );
                });

                it("should recognize the cost of the energy blast", async function () {
                    assert.equal(energyBlastItem.system.activePoints, 225);
                });

                it("should recognize all energy blast advantages", async function () {
                    assert.equal(energyBlastItem.system._advantages, 10.25);
                });

                it("should recognize all energy blast advantages as DC affecting", async function () {
                    assert.equal(energyBlastItem.system._advantagesDc, 10.25);
                });

                it("should recognize the cost of the entangle", async function () {
                    assert.equal(entangleItem.system.activePoints, 37);
                });

                it("should recognize all entangle advantages", async function () {
                    assert.equal(entangleItem.system._advantages, 2 + 3 / 4);
                });

                it("should recognize all entangle advantages as DC affecting", async function () {
                    assert.equal(entangleItem.system._advantagesDc, 2 + 3 / 4);
                });

                it("should recognize the cost of the flight", async function () {
                    assert.equal(flightItem.system.activePoints, 6);
                });

                it("should recognize all flight advantages ", async function () {
                    assert.equal(flightItem.system._advantages, 2);
                });

                it("should recognize all flight advantages as DC affecting", async function () {
                    assert.equal(flightItem.system._advantagesDc, 2);
                });
            });

            describe("5e - DC altering advantages", function () {
                const contents = `
                    <?xml version="1.0" encoding="UTF-16"?>
                    <CHARACTER version="6.0" TEMPLATE="builtIn.Superheroic.hdt">
                    <BASIC_CONFIGURATION BASE_POINTS="200" DISAD_POINTS="150" EXPERIENCE="0" />
                    <CHARACTER_INFO CHARACTER_NAME="Test Advantaged Attacks" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.4622476037958" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                        <BACKGROUND />
                        <PERSONALITY />
                        <QUOTE />
                        <TACTICS />
                        <CAMPAIGN_USE />
                        <APPEARANCE />
                        <NOTES1 />
                        <NOTES2 />
                        <NOTES3 />
                        <NOTES4 />
                        <NOTES5 />
                    </CHARACTER_INFO>
                    <CHARACTERISTICS>
                        <STR XMLID="STR" ID="1735787459548" BASECOST="0.0" LEVELS="0" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STR>
                        <DEX XMLID="DEX" ID="1735787458927" BASECOST="0.0" LEVELS="0" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DEX>
                        <CON XMLID="CON" ID="1735787459732" BASECOST="0.0" LEVELS="0" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </CON>
                        <BODY XMLID="BODY" ID="1735787459867" BASECOST="0.0" LEVELS="0" ALIAS="BODY" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </BODY>
                        <INT XMLID="INT" ID="1735787459605" BASECOST="0.0" LEVELS="0" ALIAS="INT" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </INT>
                        <EGO XMLID="EGO" ID="1735787459121" BASECOST="0.0" LEVELS="0" ALIAS="EGO" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </EGO>
                        <PRE XMLID="PRE" ID="1735787459422" BASECOST="0.0" LEVELS="0" ALIAS="PRE" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PRE>
                        <COM XMLID="COM" ID="1735787459574" BASECOST="0.0" LEVELS="0" ALIAS="COM" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </COM>
                        <PD XMLID="PD" ID="1735787459044" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PD>
                        <ED XMLID="ED" ID="1735787459459" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </ED>
                        <SPD XMLID="SPD" ID="1735787458890" BASECOST="0.0" LEVELS="0" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SPD>
                        <REC XMLID="REC" ID="1735787459832" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </REC>
                        <END XMLID="END" ID="1735787459801" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </END>
                        <STUN XMLID="STUN" ID="1735787459628" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STUN>
                        <RUNNING XMLID="RUNNING" ID="1735787459032" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </RUNNING>
                        <SWIMMING XMLID="SWIMMING" ID="1735787459573" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SWIMMING>
                        <LEAPING XMLID="LEAPING" ID="1735787459359" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </LEAPING>
                    </CHARACTERISTICS>
                    <SKILLS>
                        <SKILL XMLID="COMBAT_LEVELS" ID="1735835785525" BASECOST="0.0" LEVELS="2" ALIAS="Combat Skill Levels" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="ALL" OPTIONID="ALL" OPTION_ALIAS="with All Combat" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="GENERAL" FAMILIARITY="No" PROFICIENCY="No">
                        <NOTES />
                        </SKILL>
                    </SKILLS>
                    <PERKS />
                    <TALENTS />
                    <MARTIALARTS />
                    <POWERS>
                        <POWER XMLID="ENERGYBLAST" ID="1735787490764" BASECOST="0.0" LEVELS="4" ALIAS="Energy Blast" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="EB+1" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="AOE" ID="1735788364606" BASECOST="1.0" LEVELS="0" ALIAS="Area Of Effect" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="RADIUS" OPTIONID="RADIUS" OPTION_ALIAS="Radius" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="ENERGYBLAST" ID="1735788017030" BASECOST="0.0" LEVELS="4" ALIAS="Energy Blast" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="EB+1/2" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="ARMORPIERCING" ID="1735788383400" BASECOST="0.0" LEVELS="1" ALIAS="Armor Piercing" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="EGOATTACK" ID="1735787520724" BASECOST="0.0" LEVELS="4" ALIAS="Ego Attack" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="EA+1" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="AOE" ID="1735788391856" BASECOST="1.0" LEVELS="0" ALIAS="Area Of Effect" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="RADIUS" OPTIONID="RADIUS" OPTION_ALIAS="Radius" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="EGOATTACK" ID="1735788060059" BASECOST="0.0" LEVELS="4" ALIAS="Ego Attack" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="EA+1/2" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="ARMORPIERCING" ID="1735788404918" BASECOST="0.0" LEVELS="1" ALIAS="Armor Piercing" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="HKA" ID="1735787618860" BASECOST="0.0" LEVELS="3" ALIAS="Killing Attack - Hand-To-Hand" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="HKA+1/2" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="ARMORPIERCING" ID="1735788415571" BASECOST="0.0" LEVELS="1" ALIAS="Armor Piercing" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                            </POWER>
                        <POWER XMLID="RKA" ID="1735787638516" BASECOST="0.0" LEVELS="3" ALIAS="Killing Attack - Ranged" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="RKA+1/2" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="ARMORPIERCING" ID="1735788428822" BASECOST="0.0" LEVELS="1" ALIAS="Armor Piercing" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                    </POWERS>
                    <DISADVANTAGES />
                    <EQUIPMENT />
                    <RULES name="Default" path="foo.hdr" BASEPOINTS="200" DISADPOINTS="150" APPEREND="10" STRAPPEREND="10" NCMSELECTED="No" NCMUSERCHANGEABLE="Yes" ATTACKAPMAXVALUE="90" ATTACKAPMAXRESPONSE="0" DEFENSEAPMAXVALUE="90" DEFENSEAPMAXRESPONSE="0" DISADCATEGORYMAXVALUE="75" DISADCATEGORYMAXRESPONSE="0" AVAILDISADPOINTSRESPONSE="0" AVAILTOTALPOINTSRESPONSE="0" CHARACTERISTICMAXVALUE="1000" CHARACTERISTICMAXRESPONSE="0" MANEUVERMAXVALUE="1000" MANEUVERMAXRESPONSE="0" SKILLMAXVALUE="1000" SKILLMAXRESPONSE="0" PERKMAXVALUE="1000" PERKMAXRESPONSE="0" TALENTMAXVALUE="1000" TALENTMAXRESPONSE="0" POWERMAXVALUE="1000" POWERMAXRESPONSE="0" EQUIPMENTCOSTVALUE="1000" EQUIPMENTCOSTRESPONSE="0" EQUIPMENTCOSTUNITS="$" EQUIPMENTCOSTCONVERSION="1.0" EQUIPMENTCOSTDECIMALPLACES="0" EQUIPMENTUNITSPREFIX="Yes" STANDARDEFFECTALLOWED="Yes" USEEXPANDEDGROWTHCHART="No" DEFAULTSTANDARDEFFECT="No" MULTIPLIERALLOWED="No" LANGUAGESIMILARITIESUSED="No" LITERACYFREE="No" NATIVELITERACYFREE="Yes" EQUIPMENTALLOWED="Yes" PENALIZENOLEVEL1="No" ONLYSELLONEFIGURED="Yes" USEINCREASEDDAMAGEDIFFERENTIATION="No" AUTOMATICALLYAPPLYNOFIGURED="Yes" LINKACROSSFRAMEWORK="2" SPECIALTYPEINFRAMEWORK="1" NONENDUSINGABILITYINEC="1" USESKILLMAXIMA="No" USESKILLMULTIPLIERS="No" LANGUAGESASINTSKILL="No" SKILLMAXIMALIMIT="13" SKILLROLLBASE="9" SKILLROLLDENOMINATOR="5.0" CHARROLLBASE="9" CHARROLLDENOMINATOR="5.0" USENOTES1="No" USENOTES2="No" USENOTES3="No" USENOTES4="No" USENOTES5="No" NOTES1LABEL="Notes 1" NOTES2LABEL="Notes 2" NOTES3LABEL="Notes 3" NOTES4LABEL="Notes 4" NOTES5LABEL="Notes 5" />
                    </CHARACTER>
                `;

                let actor;
                let ebPlusOneItem;
                let ebPlusHalfItem;
                let eaPlusOneItem;
                let eaPlusHalfItem;
                let hkaPlusHalfItem;
                let rkaPlusHalfItem;

                before(async () => {
                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);
                    ebPlusOneItem = actor.items.find(
                        (item) => item.system.XMLID === "ENERGYBLAST" && item.name === "EB+1",
                    );
                    ebPlusHalfItem = actor.items.find(
                        (item) => item.system.XMLID === "ENERGYBLAST" && item.name === "EB+1/2",
                    );
                    eaPlusOneItem = actor.items.find(
                        (item) => item.system.XMLID === "EGOATTACK" && item.name === "EA+1",
                    );
                    eaPlusHalfItem = actor.items.find(
                        (item) => item.system.XMLID === "EGOATTACK" && item.name === "EA+1/2",
                    );
                    hkaPlusHalfItem = actor.items.find((item) => item.system.XMLID === "HKA");
                    rkaPlusHalfItem = actor.items.find((item) => item.system.XMLID === "RKA");
                });

                describe("Energy Blast", function () {
                    it("should have the correct cost for the +1/2 EB", function () {
                        assert.equal(ebPlusHalfItem.system.activePoints, 30);
                    });

                    it("should have the correct END cost for the +1/2 EB", function () {
                        assert.equal(ebPlusHalfItem.system.end, 3);
                    });

                    it("should have the correct damage for the +1/2 EB", function () {
                        assert.equal(getEffectFormulaFromItem(ebPlusHalfItem, {}), "4d6");
                    });

                    it("should have the correct cost for the +1 EB", function () {
                        assert.equal(ebPlusOneItem.system.activePoints, 40);
                    });

                    it("should have the correct END cost for the +1 EB", function () {
                        assert.equal(ebPlusOneItem.system.end, 4);
                    });

                    it("should have the correct damage for the +1 EB", function () {
                        assert.equal(getEffectFormulaFromItem(ebPlusOneItem, {}), "4d6");
                    });
                });

                describe("Ego Attack", function () {
                    it("should have the correct cost for the +1/2 EA", function () {
                        assert.equal(eaPlusHalfItem.system.activePoints, 60);
                    });

                    it("should have the correct END cost for the +1/2 EA", function () {
                        assert.equal(eaPlusHalfItem.system.end, 6);
                    });

                    it("should have the correct damage for the +1/2 EA", function () {
                        assert.equal(getEffectFormulaFromItem(eaPlusHalfItem, {}), "4d6");
                    });

                    it("should have the correct cost for the +1 EA", function () {
                        assert.equal(eaPlusOneItem.system.activePoints, 80);
                    });

                    it("should have the correct END cost for the +1 EA", function () {
                        assert.equal(eaPlusOneItem.system.end, 8);
                    });

                    it("should have the correct damage for the +1 EA", function () {
                        assert.equal(getEffectFormulaFromItem(eaPlusOneItem, {}), "4d6");
                    });
                });

                describe("Killing Attack", function () {
                    it("should have the correct cost for the +1/2 RKA", function () {
                        assert.equal(rkaPlusHalfItem.system.activePoints, 67);
                    });

                    it("should have the correct END cost for the +1/2 RKA", function () {
                        assert.equal(rkaPlusHalfItem.system.end, 7);
                    });

                    it("should have the correct damage for the +1/2 RKA", function () {
                        assert.equal(getEffectFormulaFromItem(rkaPlusHalfItem, { effectivestr: 15 }), "3d6");
                    });

                    it("should have the correct cost for the +1/2 HKA", function () {
                        assert.equal(hkaPlusHalfItem.system.activePoints, 67);
                    });

                    it("should have the correct END cost for the +1/2 HKA", function () {
                        assert.equal(hkaPlusHalfItem.system.end, 7);
                    });

                    it("should have the correct damage for the +1/2 HKA", function () {
                        // 15 STR (3 DC) is 2 DC given the +1/2 advantage on the HKA. 3d6 + 2 DC = 3 1/2 d6
                        assert.equal(getEffectFormulaFromItem(hkaPlusHalfItem, { effectivestr: 15 }), "3½d6");
                    });
                });

                describe("CSLs and DCs", function () {
                    let cslItem;
                    let cslPreviousActiveState;
                    let cslPreviousAllocation;

                    beforeEach(function () {
                        // Turn on the CSLs
                        cslItem = actor.items.find((item) => item.system.XMLID === "COMBAT_LEVELS");
                        cslPreviousActiveState = cslItem.system.active;
                        cslItem.system.active = true;

                        // Set the CSLs for DCs
                        cslPreviousAllocation = cslItem.system.csl;
                        cslItem.system.csl = ["dc", "dc"];
                    });

                    afterEach(function () {
                        // Turn off the CSLs
                        cslItem.system.active = cslPreviousActiveState;

                        // Set the CSLs to previous
                        cslItem.system.csl = cslPreviousAllocation;
                    });

                    it("should have the correct damage for the +1/2 EB with 2 CSLs", function () {
                        // 2 CSLs is 1DC (ignores advantage). 4d6 + 1 DC = 5d6
                        assert.equal(getEffectFormulaFromItem(ebPlusHalfItem, {}), "5d6");
                    });

                    it("should have the correct damage for the +1 EB with 2 CSLs", function () {
                        // 2 CSLs is 2DCs (ignores advantage). 3d6 + 2 DC = 3d6+1
                        assert.equal(getEffectFormulaFromItem(ebPlusOneItem, {}), "5d6");
                    });

                    it("should have the correct damage for the +1/2 EA with 2 CSLs", function () {
                        // 2 CSLs at +1/2 is 1DC (ignores advantages). + 1 DC = +½d6
                        assert.equal(getEffectFormulaFromItem(eaPlusHalfItem, {}), "4½d6");
                    });

                    it("should have the correct damage for the +1 EA with 2 CSLs", function () {
                        // 2 CSLs at +1/2 is 1DC  (ignores advantages). + 1 DC = +1
                        assert.equal(getEffectFormulaFromItem(eaPlusOneItem, {}), "4½d6");
                    });

                    it("should have the correct damage for the +1/2 HKA with 1 CSL", function () {
                        // Only use 1 CSL
                        cslItem.system.csl = ["dc", "ocv"];

                        // 1 CSLs is 0DC (ignores advantage). 3d6 + 0 DC = 3d6
                        assert.equal(getEffectFormulaFromItem(hkaPlusHalfItem, { effectivestr: 0 }), "3d6");
                    });

                    it("should have the correct damage for the +1/2 HKA with 2 CSLs", function () {
                        // 2 CSLs is 1DC (ignores advantage). 3d6 + 1 DC = 3d6+1
                        assert.equal(getEffectFormulaFromItem(hkaPlusHalfItem, { effectivestr: 0 }), "3d6+1");
                    });
                });

                // Confirm that we add straight dice in 5e for haymakers.
                describe("Haymaker", function () {
                    let haymakerManeuver;

                    before(function () {
                        // Turn on the haymaker
                        haymakerManeuver = actor.items.find(
                            (item) => item.type === "maneuver" && item.system.XMLID === "HAYMAKER",
                        );
                    });

                    it("should have the correct damage for the +1/2 EB", function () {
                        assert.equal(
                            getEffectFormulaFromItem(ebPlusHalfItem, { haymakerManeuverActiveItem: haymakerManeuver }),
                            "8d6",
                        );
                    });

                    it("should have the correct damage for the +1 EB", function () {
                        assert.equal(
                            getEffectFormulaFromItem(ebPlusOneItem, { haymakerManeuverActiveItem: haymakerManeuver }),
                            "8d6",
                        );
                    });

                    it("should have the correct damage for the +1/2 EA", function () {
                        assert.equal(
                            getEffectFormulaFromItem(eaPlusHalfItem, { haymakerManeuverActiveItem: haymakerManeuver }),
                            "6d6",
                        );
                    });

                    it("should have the correct damage for the +1 EA", function () {
                        assert.equal(
                            getEffectFormulaFromItem(eaPlusOneItem, { haymakerManeuverActiveItem: haymakerManeuver }),
                            "6d6",
                        );
                    });

                    it("should have the correct damage for the +1/2 RKA", function () {
                        // +4 DC (ignoring advantages) at +1/2 is 4 DC and is then halved to +2DC => ½d6
                        assert.equal(
                            getEffectFormulaFromItem(rkaPlusHalfItem, {
                                haymakerManeuverActiveItem: haymakerManeuver,
                            }),
                            "3½d6",
                        );
                    });

                    it("should have the correct damage for the +1/2 HKA", function () {
                        // +4 DC (ignoring advantages) at +1/2 is 4 DC and is then halved to +2DC => ½d6
                        assert.equal(
                            getEffectFormulaFromItem(hkaPlusHalfItem, {
                                haymakerManeuverActiveItem: haymakerManeuver,
                                effectivestr: 0,
                            }),
                            "3½d6",
                        );
                    });
                });
            });

            describe("6e - DC altering advantages", function () {
                const contents = `
                    <?xml version="1.0" encoding="UTF-16"?>
                    <CHARACTER version="6.0" TEMPLATE="builtIn.Superheroic6E.hdt">
                    <BASIC_CONFIGURATION BASE_POINTS="200" DISAD_POINTS="150" EXPERIENCE="0" />
                    <CHARACTER_INFO CHARACTER_NAME="Test 6e Advantaged Attacks" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.4622476037958" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                        <BACKGROUND />
                        <PERSONALITY />
                        <QUOTE />
                        <TACTICS />
                        <CAMPAIGN_USE />
                        <APPEARANCE />
                        <NOTES1 />
                        <NOTES2 />
                        <NOTES3 />
                        <NOTES4 />
                        <NOTES5 />
                    </CHARACTER_INFO>
                    <CHARACTERISTICS>
                        <STR XMLID="STR" ID="1735840338551" BASECOST="0.0" LEVELS="0" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STR>
                        <DEX XMLID="DEX" ID="1735840339052" BASECOST="0.0" LEVELS="0" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DEX>
                        <CON XMLID="CON" ID="1735840339216" BASECOST="0.0" LEVELS="0" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </CON>
                        <INT XMLID="INT" ID="1735840338337" BASECOST="0.0" LEVELS="0" ALIAS="INT" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </INT>
                        <EGO XMLID="EGO" ID="1735840338920" BASECOST="0.0" LEVELS="0" ALIAS="EGO" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </EGO>
                        <PRE XMLID="PRE" ID="1735840339282" BASECOST="0.0" LEVELS="0" ALIAS="PRE" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PRE>
                        <OCV XMLID="OCV" ID="1735840339279" BASECOST="0.0" LEVELS="0" ALIAS="OCV" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </OCV>
                        <DCV XMLID="DCV" ID="1735840339283" BASECOST="0.0" LEVELS="0" ALIAS="DCV" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DCV>
                        <OMCV XMLID="OMCV" ID="1735840338944" BASECOST="0.0" LEVELS="0" ALIAS="OMCV" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </OMCV>
                        <DMCV XMLID="DMCV" ID="1735840339058" BASECOST="0.0" LEVELS="0" ALIAS="DMCV" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DMCV>
                        <SPD XMLID="SPD" ID="1735840338401" BASECOST="0.0" LEVELS="0" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SPD>
                        <PD XMLID="PD" ID="1735840338452" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PD>
                        <ED XMLID="ED" ID="1735840338626" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </ED>
                        <REC XMLID="REC" ID="1735840338980" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </REC>
                        <END XMLID="END" ID="1735840339275" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </END>
                        <BODY XMLID="BODY" ID="1735840338809" BASECOST="0.0" LEVELS="0" ALIAS="BODY" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </BODY>
                        <STUN XMLID="STUN" ID="1735840339104" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STUN>
                        <RUNNING XMLID="RUNNING" ID="1735840338862" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="18" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </RUNNING>
                        <SWIMMING XMLID="SWIMMING" ID="1735840338758" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="19" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SWIMMING>
                        <LEAPING XMLID="LEAPING" ID="1735840338882" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="20" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </LEAPING>
                    </CHARACTERISTICS>
                    <SKILLS>
                        <SKILL XMLID="MENTAL_COMBAT_LEVELS" ID="1735844995029" BASECOST="0.0" LEVELS="2" ALIAS="Mental Combat Skill Levels" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="BROAD" OPTIONID="BROAD" OPTION_ALIAS="with all Mental Powers" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="GENERAL" FAMILIARITY="No" PROFICIENCY="No">
                            <NOTES />
                        </SKILL>
                        <SKILL XMLID="COMBAT_LEVELS" ID="1735840354037" BASECOST="0.0" LEVELS="2" ALIAS="Combat Skill Levels" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="ALL" OPTIONID="ALL" OPTION_ALIAS="with All Attacks" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" CHARACTERISTIC="GENERAL" FAMILIARITY="No" PROFICIENCY="No">
                            <NOTES />
                        </SKILL>
                    </SKILLS>
                    <PERKS />
                    <TALENTS />
                    <MARTIALARTS />
                    <POWERS>
                        <POWER XMLID="ENERGYBLAST" ID="1735841051758" BASECOST="0.0" LEVELS="4" ALIAS="Energy Blast" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="EB+1" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="AOE" ID="1735841893968" BASECOST="0.0" LEVELS="1" ALIAS="Area Of Effect" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="RADIUS" OPTIONID="RADIUS" OPTION_ALIAS="Radius" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                                <ADDER XMLID="MOBILE" ID="1735841900728" BASECOST="0.25" LEVELS="1" ALIAS="Mobile" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="No" GROUP="No" LVLCOST="0.25" LVLVAL="1.0" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                                <ADDER XMLID="SELECTIVETARGET" ID="1735841902155" BASECOST="0.25" LEVELS="0" ALIAS="Selective" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="ENERGYBLAST" ID="1735841074561" BASECOST="0.0" LEVELS="4" ALIAS="Energy Blast" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="EB+1/2" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="ARMORPIERCING" ID="1735841189837" BASECOST="0.0" LEVELS="2" ALIAS="Armor Piercing" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="EGOATTACK" ID="1735841096274" BASECOST="0.0" LEVELS="4" ALIAS="Ego Attack" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="EA+1" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="AOE" ID="1735841918378" BASECOST="0.0" LEVELS="1" ALIAS="Area Of Effect" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="RADIUS" OPTIONID="RADIUS" OPTION_ALIAS="Radius" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                                <ADDER XMLID="SELECTIVETARGET" ID="1735841920146" BASECOST="0.25" LEVELS="0" ALIAS="Selective" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                                <ADDER XMLID="MOBILE" ID="1735841921253" BASECOST="0.25" LEVELS="1" ALIAS="Mobile" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="No" GROUP="No" LVLCOST="0.25" LVLVAL="1.0" SELECTED="YES">
                                <NOTES />
                                </ADDER>
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="EGOATTACK" ID="1735841123188" BASECOST="0.0" LEVELS="4" ALIAS="Ego Attack" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="EA+1/2" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="ARMORPIERCING" ID="1735841212055" BASECOST="0.0" LEVELS="2" ALIAS="Armor Piercing" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="HKA" ID="1735841147388" BASECOST="0.0" LEVELS="3" ALIAS="Killing Attack - Hand-To-Hand" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="HKA+1/2" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="ARMORPIERCING" ID="1735841231198" BASECOST="0.0" LEVELS="2" ALIAS="Armor Piercing" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="RKA" ID="1735841170408" BASECOST="0.0" LEVELS="3" ALIAS="Killing Attack - Ranged" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="RKA+1/2" INPUT="ED" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="ARMORPIERCING" ID="1735841258732" BASECOST="0.0" LEVELS="2" ALIAS="Armor Piercing" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                    </POWERS>
                    <DISADVANTAGES />
                    <EQUIPMENT />
                    <RULES name="Default" path="foo.hdr" BASEPOINTS="200" DISADPOINTS="150" APPEREND="10" STRAPPEREND="10" NCMSELECTED="No" NCMUSERCHANGEABLE="Yes" ATTACKAPMAXVALUE="90" ATTACKAPMAXRESPONSE="0" DEFENSEAPMAXVALUE="90" DEFENSEAPMAXRESPONSE="0" DISADCATEGORYMAXVALUE="75" DISADCATEGORYMAXRESPONSE="0" AVAILDISADPOINTSRESPONSE="0" AVAILTOTALPOINTSRESPONSE="0" CHARACTERISTICMAXVALUE="1000" CHARACTERISTICMAXRESPONSE="0" MANEUVERMAXVALUE="1000" MANEUVERMAXRESPONSE="0" SKILLMAXVALUE="1000" SKILLMAXRESPONSE="0" PERKMAXVALUE="1000" PERKMAXRESPONSE="0" TALENTMAXVALUE="1000" TALENTMAXRESPONSE="0" POWERMAXVALUE="1000" POWERMAXRESPONSE="0" EQUIPMENTCOSTVALUE="1000" EQUIPMENTCOSTRESPONSE="0" EQUIPMENTCOSTUNITS="$" EQUIPMENTCOSTCONVERSION="1.0" EQUIPMENTCOSTDECIMALPLACES="0" EQUIPMENTUNITSPREFIX="Yes" STANDARDEFFECTALLOWED="Yes" USEEXPANDEDGROWTHCHART="No" DEFAULTSTANDARDEFFECT="No" MULTIPLIERALLOWED="No" LANGUAGESIMILARITIESUSED="No" LITERACYFREE="No" NATIVELITERACYFREE="Yes" EQUIPMENTALLOWED="Yes" PENALIZENOLEVEL1="No" ONLYSELLONEFIGURED="Yes" USEINCREASEDDAMAGEDIFFERENTIATION="No" AUTOMATICALLYAPPLYNOFIGURED="Yes" LINKACROSSFRAMEWORK="2" SPECIALTYPEINFRAMEWORK="1" NONENDUSINGABILITYINEC="1" USESKILLMAXIMA="No" USESKILLMULTIPLIERS="No" LANGUAGESASINTSKILL="No" SKILLMAXIMALIMIT="13" SKILLROLLBASE="9" SKILLROLLDENOMINATOR="5.0" CHARROLLBASE="9" CHARROLLDENOMINATOR="5.0" USENOTES1="No" USENOTES2="No" USENOTES3="No" USENOTES4="No" USENOTES5="No" NOTES1LABEL="Notes 1" NOTES2LABEL="Notes 2" NOTES3LABEL="Notes 3" NOTES4LABEL="Notes 4" NOTES5LABEL="Notes 5" />
                    </CHARACTER>
                `;

                let actor;
                let ebPlusOneItem;
                let ebPlusHalfItem;
                let eaPlusOneItem;
                let eaPlusHalfItem;
                let hkaPlusHalfItem;
                let rkaPlusHalfItem;

                before(async () => {
                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);
                    ebPlusOneItem = actor.items.find(
                        (item) => item.system.XMLID === "ENERGYBLAST" && item.name === "EB+1",
                    );
                    ebPlusHalfItem = actor.items.find(
                        (item) => item.system.XMLID === "ENERGYBLAST" && item.name === "EB+1/2",
                    );
                    eaPlusOneItem = actor.items.find(
                        (item) => item.system.XMLID === "EGOATTACK" && item.name === "EA+1",
                    );
                    eaPlusHalfItem = actor.items.find(
                        (item) => item.system.XMLID === "EGOATTACK" && item.name === "EA+1/2",
                    );
                    hkaPlusHalfItem = actor.items.find((item) => item.system.XMLID === "HKA");
                    rkaPlusHalfItem = actor.items.find((item) => item.system.XMLID === "RKA");
                });

                describe("Energy Blast", function () {
                    it("should have the correct cost for the +1/2 EB", function () {
                        assert.equal(ebPlusHalfItem.system.activePoints, 30);
                    });

                    it("should have the correct END cost for the +1/2 EB", function () {
                        assert.equal(ebPlusHalfItem.system.end, 3);
                    });

                    it("should have the correct damage for the +1/2 EB", function () {
                        assert.equal(getEffectFormulaFromItem(ebPlusHalfItem, {}), "4d6");
                    });

                    it("should have the correct cost for the +1 EB", function () {
                        assert.equal(ebPlusOneItem.system.activePoints, 40);
                    });

                    it("should have the correct END cost for the +1 EB", function () {
                        assert.equal(ebPlusOneItem.system.end, 4);
                    });

                    it("should have the correct damage for the +1 EB", function () {
                        assert.equal(getEffectFormulaFromItem(ebPlusOneItem, {}), "4d6");
                    });
                });

                describe("Ego Attack", function () {
                    it("should have the correct cost for the +1/2 EA", function () {
                        assert.equal(eaPlusHalfItem.system.activePoints, 60);
                    });

                    it("should have the correct END cost for the +1/2 EA", function () {
                        assert.equal(eaPlusHalfItem.system.end, 6);
                    });

                    it("should have the correct damage for the +1/2 EA", function () {
                        assert.equal(getEffectFormulaFromItem(eaPlusHalfItem, {}), "4d6");
                    });

                    it("should have the correct cost for the +1 EA", function () {
                        assert.equal(eaPlusOneItem.system.activePoints, 80);
                    });

                    it("should have the correct END cost for the +1 EA", function () {
                        assert.equal(eaPlusOneItem.system.end, 8);
                    });

                    it("should have the correct damage for the +1 EA", function () {
                        assert.equal(getEffectFormulaFromItem(eaPlusOneItem, {}), "4d6");
                    });
                });

                describe("Killing Attack", function () {
                    it("should have the correct cost for the +1/2 RKA", function () {
                        assert.equal(rkaPlusHalfItem.system.activePoints, 67);
                    });

                    it("should have the correct END cost for the +1/2 RKA", function () {
                        assert.equal(rkaPlusHalfItem.system.end, 7);
                    });

                    it("should have the correct damage for the +1/2 RKA", function () {
                        assert.equal(getEffectFormulaFromItem(rkaPlusHalfItem, { effectivestr: 15 }), "3d6");
                    });

                    it("should have the correct cost for the +1/2 HKA", function () {
                        assert.equal(hkaPlusHalfItem.system.activePoints, 67);
                    });

                    it("should have the correct END cost for the +1/2 HKA", function () {
                        assert.equal(hkaPlusHalfItem.system.end, 7);
                    });

                    it("should have the correct damage for the +1/2 HKA", function () {
                        // 15 STR (3 DC) is 2 DC given the +1/2 advantage on the HKA. 3d6 + 2 DC = 3 1/2 d6
                        assert.equal(getEffectFormulaFromItem(hkaPlusHalfItem, { effectivestr: 15 }), "3½d6");
                    });
                });

                describe("CSLs and DCs", function () {
                    let cslCombatItem;
                    let cslCombatPreviousActiveState;
                    let cslCombatPreviousAllocation;
                    let cslMentalItem;
                    let cslMentalPreviousActiveState;
                    let cslMentalPreviousAllocation;

                    beforeEach(function () {
                        // Turn on the CSLs
                        cslCombatItem = actor.items.find((item) => item.system.XMLID === "COMBAT_LEVELS");
                        cslCombatPreviousActiveState = cslCombatItem.system.active;
                        cslCombatItem.system.active = true;

                        cslMentalItem = actor.items.find((item) => item.system.XMLID === "MENTAL_COMBAT_LEVELS");
                        cslMentalPreviousActiveState = cslMentalItem.system.active;
                        cslMentalItem.system.active = true;

                        // Set the CSLs for DCs
                        cslCombatPreviousAllocation = cslCombatItem.system.csl;
                        cslCombatItem.system.csl = ["dc", "dc"];

                        cslMentalPreviousAllocation = cslMentalItem.system.csl;
                        cslMentalItem.system.csl = ["dc", "dc"];
                    });

                    afterEach(function () {
                        // Turn off the CSLs
                        cslCombatItem.system.active = cslCombatPreviousActiveState;
                        cslMentalItem.system.active = cslMentalPreviousActiveState;

                        // Set the CSLs to previous
                        cslCombatItem.system.csl = cslCombatPreviousAllocation;
                        cslMentalItem.system.csl = cslMentalPreviousAllocation;
                    });

                    it("should have the correct damage for the +1/2 EB with 2 CSLs", function () {
                        // 2 CSLs at +1/2 is 0.6666DC. 4d6 + 0.666 DC = +½d6
                        assert.equal(getEffectFormulaFromItem(ebPlusHalfItem, {}), "4½d6");
                    });

                    it("should have the correct damage for the +1 EB with 2 CSLs", function () {
                        // 2 CSLs at +1/2 is 0.5DC. 4d6 + 0.5 DC = +1
                        assert.equal(getEffectFormulaFromItem(ebPlusOneItem, {}), "4d6+1");
                    });

                    it("should have the correct damage for the +1/2 EA with 2 CSLs", function () {
                        // 2 CSLs at +1/2 is 0.6666DC. 4d6 + 0.666 DC = +1
                        assert.equal(getEffectFormulaFromItem(eaPlusHalfItem, {}), "4d6+1");
                    });

                    it("should have the correct damage for the +1 EA with 2 CSLs", function () {
                        // 2 CSLs at +1/2 is 0.5DC. 4d6 + 0.5 DC = +0
                        assert.equal(getEffectFormulaFromItem(eaPlusOneItem, {}), "4d6");
                    });

                    it("should have the correct damage for the +1/2 HKA with 1 CSL", function () {
                        // Only use 1 CSL
                        cslCombatItem.system.csl = ["dc", "ocv"];

                        // 1 CSLs is 0DC. 3d6 + 0 DC = 0d6
                        assert.equal(getEffectFormulaFromItem(hkaPlusHalfItem, { effectivestr: 0 }), "3d6");
                    });

                    it("should have the correct damage for the +1/2 HKA with 2 CSLs", function () {
                        // 2 CSLs at +1/2 is 0.6666DC. 4d6 + 0.666 DC = 0d6
                        assert.equal(getEffectFormulaFromItem(hkaPlusHalfItem, { effectivestr: 0 }), "3d6");
                    });
                });

                // Confirm that we add straight dice in 5e for haymakers.
                describe("Haymaker", function () {
                    let haymakerManeuver;

                    before(function () {
                        // Turn on the haymaker
                        haymakerManeuver = actor.items.find(
                            (item) => item.type === "maneuver" && item.system.XMLID === "HAYMAKER",
                        );
                    });

                    it("should have the correct damage for the +1/2 EB", function () {
                        // +4 DC at +1/2 is 2.66 DC => 2½d6
                        assert.equal(
                            getEffectFormulaFromItem(ebPlusHalfItem, { haymakerManeuverActiveItem: haymakerManeuver }),
                            "6½d6",
                        );
                    });

                    it("should have the correct damage for the +1 EB", function () {
                        // +4 DC at +1 is 2 DC => 2d6
                        assert.equal(
                            getEffectFormulaFromItem(ebPlusOneItem, { haymakerManeuverActiveItem: haymakerManeuver }),
                            "6d6",
                        );
                    });

                    it("should have the correct damage for the +1/2 EA", function () {
                        // +4 DC at +1/2 is 2.66 DC => 1d6+1
                        assert.equal(
                            getEffectFormulaFromItem(eaPlusHalfItem, { haymakerManeuverActiveItem: haymakerManeuver }),
                            "5d6+1",
                        );
                    });

                    it("should have the correct damage for the +1 EA", function () {
                        // +4 DC at +1 is 2 DC => 1d6
                        assert.equal(
                            getEffectFormulaFromItem(eaPlusOneItem, { haymakerManeuverActiveItem: haymakerManeuver }),
                            "5d6",
                        );
                    });

                    it("should have the correct damage for the +1/2 RKA", function () {
                        // +4 DC at +1/2 is 2.66 DC => ½d6
                        assert.equal(
                            getEffectFormulaFromItem(rkaPlusHalfItem, {
                                haymakerManeuverActiveItem: haymakerManeuver,
                            }),
                            "3½d6",
                        );
                    });

                    it("should have the correct damage for the +1/2 HKA", function () {
                        // +4 DC at +1 is 2 DC => 2d6
                        assert.equal(
                            getEffectFormulaFromItem(hkaPlusHalfItem, {
                                haymakerManeuverActiveItem: haymakerManeuver,
                                effectivestr: 0,
                            }),
                            "3½d6",
                        );
                    });
                });
            });

            describe("6e - weapon master and deadly blow", function () {
                const contents = `
                    <?xml version="1.0" encoding="UTF-16"?>
                    <CHARACTER version="6.0" TEMPLATE="builtIn.Superheroic6E.hdt">
                    <BASIC_CONFIGURATION BASE_POINTS="200" DISAD_POINTS="150" EXPERIENCE="0" />
                    <CHARACTER_INFO CHARACTER_NAME="Test Weapon Master And Deadly Blows" ALTERNATE_IDENTITIES="" PLAYER_NAME="" HEIGHT="78.74015748031496" WEIGHT="220.4622476037958" HAIR_COLOR="Brown" EYE_COLOR="Brown" CAMPAIGN_NAME="" GENRE="" GM="">
                        <BACKGROUND />
                        <PERSONALITY />
                        <QUOTE />
                        <TACTICS />
                        <CAMPAIGN_USE />
                        <APPEARANCE />
                        <NOTES1 />
                        <NOTES2 />
                        <NOTES3 />
                        <NOTES4 />
                        <NOTES5 />
                    </CHARACTER_INFO>
                    <CHARACTERISTICS>
                        <STR XMLID="STR" ID="1736091070532" BASECOST="0.0" LEVELS="5" ALIAS="STR" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STR>
                        <DEX XMLID="DEX" ID="1736091070048" BASECOST="0.0" LEVELS="0" ALIAS="DEX" POSITION="2" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DEX>
                        <CON XMLID="CON" ID="1736091070435" BASECOST="0.0" LEVELS="0" ALIAS="CON" POSITION="3" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </CON>
                        <INT XMLID="INT" ID="1736091069828" BASECOST="0.0" LEVELS="0" ALIAS="INT" POSITION="4" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </INT>
                        <EGO XMLID="EGO" ID="1736091070178" BASECOST="0.0" LEVELS="0" ALIAS="EGO" POSITION="5" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </EGO>
                        <PRE XMLID="PRE" ID="1736091069821" BASECOST="0.0" LEVELS="0" ALIAS="PRE" POSITION="6" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PRE>
                        <OCV XMLID="OCV" ID="1736091070373" BASECOST="0.0" LEVELS="0" ALIAS="OCV" POSITION="7" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </OCV>
                        <DCV XMLID="DCV" ID="1736091070297" BASECOST="0.0" LEVELS="0" ALIAS="DCV" POSITION="8" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DCV>
                        <OMCV XMLID="OMCV" ID="1736091070396" BASECOST="0.0" LEVELS="0" ALIAS="OMCV" POSITION="9" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </OMCV>
                        <DMCV XMLID="DMCV" ID="1736091070254" BASECOST="0.0" LEVELS="0" ALIAS="DMCV" POSITION="10" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </DMCV>
                        <SPD XMLID="SPD" ID="1736091070236" BASECOST="0.0" LEVELS="0" ALIAS="SPD" POSITION="11" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SPD>
                        <PD XMLID="PD" ID="1736091069932" BASECOST="0.0" LEVELS="0" ALIAS="PD" POSITION="12" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </PD>
                        <ED XMLID="ED" ID="1736091070234" BASECOST="0.0" LEVELS="0" ALIAS="ED" POSITION="13" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </ED>
                        <REC XMLID="REC" ID="1736091070334" BASECOST="0.0" LEVELS="0" ALIAS="REC" POSITION="14" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </REC>
                        <END XMLID="END" ID="1736091069933" BASECOST="0.0" LEVELS="0" ALIAS="END" POSITION="15" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </END>
                        <BODY XMLID="BODY" ID="1736091069878" BASECOST="0.0" LEVELS="0" ALIAS="BODY" POSITION="16" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </BODY>
                        <STUN XMLID="STUN" ID="1736091070499" BASECOST="0.0" LEVELS="0" ALIAS="STUN" POSITION="17" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </STUN>
                        <RUNNING XMLID="RUNNING" ID="1736091069713" BASECOST="0.0" LEVELS="0" ALIAS="Running" POSITION="18" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </RUNNING>
                        <SWIMMING XMLID="SWIMMING" ID="1736091069865" BASECOST="0.0" LEVELS="0" ALIAS="Swimming" POSITION="19" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </SWIMMING>
                        <LEAPING XMLID="LEAPING" ID="1736091069690" BASECOST="0.0" LEVELS="0" ALIAS="Leaping" POSITION="20" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" AFFECTS_PRIMARY="Yes" AFFECTS_TOTAL="Yes">
                        <NOTES />
                        </LEAPING>
                    </CHARACTERISTICS>
                    <SKILLS />
                    <PERKS />
                    <TALENTS>
                        <TALENT XMLID="DEADLYBLOW" ID="1736091119815" BASECOST="0.0" LEVELS="4" ALIAS="Deadly Blow:  +4d6" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="VERYLIMITED" OPTIONID="VERYLIMITED" OPTION_ALIAS="[very limited circumstances]" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="">
                            <NOTES />
                        </TALENT>
                        <TALENT XMLID="WEAPON_MASTER" ID="1736091131527" BASECOST="0.0" LEVELS="3" ALIAS="Weapon Master:  +3d6" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="VERYLIMITED" OPTIONID="VERYLIMITED" OPTION_ALIAS="[very limited group]" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="">
                            <NOTES />
                            <ADDER XMLID="GENERIC_OBJECT" ID="1736092943424" BASECOST="0.0" LEVELS="0" ALIAS="Big Sword" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="No" DISPLAYINSTRING="Yes" GROUP="No" SELECTED="YES">
                                <NOTES />
                            </ADDER>
                        </TALENT>
                    </TALENTS>
                    <MARTIALARTS />
                    <POWERS>
                        <POWER XMLID="HKA" ID="1736091852623" BASECOST="0.0" LEVELS="2" ALIAS="Killing Attack - Hand-To-Hand" POSITION="0" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Big Sword" INPUT="PD" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <MODIFIER XMLID="FOCUS" ID="1736092723220" BASECOST="-0.25" LEVELS="0" ALIAS="Focus" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="IIF" OPTIONID="IIF" OPTION_ALIAS="IIF" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                        <POWER XMLID="HKA" ID="1736093244686" BASECOST="0.0" LEVELS="1" ALIAS="Killing Attack - Hand-To-Hand" POSITION="1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="Little Sword" INPUT="PD" USESTANDARDEFFECT="No" QUANTITY="1" AFFECTS_PRIMARY="No" AFFECTS_TOTAL="Yes">
                            <NOTES />
                            <ADDER XMLID="PLUSONEPIP" ID="1736093256602" BASECOST="5.0" LEVELS="0" ALIAS="+1 pip" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" SHOWALIAS="Yes" PRIVATE="No" REQUIRED="No" INCLUDEINBASE="Yes" DISPLAYINSTRING="No" GROUP="No" SELECTED="YES">
                                <NOTES />
                            </ADDER>
                            <MODIFIER XMLID="FOCUS" ID="1736093246312" BASECOST="-0.25" LEVELS="0" ALIAS="Focus" POSITION="-1" MULTIPLIER="1.0" GRAPHIC="Burst" COLOR="255 255 255" SFX="Default" SHOW_ACTIVE_COST="Yes" OPTION="IIF" OPTIONID="IIF" OPTION_ALIAS="IIF" INCLUDE_NOTES_IN_PRINTOUT="Yes" NAME="" COMMENTS="" PRIVATE="No" FORCEALLOW="No">
                                <NOTES />
                            </MODIFIER>
                        </POWER>
                    </POWERS>
                    <DISADVANTAGES />
                    <EQUIPMENT />
                    <RULES name="Default" path="foo.hdr" BASEPOINTS="200" DISADPOINTS="150" APPEREND="10" STRAPPEREND="10" NCMSELECTED="No" NCMUSERCHANGEABLE="Yes" ATTACKAPMAXVALUE="90" ATTACKAPMAXRESPONSE="0" DEFENSEAPMAXVALUE="90" DEFENSEAPMAXRESPONSE="0" DISADCATEGORYMAXVALUE="75" DISADCATEGORYMAXRESPONSE="0" AVAILDISADPOINTSRESPONSE="0" AVAILTOTALPOINTSRESPONSE="0" CHARACTERISTICMAXVALUE="1000" CHARACTERISTICMAXRESPONSE="0" MANEUVERMAXVALUE="1000" MANEUVERMAXRESPONSE="0" SKILLMAXVALUE="1000" SKILLMAXRESPONSE="0" PERKMAXVALUE="1000" PERKMAXRESPONSE="0" TALENTMAXVALUE="1000" TALENTMAXRESPONSE="0" POWERMAXVALUE="1000" POWERMAXRESPONSE="0" EQUIPMENTCOSTVALUE="1000" EQUIPMENTCOSTRESPONSE="0" EQUIPMENTCOSTUNITS="$" EQUIPMENTCOSTCONVERSION="1.0" EQUIPMENTCOSTDECIMALPLACES="0" EQUIPMENTUNITSPREFIX="Yes" STANDARDEFFECTALLOWED="Yes" USEEXPANDEDGROWTHCHART="No" DEFAULTSTANDARDEFFECT="No" MULTIPLIERALLOWED="No" LANGUAGESIMILARITIESUSED="No" LITERACYFREE="No" NATIVELITERACYFREE="Yes" EQUIPMENTALLOWED="Yes" PENALIZENOLEVEL1="No" ONLYSELLONEFIGURED="Yes" USEINCREASEDDAMAGEDIFFERENTIATION="No" AUTOMATICALLYAPPLYNOFIGURED="Yes" LINKACROSSFRAMEWORK="2" SPECIALTYPEINFRAMEWORK="1" NONENDUSINGABILITYINEC="1" USESKILLMAXIMA="No" USESKILLMULTIPLIERS="No" LANGUAGESASINTSKILL="No" SKILLMAXIMALIMIT="13" SKILLROLLBASE="9" SKILLROLLDENOMINATOR="5.0" CHARROLLBASE="9" CHARROLLDENOMINATOR="5.0" USENOTES1="No" USENOTES2="No" USENOTES3="No" USENOTES4="No" USENOTES5="No" NOTES1LABEL="Notes 1" NOTES2LABEL="Notes 2" NOTES3LABEL="Notes 3" NOTES4LABEL="Notes 4" NOTES5LABEL="Notes 5" />
                    </CHARACTER>
                `;

                let actor;

                let bigSwordItem;
                let littleSwordItem;

                before(async () => {
                    actor = new HeroSystem6eActor(
                        {
                            name: "Quench Actor",
                            type: "pc",
                        },
                        {},
                    );

                    await actor.uploadFromXml(contents);
                    bigSwordItem = actor.items.find((item) => item.system.XMLID === "HKA" && item.name === "Big Sword");
                    littleSwordItem = actor.items.find(
                        (item) => item.system.XMLID === "HKA" && item.name === "Little Sword",
                    );
                });

                describe("Big Sword Killing Attack", function () {
                    it("should have the correct base damage for the Big Sword HKA", function () {
                        // Base: Big Sword 2d6K (6 DC) => 6 DC
                        // Added: 15 STR (3 DC), Weapon Master x3 for Big Sword (9 DC) => 12 DC
                        // Combined: 6 DC + 12 DC (no damage doubling rule) => 18 DC
                        assert.equal(getEffectFormulaFromItem(bigSwordItem, {}), "6d6");
                    });

                    it("should add strength for the Big Sword HKA", function () {
                        // Base: Big Sword 2d6K (6 DC) => 6 DC
                        // Added: 25 STR (5 DC), Weapon Master x3 for Big Sword (9 DC) => 14 DC
                        // Combined: 6 DC + 14 DC (no damage doubling rule) => 20 DC
                        assert.equal(getEffectFormulaFromItem(bigSwordItem, { effectivestr: 25 }), "6½d6");
                    });
                });

                describe("Little Sword Killing Attack", function () {
                    it("should have the correct base damage for the Little Sword HKA", function () {
                        // Base: Little Sword 1d6+1K (4 DC) => 4 DC
                        // Added: 15 STR (3 DC)) => 3 DC
                        // Combined: 4 DC + 3 DC (no damage doubling rule) => 7 DC
                        assert.equal(getEffectFormulaFromItem(littleSwordItem, {}), "2d6+1");
                    });

                    it("should add strength for the Little Sword HKA", function () {
                        // Base: Little Sword 1d6+1K (4 DC) => 4 DC
                        // Added: 25 STR (5 DC)) => 5 DC
                        // Combined: 4 DC + 5 DC (no damage doubling rule) => 9 DC
                        assert.equal(getEffectFormulaFromItem(littleSwordItem, { effectivestr: 25 }), "3d6");
                    });
                });

                describe("Big and Little Sword Killing Attacks with damage doubling rules", function () {
                    let previousSetting;

                    beforeEach(async () => {
                        previousSetting = await game.settings.get(HEROSYS.module, "DoubleDamageLimit");
                        await game.settings.set(HEROSYS.module, "DoubleDamageLimit", true);
                    });

                    afterEach(async () => {
                        await game.settings.set(HEROSYS.module, "DoubleDamageLimit", previousSetting);
                    });

                    it("should limit total damage for the Big Sword HKA", function () {
                        // Base: Big Sword 2d6K (6 DC) => 6 DC
                        // Added: 15 STR (3 DC), Weapon Master x3 for Big Sword (9 DC) => 12 DC
                        // Combined: 6 DC + 12 DC (damage doubling rule) => 12 DC
                        assert.equal(getEffectFormulaFromItem(bigSwordItem, {}), "4d6");
                    });

                    it("should add strength for the Little Sword HKA", function () {
                        // Base: Little Sword 1d6+1K (4 DC) => 4 DC
                        // Added: 25 STR (5 DC)) => 5 DC
                        // Combined: 4 DC + 5 DC (damage doubling rule) => 8 DC
                        assert.equal(getEffectFormulaFromItem(littleSwordItem, { effectivestr: 25 }), "2½d6");
                    });
                });
            });
        },

        { displayName: "HERO: Full Character Tests" },
    );
}
