import {Button} from "./Button";
import {Point} from "../Point";
import {ButtonOption} from "./option/ButtonOption";

export abstract class BasicButton<T> implements Button<T>{
    protected pos: Point
    protected option: T
    protected userOption: T

    protected constructor(pos: Point, option: T) {
        this.pos = pos
        this.userOption = option
    }

    updateConfig(){
        let key: keyof T
        for(key in this.option){
            this.setConfig(key, this.userOption[key] ?? this.option[key]);
        }
    }

    setDefaultOption(option: T){
        this.option = option
    }

    setConfig<Key extends keyof T>(key: Key, value: T[Key]): void {
        this.option[key] = value
    }

    draw(ctx: CanvasRenderingContext2D): void {
        throw new Error("implement this method")
    }

    click(x: number, y: number, func: () => void): void {
        throw new Error("implement this method")
    }

}