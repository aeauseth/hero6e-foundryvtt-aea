import { HeroSystem6eCard } from "./card.mjs";
import { HeroSystem6eAttackCard } from "./attack-card.mjs";
import { HeroSystem6eToHitCard } from "./toHit-card.mjs";
import * as Attack from "../item/item-attack.mjs";

export class HeroSystem6eCardHelpers {
    static onMessageRendered(html) {
        HeroSystem6eAttackCard.onMessageRendered(html);
        HeroSystem6eToHitCard.onMessageRendered(html);
        Attack.onMessageRendered(html);
    }

    static chatListeners(html) {
        HeroSystem6eCard.chatListeners(html);
        HeroSystem6eAttackCard.chatListeners(html);
        HeroSystem6eToHitCard.chatListeners(html);
        Attack.chatListeners(html);
    }
}
