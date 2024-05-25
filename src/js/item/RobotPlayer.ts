import {BasicPlayer} from "./BasicPlayer";
import {AI} from "../strategy/AI";
import {Dealer} from "./Dealer";
import {Card} from "./Card";

export class RobotPlayer extends BasicPlayer{
    private ai: AI

    constructor(name: string,width: number, height: number, dealer: Dealer, ai: AI) {
        super(name, width, height, dealer)
        this.ai = ai
    }

    giveACard(): Card{
        let cards = this.ai.play(this.holdCards)
        return cards[0]
    }

    getInfoFromDeal(cards: Card[]): void{
        if(cards.length > 0){
            this.ai.get(cards)
        }
    }

    myTurn() {
        let random = 1000
        setTimeout(e => {
            let card = this.giveACard()
            if(card === null){
                this.dealer.givePunishCard()
            }else{
                this.dealer.getACard(card, this)
            }
        }, random)
    }
}