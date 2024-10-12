import {AI} from "./AI";
import {Card} from "../character/Card";
import {UnoCardType} from "../const/UnoCardType";
import {randomColor, UnoColorType} from "../const/UnoColorType";

export class SimpleAI implements AI{

    private usedCard: Card[]

    constructor() {
        this.usedCard = []
    }

    get(cards: Card[]): void {
        this.usedCard = this.usedCard.concat(cards)
    }

    play(cards: Card[]): number[] {
        if(this.usedCard.length <= 0){
            return [this.mostCardOfSameColor(cards)]
        }

        let preCard = this.usedCard[this.usedCard.length - 1]
        let card = null
        //优先选择相同颜色的
        for(let i = 0; i < cards.length; i++){
            if(preCard.getColor() === cards[i].getColor()){
                return [i]
            }
        }

        for(let i = 0; i < cards.length; i++){
            if(preCard.getName() === cards[i].getName()){
                return [i]
            }
        }

        for(let i = 0; i < cards.length; i++){
            if(cards[i].getType() === UnoCardType.Wild || cards[i].getType() === UnoCardType.Wild_Draw){
                return [i]
            }
        }
        return [];
    }

    private mostCardOfSameColor(cards: Card[]): number{
        let map = new Map<UnoColorType, number>()
        for(let e of cards){
            if(map.has(e.getColor())){
                let n = map.get(e.getColor())
                map.set(e.getColor(), n + 1)
            }else{
                map.set(e.getColor(), 1)
            }
        }

        let n = 0
        let color = null
        for(let e of map){
            if(e[1] > n){
                color = e[0]
            }
        }

        for(let i = 0; i < cards.length; i++){
            if(cards[i].getColor() == color && cards[i].getType() == UnoCardType.Number){
                return i
            }
        }
    }

    choose(cards: Card[]): UnoColorType {
        let i = this.mostCardOfSameColor(cards)
        if(i){
            return cards[i].getColor()
        }

        return randomColor()
    }

}