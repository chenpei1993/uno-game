import {GameSetting} from "../../GameSetting";
import {Container} from "../../Container";

export class Background{

    static draw(ctx: CanvasRenderingContext2D, container: Container): void {
        let bgStr = GameSetting.getTableBg() ? GameSetting.getTableBg() : "Table_2"
        let backgroundImg = container.getImage(bgStr)
        ctx.drawImage(backgroundImg, 0, 0, container.getWidth(), container.getHeight())
    }
}