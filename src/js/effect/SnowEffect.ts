import {Drawable} from "../Drawable";
import {Point} from "../common/Point";
import {System} from "../System";

export class Snow implements Drawable{
    private pos: Point
    private g: number
    private radius: number

    constructor(pos: Point, g: number, radius: number) {
        this.pos = pos
        this.g = g
        this.radius = radius
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let delta = System.getDeltaTime()
        this.pos.y = this.pos.y + this.g * delta
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = "#fff"
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
    private maxR: number
    private num: number
    private snows: Snow[]

    constructor(width: number, height: number, num: number, maxG: number, maxR: number) {
        this.width = width
        this.height = height
        this.maxG = maxG
        this.maxR = maxR
        this.num = num
        this.snows = new Array<Snow>()
        for(let i = 0; i < this.num; i++){
            this.snows.push(this.createSnow())
        }
    }

    private createSnow(){
        let x = Math.ceil(Math.random() * this.width)
        let g = Math.ceil(Math.random() * this.maxG)
        let r = Math.ceil(Math.random() * this.maxR)
        return new Snow(new Point(x, 0), g, r)
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