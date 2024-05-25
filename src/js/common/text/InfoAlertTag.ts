import {Drawable} from "../../Drawable";
import {Point} from "../Point";
import {System} from "../../System";
import {AlertManager} from "./AlertManager";
import {AlertTag} from "./AlertTag";

export class InfoAlertTag extends AlertTag{

    constructor(pos: Point, text: string) {
        super(pos, text, {
            width: 100,
            height: 30,
            font: '24px',
            color: '#909399',
            textColor: '#fff',
            radius: 0,
            expiredTime: 1000
        })

    }


}