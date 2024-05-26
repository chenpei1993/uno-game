import {Div} from "./Div";
import {Item} from "../Item";

export interface PanelOption{
    width ?: number,
    height ?: number,
    title ?: Item,
    body ?: Item,
    footer ?: Item,
}