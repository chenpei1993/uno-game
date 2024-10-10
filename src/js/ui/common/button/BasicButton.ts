import {Button} from "./Button";
import {Point} from "../Point";
import {ButtonOption} from "./option/ButtonOption";

export abstract class BasicButton implements Button<ButtonOption>{
    protected pos: Point
    protected option: ButtonOption
    protected userOption: ButtonOption

    protected constructor(pos: Point, option: ButtonOption) {
        this.pos = pos
        this.userOption = option
    }

    updateConfig(){
        let key: keyof ButtonOption
        for(key in this.option){
            this.setConfig(key, this.userOption[key] ?? this.option[key]);
        }
    }

    setDefaultOption(option: ButtonOption){
        this.option = option
    }

    setConfig<Key extends keyof ButtonOption>(key: Key, value: ButtonOption[Key]): void {
        this.option[key] = value
    }

    abstract draw(ctx: CanvasRenderingContext2D): void

    click(x: number, y: number): void {
        if(this.pos && this.pos.x && this.pos.y && this.option.width && this.option.height){
            if(this.pos.x < x && x < this.pos.x + this.option.width
                && this.pos.y < y && y < this.pos.y + this.option.height){
                if(this.option.func){
                    this.option.func(null)
                }
            }
        }
    }

    getPosition(): Point {
        return this.pos;
    }

    getHeight(): number {
        return this.option.height
    }

    getWidth(): number {
        return this.option.width
    }

    setPosition(pos: Point): void {
        this.pos = pos
    }

}
