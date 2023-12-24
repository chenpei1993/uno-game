import {Drawable} from "../Drawable";
import {Button} from "../common/button/Button";
import {BasicButton} from "../common/button/BasicButton";
import {RectButton} from "../common/button/RectButton";
import {Point} from "../common/Point";
import {Scene} from "./Scene";

export class MainScene implements Scene{
    private startGameButton: RectButton
    private settingGameButton: RectButton
    constructor() {
        let startGameButtonPos: Point = new Point(50, 50)
        this.startGameButton = new RectButton(startGameButtonPos, {
            text: "开始游戏"
        })

        let settingGameButtonPos: Point = new Point(50, 100)
        this.settingGameButton = new RectButton(settingGameButtonPos, {
            text: "设置"
        })
    }
    draw(ctx: CanvasRenderingContext2D): void {
        this.startGameButton.draw(ctx)
        this.settingGameButton.draw(ctx)
    }

}