import {Drawable} from "../../Drawable";
import {Point} from "../common/Point";
import {System} from "../../System";

export class Snow implements Drawable{
    private pos: Point
    private g: number
    private radius: number
    private transparent: number

    constructor(pos: Point, g: number, radius: number, transparent: number) {
        this.pos = pos
        this.g = g
        this.radius = radius
        this.transparent = transparent
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let delta = System.getDeltaTime()
        this.pos.y = this.pos.y + this.g * delta
        ctx.save()
        ctx.beginPath()
        ctx.shadowColor = "#fff"
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.shadowBlur= 4
        ctx.fillStyle = `rgba(255,255,255, ${this.transparent})`
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

    getY(){
        return this.pos.y
    }
}
export class SnowEffect implements Drawable{

    private width: number
    private height: number
    private maxG: number
    private minG: number
    private maxR: number
    private num: number
    private snows: Snow[]

    constructor(width: number, height: number, num: number, maxG: number, maxR: number) {
        this.width = width
        this.height = height
        this.minG = 5
        this.maxG = Math.max(this.minG, maxG - this.minG)
        this.maxR = maxR
        this.num = num
        this.snows = new Array<Snow>()
        for(let i = 0; i < this.num; i++){
            this.snows.push(this.createSnow())
        }
    }

    private createSnow(){
        let x = Math.ceil(Math.random() * this.width)
        let g = Math.ceil(Math.random() * this.maxG) + this.minG
        let r = Math.ceil(Math.random() * this.maxR)
        let t = Math.random() * 0.6
        return new Snow(new Point(x, 0), g, r, t)
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let arr = new Array<Snow>()
        ctx.save()
        for(let i = 0; i < this.num; i++){
            let snow = this.snows[i]
            snow.draw(ctx)
            if(snow.getY() < this.height){
                arr.push(snow)
            }else {
                arr.push(this.createSnow())
            }
        }
        ctx.restore()
        this.snows = arr
    }



}