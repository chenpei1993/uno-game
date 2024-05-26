import {Item} from "../Item";
import {Point} from "../Point";
import {PanelOption} from "./PanelOption";
import {Clickable} from "../../Clickable";

export class Panel implements Item{

    private pos: Point
    private option: PanelOption
    private interval: number = 10
    private offset: number = 10
    private width: number = 0
    private height: number = 0

    constructor(pos: Point, option: PanelOption) {
        this.pos = pos
        this.option = option
        this.init()
    }

    private init(){
        let width = 0
        let height = 0
        if(this.option.title){
            this.width = Math.max(this.width , this.option.title.getWidth())
            this.height += this.option.title.getHeight() + this.offset
        }
        if(this.option.body){
            this.width = Math.max(this.width, this.option.body.getWidth())
            this.height += this.option.body.getHeight() + this.offset
        }

        if(this.option.footer){
            this.width = Math.max(this.width, this.option.footer.getWidth())
            this.height += this.option.footer.getHeight() + this.offset
        }

        let h = this.offset
        if(this.option.title){
            //TextTag设计的有问题
            this.option.title.setPosition(new Point(this.pos.x + this.width / 2, this.pos.y + h))
            h += this.option.title.getHeight() + this.offset
        }

        if(this.option.body){
            this.option.body.setPosition(new Point(this.pos.x, this.pos.y + h))
            h += this.option.body.getHeight() + this.offset
        }

        if(this.option.footer){
            this.option.footer.setPosition(new Point(this.pos.x, this.pos.y + h))
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.beginPath()
        ctx.rect(this.pos.x, this.pos.y, this.width, this.height)
        ctx.closePath()
        ctx.stroke()
        if(this.option.title){
            this.option.title.draw(ctx)
        }
        if(this.option.body){
            this.option.body.draw(ctx)
        }
        if(this.option.footer){
            this.option.footer.draw(ctx)
        }

        ctx.restore()
    }

    getHeight(): number {
        return 0;
    }

    getPosition(): Point {
        return undefined;
    }

    getWidth(): number {
        return 0;
    }

    setPosition(pos: Point): void {
        this.pos = pos
    }

    click(x: number, y: number): void {
        if(this.option.title){
            this.option.title.click(x, y)
        }
        if(this.option.body){
            this.option.body.click(x, y)
        }
        if(this.option.footer){
            this.option.footer.click(x, y)
        }
    }

}