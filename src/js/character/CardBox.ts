import {Card} from "./Card";
import {UnoColorType} from "../const/UnoColorType";
import {UnoCardType} from "../const/UnoCardType";
import {Container} from "../Container";

export class CardBox{
    private readonly cards: Card[]
    private readonly container: Container
    private readonly prefix: string
    private readonly cardWidth: number
    private readonly cardHeight: number

    private cardNames: string[] = [
        "Blue_0",
        "Blue_Draw","Blue_Reverse","Blue_Skip",
        "Blue_Draw","Blue_Reverse","Blue_Skip",
        "Blue_1","Blue_2","Blue_3","Blue_4","Blue_5","Blue_6","Blue_7","Blue_8","Blue_9",
        "Blue_1","Blue_2","Blue_3","Blue_4","Blue_5","Blue_6","Blue_7","Blue_8","Blue_9",
        "Red_0",
        "Red_Draw","Red_Reverse","Red_Skip",
        "Red_Draw","Red_Reverse","Red_Skip",
        "Red_1","Red_2","Red_3","Red_4","Red_5","Red_6","Red_7","Red_8","Red_9",
        "Red_1","Red_2","Red_3","Red_4","Red_5","Red_6","Red_7","Red_8","Red_9",
        "Yellow_0",
        "Yellow_Draw","Yellow_Reverse","Yellow_Skip",
        "Yellow_Draw","Yellow_Reverse","Yellow_Skip",
        "Yellow_1","Yellow_2","Yellow_3","Yellow_4","Yellow_5","Yellow_6","Yellow_7","Yellow_8","Yellow_9",
        "Yellow_1","Yellow_2","Yellow_3","Yellow_4","Yellow_5","Yellow_6","Yellow_7","Yellow_8","Yellow_9",
        "Green_0",
        "Green_Draw","Green_Reverse","Green_Skip",
        "Green_Draw","Green_Reverse","Green_Skip",
        "Green_1","Green_2","Green_3","Green_4","Green_5","Green_6","Green_7","Green_8","Green_9",
        "Green_1","Green_2","Green_3","Green_4","Green_5","Green_6","Green_7","Green_8","Green_9",
        "Wild_Color","Wild_Draw",
        "Wild_Color","Wild_Draw",
        "Wild_Color","Wild_Draw",
        "Wild_Color","Wild_Draw"
    ]

    constructor(container: Container, cardWidth: number, cardHeight: number) {
        this.container = container
        this.cards = new Array<Card>()
        this.prefix = "card/"
        this.cardWidth = cardWidth
        this.cardHeight = cardHeight
        for(let cardName of this.cardNames){
            let info = cardName.split("_")
            let color = UnoColorType.Wild
            if(info[0] === "Yellow"){
                color = UnoColorType.Yellow
            }else if(info[0] === "Blue"){
                color = UnoColorType.Blue
            }else if(info[0] === "Green"){
                color = UnoColorType.Green
            }else if(info[0] === "Red"){
                color = UnoColorType.Red
            }

            let name = ""
            let type = UnoCardType.Number
            if(color === UnoColorType.Wild){
                if(info[1] === "color"){
                    type = UnoCardType.Wild
                }else{
                    type = UnoCardType.Wild_Draw
                }
            } else if(info[1] === "Color"){
                type = UnoCardType.Color
            }else if(info[1] === "Reverse"){
                type = UnoCardType.Reverse
            }else if(info[1] === "Draw"){
                type = UnoCardType.Draw
            }else if(info[1] === "Skip"){
                type = UnoCardType.Skip
            }else if(info[1] != ""){
                name = info[1]
            }
            let img = this.container.getImage(this.prefix + cardName)
            let backImg = this.container.getImage("Deck")
            let card = new Card(name, type, color, img, backImg, cardWidth, cardHeight)
            this.cards.push(card)
        }
    }

    getCards(): Card[]{
        return this.cards
    }

    getCardHeight() : number{
        return this.cardHeight
    }

    getCardWidth() : number{
        return this.cardWidth
    }

}