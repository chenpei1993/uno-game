import {AI} from "./AI";
import {Card} from "../item/Card";
import {UnoCardType} from "../const/UnoCardType";

export class SimpleAI implements AI{

    private usedCard: Card[]

    constructor() {
        this.usedCard = []
    }

    get(cards: Card[]): void {
        this.usedCard = this.usedCard.concat(cards)
    }

    play(cards: Card[]): Card[] {

        let preCard = this.usedCard[this.usedCard.length - 1]
        let card = null
        //优先选择相同颜色的
        for(let i = 0; i < cards.length; i++){
            if(preCard.getColor() === cards[i].getColor()){
                card = cards[i]
                cards.splice(i, 1)
                return [card]
            }
        }

        for(let i = 0; i < cards.length; i++){
            if(preCard.getName() === cards[i].getName()){
                card = cards[i]
                cards.splice(i, 1)
                return [card]
            }
        }

        for(let i = 0; i < cards.length; i++){
            if(cards[i].getType() === UnoCardType.Wild || cards[i].getType() === UnoCardType.Wild_Draw){
                card = cards[i]
                cards.splice(i, 1)
                return [card]
            }
        }
        return [];
    }

}