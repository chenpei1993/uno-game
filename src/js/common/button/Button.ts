import {Drawable} from "../../Drawable";
import {Clickable} from "../../Clickable";

export interface Button<T> extends Drawable, Clickable{
    setConfig<Key extends keyof T>(key: Key, value: T[Key]): void
}