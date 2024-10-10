import {Point} from "../Point";
import {Drawable} from "../../../Drawable";
import {Item} from "../Item";

export class TextTag implements Item{

    protected pos: Point
    protected text: string
    protected font: string
    protected color: string
    protected width: number
    protected height: number

    constructor(pos: Point, text: string, color: string, font: string, width: number = 100, height: number = 100) {
        this.pos = pos
        this.text = text
        this.color = color ?? "#000"
        this.font = font ?? "18px serif"
        this.width = width
        this.height = height
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.font = this.font
        let box = ctx.measureText(this.text)
        let x = this.pos.x - box.width / 2
        let y = this.pos.y + box.fontBoundingBoxDescent
        ctx.fillStyle = this.color
        ctx.fillText(this.text, x, y)
        ctx.restore()
    }

    getHeight(): number {
        return this.height
    }

    getPosition(): Point {
        return this.pos;
    }

    getWidth(): number {
        return this.width
    }

    setPosition(pos: Point): void {
        this.pos = pos
    }

    click(x: number, y: number): void {
    }

}