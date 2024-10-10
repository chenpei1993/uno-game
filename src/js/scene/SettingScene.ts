import {Scene} from "./Scene";
import {Container} from "../Container";
import {SceneType} from "../const/SceneType";
import {SceneManager} from "./SceneManager";
import {SliderButton} from "../ui/common/button/SliderButton";
import {Point} from "../ui/common/Point";
import {SwitchButton} from "../ui/common/button/SwitchButton";
import {TextTag} from "../ui/common/text/TextTag";
import {CircleButton} from "../ui/common/button/CircleButton";
import {GameSetting} from "../GameSetting";
import {Select} from "../ui/common/select/Select";
import {SelectOption} from "../ui/common/select/SelectOption";
import {Background} from "../ui/widget/Background";

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
    private bg: Select
    private bgTag: TextTag
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
        this.music = new SwitchButton(new Point(x + margin, 70), null)

        this.volumeTag = new TextTag(new Point(x, 120), "音量", null, null)
        this.volume = new SliderButton(new Point(x + margin, 120), null)
        this.fpsTag = new TextTag(new Point(x, 170), "显示FPS", null, null)
        this.fps = new SwitchButton(new Point(x + margin, 170), {
            func: (value) => {
                GameSetting.setFps(value)
            }
        })

        let options: SelectOption[] = []
        let defaultOption = new SelectOption("背景2", "Table_2")
        options.push(new SelectOption("背景1", "Table_1"))
        options.push(defaultOption)
        options.push(new SelectOption("背景3", "Table_3"))
        options.push(new SelectOption("背景4", "Table_4"))
        this.bgTag = new TextTag(new Point(x, 220), "背景图片", null, null)
        this.bg = new Select(new Point(x + margin, 220), options, defaultOption, (value) => {
            GameSetting.setTableBg(value.getValue())
        })

        this.closeButton = new CircleButton(new Point(w - 60, 0), {
            text:"x",
            font: "28px ",
            textColor: "red",
            color: "rgba(0,0,0,0)",
            func: () => {
                this.sceneManager.nextScene(SceneType.Main)
            }
        })
    }

    init(){}

    click(x: number, y: number): void {
        this.music.click(x, y)

        this.volume.click(x, y)

        this.fps.click(x, y)

        this.closeButton.click(x,y)

        this.bg.click(x, y)
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        Background.draw(ctx, this.container)
        ctx.fillText("设置", 0, 10)
        this.musicTag.draw(ctx)
        this.music.draw(ctx)
        this.volumeTag.draw(ctx)
        this.volume.draw(ctx)
        this.bgTag.draw(ctx)
        this.bg.draw(ctx)
        this.fpsTag.draw(ctx)
        this.fps.draw(ctx)
        this.closeButton.draw(ctx)
        ctx.restore()
    }

    getSceneType(): SceneType {
        return this.sceneType;
    }

}