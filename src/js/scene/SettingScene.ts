import {Scene} from "./Scene";
import {Container} from "../Container";
import {SceneType} from "../const/SceneType";
import {SceneManager} from "./SceneManager";
import {SliderButton} from "../common/button/SliderButton";
import {Point} from "../common/Point";
import {SwitchButton} from "../common/button/SwitchButton";
import {TextTag} from "../common/text/TextTag";
import {Dealer} from "../item/Dealer";
import {UserPlayer} from "../item/UserPlayer";
import {LeftPlayer} from "../item/LeftPlayer";
import {RightPlayer} from "../item/RightPlayer";
import {TopPlayer} from "../item/TopPlayer";
import {CircleButton} from "../common/button/CircleButton";

export class SettingScene implements Scene{

    private sceneType: SceneType
    private container: Container
    private sceneManager: SceneManager
    private music: SwitchButton
    private musicTag: TextTag
    private volume: SliderButton
    private volumeTag: TextTag
    private fps: SwitchButton
    private fpsTag: TextTag
    private closeButton: CircleButton
    private intervalY: number
    private baseY: number

    constructor(sceneType: SceneType, container: Container, sceneManager: SceneManager) {
        this.sceneType = sceneType
        this.container = container
        this.sceneManager = sceneManager

        this.intervalY = 50
        this.baseY = 150
        let margin = 50


        let x = this.container.getWidth() / 2 - 100 / 2
        let y = this.baseY
        let w = this.container.getWidth()
        let h =  this.container.getHeight()

        this.musicTag = new TextTag(new Point(x, 70), "音乐", null, null)
        this.music = new SwitchButton(new Point(x + margin, 50), null)
        this.volumeTag = new TextTag(new Point(x, 120), "音量", null, null)
        this.volume = new SliderButton(new Point(x + margin, 100), null)
        this.fpsTag = new TextTag(new Point(x, 170), "显示FPS", null, null)
        this.fps = new SwitchButton(new Point(x + margin, 150), null)

        this.closeButton = new CircleButton(new Point(w - 60, 0), {
            text:"x",
            font: "28px ",
            textColor: "red",
            color: "rgba(0,0,0,0)"
        })
    }

    init(){}

    click(x: number, y: number, func: () => void): void {
        this.music.click(x, y, () => {

        })

        this.volume.click(x, y, () => {

        })

        this.fps.click(x, y, () => {

        })

        this.closeButton.click(x,y, () => {
            this.sceneManager.nextScene(SceneType.Main)
        })
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        let backgroundImg = this.container.getImage("Table_2")
        ctx.drawImage(backgroundImg, 0, 0, this.container.getWidth(), this.container.getHeight())
        ctx.fillText("设置", 0, 10)
        this.musicTag.draw(ctx)
        this.music.draw(ctx)
        this.volumeTag.draw(ctx)
        this.volume.draw(ctx)
        this.fpsTag.draw(ctx)
        this.fps.draw(ctx)
        this.closeButton.draw(ctx)
        ctx.restore()
    }

    getSceneType(): SceneType {
        return this.sceneType;
    }

}