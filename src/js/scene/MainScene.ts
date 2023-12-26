import {Drawable} from "../Drawable";
import {Button} from "../common/button/Button";
import {BasicButton} from "../common/button/BasicButton";
import {RectButton} from "../common/button/RectButton";
import {Point} from "../common/Point";
import {Scene} from "./Scene";
import {Clickable} from "../Clickable";
import {RectRoundButton} from "../common/button/RectRoundButton";
import {CircleButton} from "../common/button/CircleButton";
import {Container} from "../Container";

export class MainScene implements Scene{
    private container: Container
    private startGameButton: RectRoundButton
    private settingGameButton: RectRoundButton
    private musicGameButton: CircleButton
    constructor(container: Container) {
        this.container = container
        let startGameButtonPos: Point = new Point(50, 150)
        this.startGameButton = new RectRoundButton(startGameButtonPos, {
            text: "开始游戏"
        })

        let settingGameButtonPos: Point = new Point(50, 200)
        this.settingGameButton = new RectRoundButton(settingGameButtonPos, {
            text: "设置"
        })

        // let musicButtonPos: Point = new Point(50, 300)
        // this.musicGameButton = new CircleButton(musicButtonPos, {
        //     text: "音"
        // })
    }
    draw(ctx: CanvasRenderingContext2D): void {
        let backgroundImg = this.container.getImage("Table_2.png")
        ctx.drawImage(backgroundImg, 0, 0, this.container.getWidth(), this.container.getHeight())
        let img = this.container.getImage("Banner.png")
        let imgW = 100
        let imgX = this.container.getWidth() / 2 - imgW / 2
        ctx.drawImage(img, imgX,0, imgW, 80)
        this.startGameButton.draw(ctx)
        this.settingGameButton.draw(ctx)
        // this.musicGameButton.draw(ctx)
    }

    click(x: number, y: number): void {
        this.startGameButton.click(x, y, () => {
            console.log("clicked game")
        })
        this.settingGameButton.click(x, y, () => {
            console.log("clicked setting")
        })
    }

}