import {Drawable} from "./Drawable";
import {ImageComponent} from "./component/ImageComponent";
import {ConfigComponent} from "./component/ConfigComponent";
import {LogComponent} from "./component/LogComponent";
import {Config} from "./Config";
import {SceneManager} from "./scene/SceneManager";

export class Container{
    private wrapper: HTMLElement
    private wrapperBox: DOMRect
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private readonly dpr: number
    private width: number
    private height: number
    private drawItems: Drawable[]
    private animationId: number
    private imageComponent: ImageComponent
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
        this.sceneManager = new SceneManager(this)
    }

    _run(){
        this.animationId = window.requestAnimationFrame(() => this._run())
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.sceneManager.getCurScene().draw(this.ctx)
    }

    async init() {

        this.sceneManager.init()

        this.logComponent = new LogComponent()

        this.configComponent = new ConfigComponent(this.config)
        this.configComponent.init()

        this.imageComponent = new ImageComponent(
            this.configComponent.getResourceUrl(),
            this.configComponent.getImageUrls(),
            this.logComponent)

        await this.imageComponent.init()
        this.logComponent.info("图片资源加载完成")

        window.addEventListener("click", (e) => {
            console.log(e.offsetX, e.offsetY)
            this.sceneManager.getCurScene().click(e.offsetX, e.offsetY, null)
        })
    }

    run(){
        this.init()
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


    static create(element: HTMLElement, config: Config){
        return new Container(element, config)
    }


}