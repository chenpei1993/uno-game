import {Drawable} from "../../Drawable";
import {Point} from "../Point";
import {System} from "../../System";
import {AlertManager} from "./AlertManager";
import {AlertTag} from "./AlertTag";

export class ErrorAlertTag extends AlertTag{

    constructor(pos: Point, text: string) {
        super(pos, text, {
            width: 100,
            height: 30,
            font: '24px',
            color: '#F56C6C',
            textColor: '#fff',
            radius: 0,
            expiredTime: 1000
        })

    }


}