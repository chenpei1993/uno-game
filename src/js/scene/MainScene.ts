import {Point} from "../common/Point";
import {Scene} from "./Scene";
import {RectRoundButton} from "../common/button/RectRoundButton";
import {CircleButton} from "../common/button/CircleButton";
import {Container} from "../Container";
import {SceneType} from "../const/SceneType";
import {SceneManager} from "./SceneManager";

export class MainScene implements Scene{
    private sceneType: SceneType
    private container: Container
    private sceneManager: SceneManager
    private startGameButton: RectRoundButton
    private settingGameButton: RectRoundButton
    private musicGameButton: CircleButton
    constructor(sceneType: SceneType, container: Container, sceneManager: SceneManager) {
        this.sceneType = sceneType
        this.container = container
        this.sceneManager = sceneManager
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
        let backgroundImg = this.container.getImage("Table_2")
        ctx.drawImage(backgroundImg, 0, 0, this.container.getWidth(), this.container.getHeight())
        // let img = this.container.getImage("Banner.png")
        // let imgW = 100
        // let imgX = this.container.getWidth() / 2 - imgW / 2
        // ctx.drawImage(img, imgX,0, imgW, 80)
        this.startGameButton.draw(ctx)
        this.settingGameButton.draw(ctx)
        // this.musicGameButton.draw(ctx)
    }

    click(x: number, y: number): void {
        this.startGameButton.click(x, y, () => {
            this.sceneManager.nextScene(SceneType.Game)
        })
        this.settingGameButton.click(x, y, () => {
            this.sceneManager.nextScene(SceneType.Setting)
        })
    }

    getSceneType(): SceneType {
        return this.sceneType;
    }

}