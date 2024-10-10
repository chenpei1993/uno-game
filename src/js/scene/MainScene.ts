import {Point} from "../common/Point";
import {Scene} from "./Scene";
import {RectRoundButton} from "../common/button/RectRoundButton";
import {CircleButton} from "../common/button/CircleButton";
import {Container} from "../Container";
import {SceneType} from "../const/SceneType";
import {SceneManager} from "./SceneManager";
import {SnowEffect} from "../effect/SnowEffect";
import {TextTag} from "../common/text/TextTag";
import {Background} from "../util/Background";

export class MainScene implements Scene{
    private sceneType: SceneType
    private container: Container
    private sceneManager: SceneManager
    private startGameButton: RectRoundButton
    private settingGameButton: RectRoundButton
    private musicGameButton: CircleButton
    private showEffect: SnowEffect

    private margin: number
    private baseY: number
    private title: TextTag

    constructor(sceneType: SceneType, container: Container, sceneManager: SceneManager) {
        this.sceneType = sceneType
        this.container = container
        this.sceneManager = sceneManager
        this.margin = 10
        this.baseY = 150


        let x = this.container.getWidth() / 2 - 100 / 2
        let y = this.baseY
        this.title = new TextTag(new Point(this.container.getWidth() / 2, y), "Uno", null, "100px serif")
        y += this.title.getHeight()
        let startGameButtonPos: Point = new Point(x, y)
        this.startGameButton = new RectRoundButton(startGameButtonPos, {
            text: "开始游戏",
            func: () => {
                let scene = this.sceneManager.nextScene(SceneType.Game)
                scene.init()
            }
        })
        y += this.startGameButton.getHeight() + this.margin
        let settingGameButtonPos: Point = new Point(x, y)
        this.settingGameButton = new RectRoundButton(settingGameButtonPos, {
            text: "设置",
            func: () => {
                this.sceneManager.nextScene(SceneType.Setting)
            }
        })

        this.showEffect = new SnowEffect(this.container.getWidth(), this.container.getHeight(), 40, 100, 3)

        // let musicButtonPos: Point = new Point(50, 300)
        // this.musicGameButton = new CircleButton(musicButtonPos, {
        //     text: "音"
        // })
    }

    init(){

    }

    draw(ctx: CanvasRenderingContext2D): void {
        Background.draw(ctx, this.container)

        this.showEffect.draw(ctx)
        this.title.draw(ctx)

        this.startGameButton.draw(ctx)
        this.settingGameButton.draw(ctx)
        // this.musicGameButton.draw(ctx)
    }

    click(x: number, y: number): void {
        this.startGameButton.click(x, y)
        this.settingGameButton.click(x, y)
    }

    getSceneType(): SceneType {
        return this.sceneType;
    }

}