import {Drawable} from "../../Drawable";
import {Clickable} from "../../Clickable";
import {Item} from "../Item";

export interface Button<T> extends Item, Clickable{
    setConfig<Key extends keyof T>(key: Key, value: T[Key]): void
}