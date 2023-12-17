import {Drawable} from "./Drawable";
import {ImageComponent} from "./component/ImageComponent";
import {ConfigComponent} from "./component/ConfigComponent";
import {LogComponent} from "./component/LogComponent";
import {Config} from "./Config";

export class Container{
    private wrapper: HTMLElement
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

    constructor(wrapper: HTMLElement, config: Config) {
        this.wrapper = wrapper
        let wrapperBox: DOMRect = this.wrapper.getBoundingClientRect()
        this.width = wrapperBox.width
        this.height = wrapperBox.height

        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas.style.width = `${this.width}px`
        this.canvas.style.height = `${this.height}px`
        this.ctx.scale(this.dpr, this.dpr)
        this.wrapper.appendChild(this.canvas)
        this.config = config
    }

    _run(){

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
    }

    run(){
        this.init()
        this.animationId = window.requestAnimationFrame(this._run)
    }

    static create(element: HTMLElement, config: Config){
        return new Container(element, config)
    }


}