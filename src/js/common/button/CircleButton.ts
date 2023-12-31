import {Button} from "./Button";
import {Point} from "../Point";
import {ButtonOption} from "./option/ButtonOption";
import {BasicButton} from "./BasicButton";

export class CircleButton extends BasicButton<ButtonOption>{

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

        ctx.font = this.option.font
        let textBox = ctx.measureText(this.option.text)
        let x = this.pos.x + this.option.width / 2 - textBox.width / 2
        let h = textBox.actualBoundingBoxDescent + textBox.actualBoundingBoxAscent
        let y = this.pos.y + this.option.height / 2 - h / 2
        ctx.beginPath()
        ctx.strokeStyle = this.option.color
        ctx.arc(x, y, this.option.radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.closePath()

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.option.text, x, y)
        ctx.restore()
    }



    click(x: number, y: number): void {

    }


}