import {Container} from "../../Container";
import {GameSetting} from "../../GameSetting";
import {TextTag} from "../common/text/TextTag";
import {Point} from "../common/Point";
import {SliderButton} from "../common/button/SliderButton";

export class Loading{

    static draw(ctx: CanvasRenderingContext2D, container: Container, message: string, percent: number): void {
        ctx.save()
        let gradient = ctx.createRadialGradient(container.getWidth() / 2, container.getHeight() / 2, 1,
        container.getWidth() / 2 + 10, container.getHeight() / 2 + 10, container.getWidth() / 1.5);
        gradient.addColorStop(0, "#406A4B");
        gradient.addColorStop(1, "#000");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, container.getWidth(), container.getHeight())

        let title = new TextTag(new Point(container.getWidth() / 2, 250), "Uno", null, "100px serif")
        title.draw(ctx)

        let x = container.getWidth() / 3
        let msg = new TextTag(new Point(x, 520), message, null, "14px serif", 100, 100, false)
        msg.draw(ctx)

        let width = container.getWidth() / 3
        let process = new SliderButton(new Point(x, 550), true, {
            width: width,
            color: "rgba(0, 0, 0, .5)",
        })
        process.setPercent(percent)
        process.draw(ctx)
        ctx.restore()
    }
}