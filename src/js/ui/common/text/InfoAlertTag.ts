import {Point} from "../Point";
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