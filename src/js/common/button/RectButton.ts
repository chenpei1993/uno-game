import {Button} from "./Button";
import {Point} from "../Point";
import {ButtonOption} from "./option/ButtonOption";
import {BasicButton} from "./BasicButton";
import * as colorette from "colorette";

export class RectButton extends BasicButton{

    constructor(pos: Point, option: ButtonOption) {
        option = option ?? {}
        super(pos, option)
        this.setDefaultOption({
            width: 100,
            height: 30,
            text: '',
            font: '24px',
            color: '#000',
            textColor: '#000',
            backgroundColor: "#000",
            radius: 0,
            func: () => {},
        })
        this.updateConfig()
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        if(this.option.color){
            ctx.beginPath()
            ctx.strokeStyle = this.option.color
            ctx.strokeRect(this.pos.x, this.pos.y, this.option.width, this.option.height)
            ctx.closePath()
            ctx.stroke()
        }
        if(this.option.backgroundColor){
            ctx.beginPath()
            ctx.fillStyle = this.option.backgroundColor
            ctx.fillRect(this.pos.x, this.pos.y, this.option.width, this.option.height)
            ctx.closePath()
            ctx.fill()
        }
        if(this.option.text){
            ctx.font = this.option.font
            let textBox = ctx.measureText(this.option.text)
            let x = this.pos.x + this.option.width / 2 - textBox.width / 2
            let h = textBox.actualBoundingBoxDescent + textBox.actualBoundingBoxAscent
            let y = this.pos.y + this.option.height / 2 + h / 2
            ctx.fillText(this.option.text, x, y)
        }
        ctx.restore()
    }
}