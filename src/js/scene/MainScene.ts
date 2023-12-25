import {Drawable} from "../Drawable";
import {Button} from "../common/button/Button";
import {BasicButton} from "../common/button/BasicButton";
import {RectButton} from "../common/button/RectButton";
import {Point} from "../common/Point";
import {Scene} from "./Scene";
import {Clickable} from "../Clickable";
import {RectRoundButton} from "../common/button/RectRoundButton";
import {CircleButton} from "../common/button/CircleButton";

export class MainScene implements Scene{
    private startGameButton: RectRoundButton
    private settingGameButton: RectRoundButton
    private musicGameButton: CircleButton
    constructor() {
        let startGameButtonPos: Point = new Point(50, 50)
        this.startGameButton = new RectRoundButton(startGameButtonPos, {
            text: "开始游戏"
        })

        let settingGameButtonPos: Point = new Point(50, 100)
        this.settingGameButton = new RectRoundButton(settingGameButtonPos, {
            text: "设置"
        })

        let musicButtonPos: Point = new Point(50, 220)
        this.musicGameButton = new CircleButton(musicButtonPos, {
            text: "音"
        })
    }
    draw(ctx: CanvasRenderingContext2D): void {
        this.startGameButton.draw(ctx)
        this.settingGameButton.draw(ctx)
        this.musicGameButton.draw(ctx)
    }

    click(x: number, y: number): void {
        this.startGameButton.click(x, y)
        this.settingGameButton.click(x, y)
    }

}