import {Drawable} from "./Drawable";

export class Container{
    private wrapper: HTMLElement
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private readonly dpr: number
    private width: number
    private height: number
    private drawItems: Drawable[]
    private animationId: number

    constructor(wrapper: HTMLElement) {
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
    }

    _run(){

    }

    run(){
        this.animationId = window.requestAnimationFrame(this._run)
    }

    static create(element: HTMLElement){
        return new Container(element)
    }


}