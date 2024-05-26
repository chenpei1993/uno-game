import {Point} from "./Point";
import {Drawable} from "../Drawable";
import {Clickable} from "../Clickable";

export interface Item extends Drawable, Clickable{
    getPosition(): Point
    setPosition(pos: Point): void
    getWidth(): number
    getHeight(): number
}