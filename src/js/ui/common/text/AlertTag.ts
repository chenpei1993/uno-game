import {Point} from "../Point";
import {Drawable} from "../../../Drawable";
import {System} from "../../../System";

export class AlertTag implements Drawable{

    private pos: Point
    private text: string
    private time: number
    private option: any

    constructor(pos: Point, text: string, option ?: any) {
        this.pos = pos
        this.text = text
        this.option = option ?? {
            width: 100,
            height: 30,
            font: '24px',
            color: '#000',
            textColor: '#000',
            radius: 0,
            expiredTime: 3600
        }
        this.time = System.getTime()

    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.pos.x = this.pos.x - this.option.width / 2
        ctx.save()
        ctx.fillStyle = this.option.color
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
        ctx.fill()
        ctx.font = this.option.font
        let textBox = ctx.measureText(this.text)
        let x = this.pos.x + this.option.width / 2 - textBox.width / 2
        let h = textBox.actualBoundingBoxDescent + textBox.actualBoundingBoxAscent
        let y = this.pos.y + this.option.height / 2 + h / 2
        ctx.fillStyle = this.option.textColor
        ctx.fillText(this.text, x, y)
        ctx.restore()
    }


    public isLive(): boolean {
        let t = System.getTime() - this.time
        return this.option.expiredTime > t
    }

    public setPos(pos: Point): void{
        this.pos = pos
    }

    public getHeight(): number{
        return this.option.height
    }

}