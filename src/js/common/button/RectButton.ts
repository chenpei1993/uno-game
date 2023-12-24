import {Button} from "./Button";
import {Point} from "../Point";
import {ButtonOption} from "./option/ButtonOption";
import {BasicButton} from "./BasicButton";

export class RectButton extends BasicButton<ButtonOption>{

    constructor(pos: Point, option: ButtonOption) {
        super(pos, option)
        this.setDefaultOption({
            width: 100,
            height: 30,
            text: '',
            font: '24px',
            color: '#000',
            textColor: '#000',
        })
        this.updateConfig()
        console.log(this.option)
        console.log(this.userOption)
    }

    click(): void {
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.strokeStyle = this.option.color
        ctx.strokeRect(this.pos.x, this.pos.y, this.option.width, this.option.height)
        ctx.font = this.option.font
        let textBox = ctx.measureText(this.option.text)
        let x = this.pos.x + this.option.width / 2 - textBox.width / 2
        let h = textBox.actualBoundingBoxDescent + textBox.actualBoundingBoxAscent
        let y = this.pos.y + this.option.height / 2 + h / 2
        ctx.fillText(this.option.text, x, y)
        ctx.restore()
    }


}