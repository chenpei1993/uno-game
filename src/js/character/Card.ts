import {Drawable} from "../Drawable";
import {UnoCardType} from "../const/UnoCardType";
import {UnoColorType} from "../const/UnoColorType";

export class Card implements Drawable{
    private name: string
    private type: UnoCardType
    private color: UnoColorType

    constructor(name: string, type: UnoCardType, color: UnoColorType) {
        this.name = name
        this.type = type
        this.color = color
    }

    draw(ctx: CanvasRenderingContext2D): void {
    }



}