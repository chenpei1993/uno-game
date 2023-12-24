import {Button} from "./Button";
import {Point} from "../Point";

export abstract class BasicButton<T> implements Button<T>{
    protected pos: Point
    protected option: T

    protected constructor(pos: Point, option: T) {
        this.pos = pos
        let key: keyof T
        for(key in this.option){
            this.setConfig(key, option[key] ?? this.option[key]);
        }
    }

    setConfig<Key extends keyof T>(key: Key, value: T[Key]): void {
        this.option[key] = value
    }

    click(): void {
        throw new Error("implement this method")
    }

    draw(ctx: CanvasRenderingContext2D): void {
        throw new Error("implement this method")
    }

}