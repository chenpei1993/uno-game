import {Button} from "./Button";
import {Point} from "../Point";
import {ButtonOption} from "./option/ButtonOption";
import {BasicButton} from "./BasicButton";

export class RectRoundButton extends BasicButton<ButtonOption>{

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
            radius: 10,
        })
        this.updateConfig()
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.strokeStyle = this.option.color
        ctx.beginPath()
        ctx.moveTo(this.pos.x, this.pos.y + this.option.radius)
        ctx.lineTo(this.pos.x, this.pos.y + this.option.height - this.option.radius)
        ctx.quadraticCurveTo(this.pos.x, this.pos.y + this.option.height, this.pos.x + this.option.radius, this.pos.y + this.option.height)
        ctx.lineTo(this.pos.x + this.option.width - this.option.radius, this.pos.y + this.option.height)
        ctx.quadraticCurveTo(this.pos.x + this.option.width, this.pos.y + this.option.height, this.pos.x + this.option.width, this.pos.y + this.option.height - this.option.radius)
        ctx.lineTo(this.pos.x + this.option.width, this.pos.y + this.option.radius)
        ctx.quadraticCurveTo(this.pos.x + this.option.width, this.pos.y, this.pos.x + this.option.width - this.option.radius, this.pos.y)
        ctx.lineTo(this.pos.x + this.option.radius, this.pos.y)
        ctx.quadraticCurveTo(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.option.radius)
        ctx.closePath()
        ctx.stroke()
        ctx.font = this.option.font
        let textBox = ctx.measureText(this.option.text)
        let x = this.pos.x + this.option.width / 2 - textBox.width / 2
        let h = textBox.actualBoundingBoxDescent + textBox.actualBoundingBoxAscent
        let y = this.pos.y + this.option.height / 2 + h / 2
        ctx.fillText(this.option.text, x, y)
        ctx.restore()
    }



    click(x: number, y: number, func: () => void): void {
        if(this.pos.x < x && x < this.pos.x + this.option.width
             && this.pos.y < y && y < this.pos.y + this.option.height){
            if(func){
                func()
            }
        }
    }


}