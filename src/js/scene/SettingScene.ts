import {Scene} from "./Scene";
import {Container} from "../Container";
import {SceneType} from "../const/SceneType";
import {SceneManager} from "./SceneManager";

export class SettingScene implements Scene{

    private sceneType: SceneType
    private container: Container
    private sceneManager: SceneManager

    constructor(sceneType: SceneType, container: Container, sceneManager: SceneManager) {
        this.sceneType = sceneType
        this.container = container
        this.sceneManager = sceneManager
    }

    click(x: number, y: number, func: () => void): void {

    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.fillText("Setting", 0, 10)
        ctx.restore()
    }

    getSceneType(): SceneType {
        return this.sceneType;
    }

}