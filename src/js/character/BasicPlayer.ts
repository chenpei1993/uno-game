import {Drawable} from "../ui/Drawable";
import {Card} from "./Card";
import {Player} from "./Player";
import {Clickable} from "../ui/Clickable";
import {Dealer} from "./Dealer";
import {UnoColorType} from "../const/UnoColorType";
import {UnoChooseType} from "../const/UnoChooseType";

export abstract class BasicPlayer implements Drawable, Clickable, Player{
    protected dealer: Dealer
    protected holdCards: Card[]
    protected width: number
    protected height: number
    protected name: string
    constructor(name: string, width: number, height: number, dealer: Dealer) {
        this.holdCards = new Array<Card>()
        this.width = width
        this.height = height
        this.dealer = dealer
        this.name = name
    }

    draw(ctx: CanvasRenderingContext2D): void {
        throw new Error("unsupported func")
    }

    reset() {
        this.holdCards = new Array<Card>()
    }

    getACard(card: Card): boolean{
        this.holdCards.push(card)
        return true
    }

    getCards(cards: Card[]): boolean{
        this.holdCards = this.holdCards.concat(cards)
        return true
    }

    giveACard(): Card{
        return null
    }

    getHoldCardNum(): number{
        return this.holdCards.length
    }


    click(x: number, y: number){
        throw new Error("unsupported func")
    }

    getInfoFromDeal(cards: Card[]): void {

    }

    getName(): string {
        return this.name
    }

    myTurn(type: UnoChooseType): void {
    }

    uno(): void{
        if(this.holdCards.length == 1){
            this.dealer.getAMessage(this.name + " Uno!");
        }
    }

    isRobot() {
        return false;
    }
}