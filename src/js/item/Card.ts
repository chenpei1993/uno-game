import {Drawable} from "../Drawable";
import {UnoCardType} from "../const/UnoCardType";
import {UnoColorType} from "../const/UnoColorType";

export class Card {
    private name: string
    private type: UnoCardType
    private color: UnoColorType
    private img: HTMLImageElement
    private width: number
    private height: number

    constructor(name: string, type: UnoCardType, color: UnoColorType, img: HTMLImageElement, width: number, height: number) {
        this.name = name
        this.type = type
        this.color = color
        this.img = img
        this.width = width
        this.height = height
    }

    getImage(){
        return this.img
    }

    getWidth(): number{
        return this.width
    }

    getHeight(): number{
        return this.height
    }

    getType(): UnoCardType{
        return this.type;
    }

    getColor(): UnoColorType{
        return this.color;
    }

    getName(): string {
        return this.name
    }

}