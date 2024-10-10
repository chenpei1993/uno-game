import {Point} from "../Point";
import {DivOption} from "./DivOption";
import {Item} from "../Item";
import {OrientType} from "./OrientType";

export class Div implements Item{

    private pos: Point
    private option: DivOption
    private offset: number = 10
    private items: Item[]

    constructor(pos: Point, option: DivOption) {
        this.pos = pos
        this.option = option
        this.items = []
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let x = this.pos.x + this.offset
        let y = this.pos.y + this.offset
        for(let i = 0; i < this.items.length; i++){
            let e = this.items[i]
            e.setPosition({x: x, y: y})
            e.draw(ctx)
            if(this.option.orientation == OrientType.horizon){
                x = x + e.getWidth() + this.offset
            }else{
                y = y + e.getWidth() + this.offset
            }
        }
    }

    addItem(item: Item){
        this.items.push(item)
    }

    getHeight(): number {
        if(this.option.orientation === OrientType.horizon){
            let height = 0
            for(let e of this.items){
                height = Math.max(e.getHeight() + this.offset)
            }
            return height + this.offset;
        }else{
            let height = this.offset
            for(let e of this.items){
                height += e.getHeight() + this.offset
            }
            return height;
        }
    }

    getPosition(): Point {
        return this.pos;
    }

    getWidth(): number {
        if(this.option.orientation === OrientType.horizon){
            let width = this.offset
            for(let e of this.items){
                width += e.getWidth() + this.offset
            }
            return width;
        }else{
            let width = 0
            for(let e of this.items){
                width = Math.max(e.getWidth() + this.offset)
            }
            return width + this.offset;
        }
    }

    setPosition(pos: Point): void {
        this.pos = pos
    }

    click(x: number, y: number): void {
        for(let e of this.items){
            e.click(x, y)
        }
    }

}