import {Point} from "../Point";
import {Drawable} from "../../Drawable";
import {SelectOption} from "./SelectOption";
import {Clickable} from "../../Clickable";

export class Select implements Drawable, Clickable{

    private pos: Point
    private w: number
    private h: number
    private angle: number
    private radius: number
    private close: boolean
    private options: SelectOption[]
    private value: SelectOption
    private func: (value: any)=>void

    constructor(pos: Point, options: SelectOption[], value: SelectOption, func: (value: any)=>void){
        this.pos = pos
        this.w = 150
        this.radius = 10
        this.h = 30
        this.close = true
        this.options = options
        this.value = value
        this.pos.y = this.pos.y - this.h / 2
        this.func = func
    }

    draw(ctx: CanvasRenderingContext2D):void {
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(this.pos.x, this.pos.y + this.radius)
        ctx.bezierCurveTo(this.pos.x, this.pos.y + this.radius, this.pos.x, this.pos.y, 
            this.pos.x + this.radius, this.pos.y)
        ctx.lineTo(this.pos.x + this.w - this.radius, this.pos.y)
        ctx.bezierCurveTo(this.pos.x + this.w - this.radius, this.pos.y, this.pos.x + this.w, this.pos.y, 
            this.pos.x + this.w, this.pos.y + this.radius)
        ctx.lineTo(this.pos.x + this.w, this.pos.y + this.h - this.radius)
        ctx.bezierCurveTo(this.pos.x + this.w, this.pos.y + this.h - this.radius, this.pos.x + this.w, this.pos.y + this.h, 
            this.pos.x + this.w - this.radius, this.pos.y + this.h)
        ctx.lineTo(this.pos.x + this.radius, this.pos.y + this.h)
        ctx.bezierCurveTo(this.pos.x + this.radius, this.pos.y + this.h, this.pos.x, this.pos.y + this.h, 
            this.pos.x, this.pos.y + this.h - this.radius)
        ctx.lineTo(this.pos.x, this.pos.y + this.radius)
        ctx.closePath()
        ctx.stroke()

        if(this.close){
            this.drawDown(ctx)
        }else{
            this.drawUp(ctx)
            this.drawOptions(ctx)
        }

        if(this.value){
            let t = ctx.measureText(this.value.getLabel())
            let height = t.fontBoundingBoxAscent + t.fontBoundingBoxDescent
            let diff = t.fontBoundingBoxAscent + t.fontBoundingBoxDescent - t.actualBoundingBoxAscent + t.actualBoundingBoxDescent
            ctx.strokeText(this.value.getLabel(), this.pos.x + 10, this.pos.y + this.h / 2 + height / 2 - diff / 2)
        }

        ctx.restore()
    }

    private drawUp(ctx: CanvasRenderingContext2D){
        let n = 5
        ctx.moveTo(this.pos.x + this.w - n * 3, this.h / 2 + this.pos.y + n)
        ctx.lineTo(this.pos.x + this.w - n * 2, this.h / 2 + this.pos.y - n)
        ctx.lineTo(this.pos.x + this.w - n, this.h / 2 + this.pos.y + n)
        ctx.stroke()
    }

    private drawDown(ctx: CanvasRenderingContext2D){
        let n = 5
        ctx.moveTo(this.pos.x + this.w - n * 3, this.h / 2 + this.pos.y - n)
        ctx.lineTo(this.pos.x + this.w - n *2, this.h / 2 + this.pos.y + n)
        ctx.lineTo(this.pos.x + this.w - n, this.h / 2 + this.pos.y - n)
        ctx.stroke()
    }

    private drawOptions(ctx: CanvasRenderingContext2D){
        let padding = 5
        let margin = 2
        let x = this.pos.x
        let t = ctx.measureText(this.options[0].getLabel())
        let height = t.fontBoundingBoxAscent + t.fontBoundingBoxDescent
        let diff = t.fontBoundingBoxAscent + t.fontBoundingBoxDescent - t.actualBoundingBoxAscent + t.actualBoundingBoxDescent
        for(let i = 0; i < this.options.length; i++){
            let y = this.pos.y + this.h + (height + 2 * padding + margin * 2) * (i + 1)
            this.options[i].setPosition(x, y - height - padding, this.w, height + padding * 2)
            ctx.strokeRect(x, y - height - padding, this.w, height + padding * 2)
            ctx.strokeText(this.options[i].getLabel(), x + padding, y - diff / 2)
        }
    }

    click(x: number, y: number): void {
        if(this.pos && this.pos.x && this.pos.y && this.w && this.h){
            if(this.pos.x < x && x < this.pos.x + this.w
                && this.pos.y < y && y < this.pos.y + this.h){
                this.close = !this.close
            }
        }

        if(this.options){
            for(let op of this.options){
                let res = op.click(x, y)
                if(res){
                    this.value = op
                    this.close = true
                    if(this.func){
                        this.func(this.value)
                    }
                    break
                }
            }
        }
    }
    
}