import {Point} from "../Point";
import {AlertTag} from "./AlertTag";

export class WarningAlertTag extends AlertTag{

    constructor(pos: Point, text: string) {
        super(pos, text, {
            width: 100,
            height: 30,
            font: '24px',
            color: '#E6A23C',
            textColor: '#fff',
            radius: 0,
            expiredTime: 1000
        })

    }


}