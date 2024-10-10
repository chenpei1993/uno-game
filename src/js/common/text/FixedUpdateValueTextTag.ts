import {Point} from "../Point";
import {Drawable} from "../../Drawable";
import {Item} from "../Item";
import {TextTag} from "./TextTag";

export class FixedUpdateValueTextTag extends TextTag{


    constructor(pos: Point, text: string, color: string, font: string, width: number = 100, height: number = 100, func: ()=>string, sec: number) {
        super(pos, text, color, font, width, height)
        this.updateValue(func, sec)
    }

    updateValue(func: ()=>string, sec: number){
        setInterval(() => {
            this.text = func()
        }, sec)
    }
}