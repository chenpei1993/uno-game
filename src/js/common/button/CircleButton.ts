import {Button} from "./Button";
import {Point} from "../Point";
import {ButtonOption} from "./option/ButtonOption";
import {BasicButton} from "./BasicButton";

export class CircleButton extends BasicButton{
    private ox: number
    private oy: number
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
            func: () => {}
        })
        this.updateConfig()
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()

        ctx.font = this.option.font
        let textBox = ctx.measureText(this.option.text)
        this.ox = this.pos.x + this.option.width / 2 - textBox.width / 2
        let h = textBox.actualBoundingBoxDescent + textBox.actualBoundingBoxAscent
        this.oy = this.pos.y + this.option.height / 2 - h / 2
        ctx.beginPath()
        ctx.strokeStyle = this.option.color
        ctx.arc(this.ox, this.oy, this.option.radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.closePath()

        ctx.fillStyle = this.option.textColor
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.option.text, this.ox, this.oy)
        ctx.restore()
    }
}