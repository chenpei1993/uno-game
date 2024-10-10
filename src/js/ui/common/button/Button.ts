import {Item} from "../Item";

export interface Button<T> extends Item{
    setConfig<Key extends keyof T>(key: Key, value: T[Key]): void
}