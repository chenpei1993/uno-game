import {Drawable} from "./Drawable";
import {ImageComponent} from "./component/ImageComponent";
import {ConfigComponent} from "./component/ConfigComponent";
import {LogComponent} from "./component/LogComponent";
import {Config} from "./Config";
import {Scene} from "./scene/Scene";
import {MainScene} from "./scene/MainScene";

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
    private currentScene: Scene

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
        this.currentScene = new MainScene()
    }

    _run(){
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.currentScene.draw(this.ctx)
    }

    async init() {
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
            let x = e.clientX - this.wrapperBox.left
            let y = e.clientY - this.wrapperBox.top
            console.log(x, y)
            this.currentScene.click(x, y)
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


    static create(element: HTMLElement, config: Config){
        return new Container(element, config)
    }


}