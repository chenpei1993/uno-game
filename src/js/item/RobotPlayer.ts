import {BasicPlayer} from "./BasicPlayer";
import {AI} from "../strategy/AI";
import {Dealer} from "./Dealer";
import {Card} from "./Card";

export class RobotPlayer extends BasicPlayer{
    private ai: AI
    private chosenCardIdx: number

    constructor(name: string,width: number, height: number, dealer: Dealer, ai: AI) {
        super(name, width, height, dealer)
        this.ai = ai
        this.chosenCardIdx = null
    }

    giveACard(): Card{
        let idx = this.ai.play(this.holdCards)
        if(idx.length > 0){
            this.chosenCardIdx = idx[0]
            console.log(this.holdCards[this.chosenCardIdx])
            return this.holdCards[this.chosenCardIdx]
        }else{
            return null
        }

    }

    getInfoFromDeal(cards: Card[]): void{
        if(cards.length > 0){
            this.ai.get(cards)
        }
    }

    myTurn() {
        let random = 5000
        console.log("myturn " + this.name)
        setTimeout(e => {
            let card = this.giveACard()
            let res = this.dealer.getACard(card, this)
            console.log("robot ai " + this.name + " " + res)
            if(!res){
                this.getCards(this.dealer.givePunishCard())
            }else if(this.chosenCardIdx != null){
                this.holdCards.splice(this.chosenCardIdx, 1)
            }
            this.uno()
        }, random)
    }
}