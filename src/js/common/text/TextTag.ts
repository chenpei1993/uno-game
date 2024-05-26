import {Point} from "../Point";
import {Drawable} from "../../Drawable";
import {Item} from "../Item";

export class TextTag implements Item{

    private pos: Point
    private text: string
    private font: string
    private color: string

    constructor(pos: Point, text: string, color: string, font: string) {
        this.pos = pos
        this.text = text
        this.color = color ?? "#000"
        this.font = font ?? "18px serif"
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.font = this.font
        let box = ctx.measureText(this.text)
        let x = this.pos.x - box.width / 2
        ctx.fillText(this.text, x, this.pos.y)
        ctx.restore()
    }

    getHeight(): number {
        return 100
    }

    getPosition(): Point {
        return this.pos;
    }

    getWidth(): number {
        //TODO
        return 100
    }

    setPosition(pos: Point): void {
        this.pos = pos
    }

    click(x: number, y: number): void {
    }

}