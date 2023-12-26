import {Scene} from "./Scene";
import {Container} from "../Container";
import {SceneType} from "../const/SceneType";
import {SceneManager} from "./SceneManager";
import {Dealer} from "../item/Dealer";
import {Player} from "../item/Player";

export class GameScene implements Scene{
    private sceneType: SceneType
    private container: Container
    private sceneManager: SceneManager
    private dealer: Dealer
    private player: Player
    private leftPlayer: Player
    private rightPlayer: Player
    private topPlayer: Player
    constructor(sceneType: SceneType, container: Container, sceneManager: SceneManager) {
        this.sceneType = sceneType
        this.container = container
        this.sceneManager = sceneManager
        this.dealer = new Dealer()
        this.player = new Player()
        this.leftPlayer = new Player()
        this.rightPlayer = new Player()
        this.topPlayer = new Player()
    }

    click(x: number, y: number, func: () => void): void {
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        let backgroundImg = this.container.getImage("Table_2.png")
        ctx.drawImage(backgroundImg, 0, 0, this.container.getWidth(), this.container.getHeight())
        ctx.fillText("Game", 100, 100)
        ctx.restore()
    }

    getSceneType(): SceneType {
        return this.sceneType;
    }

}