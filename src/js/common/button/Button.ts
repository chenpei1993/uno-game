import {Drawable} from "../../Drawable";

export interface Button<T> extends Drawable{
    click():void

    setConfig<Key extends keyof T>(key: Key, value: T[Key]): void
}