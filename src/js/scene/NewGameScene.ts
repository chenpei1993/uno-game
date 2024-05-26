import {Scene} from "./Scene";
import {Container} from "../Container";
import {SceneType} from "../const/SceneType";
import {SceneManager} from "./SceneManager";
import {Dealer} from "../item/Dealer";
import {BasicPlayer} from "../item/BasicPlayer";
import {UserPlayer} from "../item/UserPlayer";
import {Point} from "../common/Point";
import {LeftPlayer} from "../item/LeftPlayer";
import {RightPlayer} from "../item/RightPlayer";
import {TopPlayer} from "../item/TopPlayer";
import {CircleButton} from "../common/button/CircleButton";
import {SimpleAI} from "../strategy/SimpleAI";

export class NewGameScene implements Scene{
    private sceneType: SceneType
    private container: Container
    private sceneManager: SceneManager
    private dealer: Dealer
    private player: BasicPlayer
    private leftPlayer: BasicPlayer
    private rightPlayer: BasicPlayer
    private topPlayer: BasicPlayer
    private closeButton: CircleButton
    constructor(sceneType: SceneType, container: Container, sceneManager: SceneManager) {
        this.sceneType = sceneType
        this.container = container
        this.sceneManager = sceneManager
        //TODO
        let w = this.container.getWidth()
        let h =  this.container.getHeight()
        this.dealer = new Dealer(this.container,
            new Point(60, 60), w - 2 * 60, h - 2 * 60, 50, 60)
        this.player = new UserPlayer("user", w, h, this.dealer)
        this.dealer.register(this.player.getName(), this.player)
        this.leftPlayer = new LeftPlayer("left", w, h, this.dealer, new SimpleAI())
        this.dealer.register(this.leftPlayer.getName(), this.leftPlayer)
        this.rightPlayer = new RightPlayer("right", w, h, this.dealer, new SimpleAI())
        this.dealer.register(this.rightPlayer.getName(), this.rightPlayer)
        this.topPlayer = new TopPlayer("top", w, h, this.dealer, new SimpleAI())
        this.dealer.register(this.topPlayer.getName(), this.topPlayer)
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

    init(){
        this.dealer.newGame()
    }

    click(x: number, y: number): void {
        this.closeButton.click(x,y)

        this.player.click(x, y)


        this.dealer.click(x, y)
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        let backgroundImg = this.container.getImage("Table_2")
        ctx.drawImage(backgroundImg, 0, 0, this.container.getWidth(), this.container.getHeight())
        ctx.restore()
        this.closeButton.draw(ctx)
        this.player.draw(ctx)
        this.leftPlayer.draw(ctx)
        this.topPlayer.draw(ctx)
        this.rightPlayer.draw(ctx)
        this.dealer.draw(ctx)
    }

    getSceneType(): SceneType {
        return this.sceneType;
    }

}