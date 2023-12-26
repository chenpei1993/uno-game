import {Scene} from "./Scene";
import {Container} from "../Container";
import {SceneType} from "../const/SceneType";

export class SettingScene implements Scene{

    private sceneType: SceneType
    private container: Container

    constructor(sceneType: SceneType, container: Container) {
        this.sceneType = sceneType
        this.container = container
    }

    click(x: number, y: number, func: () => void): void {
    }

    draw(ctx: CanvasRenderingContext2D): void {
    }

    getSceneType(): SceneType {
        return this.sceneType;
    }

}