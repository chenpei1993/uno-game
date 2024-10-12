import {BasicPlayer} from "./BasicPlayer";
import {AI} from "../strategy/AI";
import {Dealer} from "./Dealer";
import {Card} from "./Card";
import {UnoChooseType} from "../const/UnoChooseType";

export class RobotPlayer extends BasicPlayer{
    private ai: AI
    private chosenCardIdx: number
    protected interval: number

    constructor(name: string,width: number, height: number, dealer: Dealer, ai: AI) {
        super(name, width, height, dealer)
        this.ai = ai
        this.chosenCardIdx = null
        this.interval =  Math.max(20, Math.min(this.dealer.getCardWidth() / 2, 40))
    }

    giveACard(): Card{
        let idx = this.ai.play(this.holdCards)
        if(idx.length > 0){
            this.chosenCardIdx = idx[0]
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

    myTurn(type: UnoChooseType) {

        if(type === UnoChooseType.Card){
            this.chooseCard()
        }else if (type === UnoChooseType.Color){
            this.chooseColor()
        }else{
            throw  new Error("unknown choose type")
        }
    }

    chooseCard(): void{
        let random = 5000
        setTimeout(e => {
            let card = this.giveACard()
            let res = this.dealer.getACard(card, this)
            if(!res){
                this.getCards(this.dealer.givePunishCard())
            }else if(this.chosenCardIdx != null){
                this.holdCards.splice(this.chosenCardIdx, 1)
            }
            this.uno()
        }, random)
    }

    chooseColor(): void {
        let random = 5000
        setTimeout(e => {
            let color = this.ai.choose(this.holdCards)
            this.dealer.handleChosenColor(color)
        }, random)
    }

    isRobot(): boolean {
        return true
    }
}