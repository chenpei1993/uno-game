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

export class GameScene implements Scene{
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
        this.dealer = new Dealer(this.container, 50, 60)
        this.player = new UserPlayer(w, h)
        this.leftPlayer = new LeftPlayer(w, h)
        this.rightPlayer = new RightPlayer(w, h)
        this.topPlayer = new TopPlayer(w, h)
        this.closeButton = new CircleButton(new Point(w - 60, 0), {
            text:"x",
            font: "28px ",
            textColor: "red",
            color: "rgba(0,0,0,0)"
        })
        this.init()
    }

    init(){
        for(let i = 0; i < 7; i++){
            this.player.getACard(this.dealer.giveACard())
            this.rightPlayer.getACard(this.dealer.giveACard())
            this.topPlayer.getACard(this.dealer.giveACard())
            this.leftPlayer.getACard(this.dealer.giveACard())
        }
    }

    click(x: number, y: number, func: () => void): void {
        this.closeButton.click(x,y, () => {
            this.sceneManager.nextScene(SceneType.Main)
        })

        this.player.click(x, y, null)
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
    }

    getSceneType(): SceneType {
        return this.sceneType;
    }

}