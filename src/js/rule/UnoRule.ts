import {Rule} from "./Rule";
import {Card} from "../item/Card";
import {UnoRuleType} from "../const/UnoRuleType";
import {UnoCardType} from "../const/UnoCardType";
import {UnoColorType} from "../const/UnoColorType";

export class UnoRule implements Rule{
    check(cards: Card[], lastCards: Card[]): number {
        let card = cards[cards.length - 1]
        console.log(card)
        if(!card){
            return UnoRuleType.error
        }

        //比赛刚开始的时候
        if(lastCards.length == 0){
            return this.getSpecificType(card)
        }

        //比赛进行中
        let lastCard = lastCards[lastCards.length - 1]
        //如果存在同样颜色
        if(card.getColor() == lastCard.getColor()){
            return this.getSpecificType(card)
        }

        //如果存在同样数字
        if(card.getName() !== '' && card.getName() == lastCard.getName()){
            return this.getSpecificType(card)
        }

        if(card.getColor() == UnoColorType.Wild){
            return this.getSpecificType(card)
        }

        return UnoRuleType.error
    }

    private getSpecificType(card: Card){
        if(card.getType() == UnoCardType.Skip){
            return UnoRuleType.skip
        }else if(card.getType() == UnoCardType.Draw){
            return UnoRuleType.addPunishCard
        }else if(card.getType() == UnoCardType.Reverse){
            return UnoRuleType.reverse
        }else if(card.getType() == UnoCardType.Wild){
            return UnoRuleType.choose
        }else if(card.getType() == UnoCardType.Wild_Draw){
            return UnoRuleType.choose_punish
        }
        return UnoRuleType.ok

    }

}