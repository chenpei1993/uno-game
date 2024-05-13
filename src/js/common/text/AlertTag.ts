import {Drawable} from "../../Drawable";
import {Point} from "../Point";

export class AlertTag implements Drawable{

    private text: string
    private color: string
    private expiredTime: number
    private time: number

    constructor(text: string, color ?: string, expiredTime ?: number) {
        this.text = text
        this.color = color ?? "#000"
        this.expiredTime = expiredTime ?? 3600
        this.time = 0
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // ctx.save()
        // ctx.font = this.font
        // let box = ctx.measureText(this.text)
        // let x = this.pos.x - box.width / 2
        // ctx.fillText(this.text, x, this.pos.y)
        // ctx.restore()
    }

    addTime(){
        this.time++
    }

}