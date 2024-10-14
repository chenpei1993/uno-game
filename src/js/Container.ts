import {Drawable} from "./ui/Drawable";
import {ImageComponent} from "./component/ImageComponent";
import {ConfigComponent} from "./component/ConfigComponent";
import {LogComponent} from "./component/LogComponent";
import {Config} from "./Config";
import {SceneManager} from "./scene/SceneManager";
import {System} from "./System";
import {AudioComponent} from "./component/AudioComponent";
import {GameSetting} from "./GameSetting";
import {GameUtil} from "./util/GameUtil";
import {Loading} from "./ui/widget/Loading";

export class Container{
    private wrapper: HTMLElement
    private wrapperBox: DOMRect
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private readonly dpr: number
    private width: number
    private height: number
    private animationId: number
    private imageComponent: ImageComponent
    private audioComponent: AudioComponent
    private config: Config
    private configComponent: ConfigComponent
    private logComponent: LogComponent
    private sceneManager: SceneManager

    constructor(wrapper: HTMLElement, config: Config) {
        this.wrapper = wrapper
        this.wrapperBox = this.wrapper.getBoundingClientRect()
        this.width = this.wrapperBox.width
        this.height = this.wrapperBox.height
        this.dpr = window.devicePixelRatio
        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = this.width * this.dpr
        this.canvas.height = this.height * this.dpr
        this.canvas.style.width = `${this.width}px`
        this.canvas.style.height = `${this.height}px`
        this.ctx.scale(this.dpr, this.dpr)
        this.wrapper.appendChild(this.canvas)
        this.config = config
        window.addEventListener("resize", ()=>{
            location.reload()
        })
        GameSetting.setScale(GameUtil.getScaleByScreen(this.width, this.height))
    }

    _run(){
        this.animationId = window.requestAnimationFrame(() => this._run())
        System.setDeltaTime(Date.now())
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.sceneManager.getCurScene().draw(this.ctx)
    }

    async init() {

        Loading.draw(this.ctx, this, "加载中...", 0)
        this.logComponent = new LogComponent()

        this.configComponent = new ConfigComponent(this.config)
        this.configComponent.init()

        Loading.draw(this.ctx, this, "加载图片...", 33)
        this.imageComponent = new ImageComponent(
            this.configComponent.getResourceUrl(),
            this.configComponent.getImageUrls(),
            this.logComponent)

        await this.imageComponent.init()
        this.logComponent.info("图片资源加载完成")

        Loading.draw(this.ctx, this, "加载音乐...", 66)
        this.audioComponent = new AudioComponent(this.configComponent.getResourceUrl(),
            this.configComponent.getAudioUrls(),
            this.logComponent)

        await this.audioComponent.init()
        this.logComponent.info("音乐资源加载完成")

        this.sceneManager = new SceneManager(this)
        this.sceneManager.init()

        window.addEventListener("click", (e) => {
            this.sceneManager.getCurScene().click(e.offsetX, e.offsetY)
        })

        Loading.draw(this.ctx, this, "加载完成...", 100)
    }

    async run(){
        await this.init()
        this.animationId = window.requestAnimationFrame(() => this._run())
    }

    public getWidth(): number{
        return this.width
    }

    public getHeight(): number {
        return this.height
    }

    public getImage(name: string): HTMLImageElement{
        return this.imageComponent.getImage(name)
    }

    public getAudio(name: string): HTMLAudioElement{
        return this.audioComponent.getAudio(name)
    }

    static create(element: HTMLElement, config: Config){
        return new Container(element, config)
    }


}