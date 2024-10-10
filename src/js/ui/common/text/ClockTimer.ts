import {Drawable} from "../../Drawable";
import {Point} from "../Point";
import {System} from "../../../System";

export class ClockTimer implements Drawable{

    private pos: Point
    private ox: number
    private oy: number
    private time: number
    private expireTime: number
    private option: any

    constructor(pos: Point, expireTime: number, option ?: any) {
        this.pos = pos
        this.option = option ?? {
            font: '24px',
            color: '#000',
            textColor: '#000',
            radius: 10
        }
        this.time = System.getTime()
        this.expireTime = expireTime

    }

    draw(ctx: CanvasRenderingContext2D): void {
        let t = this.expireTime - Math.floor((System.getTime() - this.time) / 1000)
        let text = String(t)
        ctx.save()
        ctx.font = this.option.font
        let textBox = ctx.measureText(text)
        this.ox = this.pos.x - textBox.width / 2
        let h = textBox.actualBoundingBoxDescent + textBox.actualBoundingBoxAscent
        this.oy = this.pos.y - h / 2
        ctx.beginPath()
        ctx.strokeStyle = this.option.color
        ctx.arc(this.ox , this.oy, this.option.radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.closePath()
        ctx.fillStyle = this.option.textColor
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(t), this.ox , this.oy)
        ctx.restore()
    }


    public isLive(): boolean {
        let t = this.expireTime - Math.floor((System.getTime() - this.time) / 1000)
        return t > 0
    }

}