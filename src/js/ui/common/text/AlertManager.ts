import {Drawable} from "../../../Drawable";
import {AlertTag} from "./AlertTag";
import {Point} from "../Point";
import {ErrorAlertTag} from "./ErrorAlertTag";
import {WarningAlertTag} from "./WarningAlertTag";
import {InfoAlertTag} from "./InfoAlertTag";

export class AlertManager implements Drawable{

    private alerts: AlertTag[]

    private interval: number = 5;
    private x: number

    constructor(x: number) {
        this.x = x
        this.alerts = []
    }

    public addError(text: string){
        this.alerts.push(new ErrorAlertTag(null, text));
    }

    public addWarning(text: string){
        this.alerts.push(new WarningAlertTag(null, text));
    }

    public addInfo(text: string){
        this.alerts.push(new  InfoAlertTag(null, text));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let h: number = this.interval
        for(let i = 0; i < this.alerts.length; i++){
            let alert = this.alerts[i]
            alert.setPos(new Point(this.x, h))
            alert.draw(ctx)
            h = h + alert.getHeight() + this.interval
        }
        this.alerts = this.alerts.filter(e => e.isLive())
    }
}