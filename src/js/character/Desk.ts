import {Drawable} from "../Drawable";

export class Desk implements Drawable{
    private width: number
    private height: number
    private backgroundImg: HTMLImageElement

    constructor(width: number, height: number, backgroundImg: HTMLImageElement) {
        this.width = width
        this.height = height
        this.backgroundImg = backgroundImg

    }

    setBackgroundImg(backgroundImg: HTMLImageElement){
        this.backgroundImg = backgroundImg
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.backgroundImg, 0, 0, this.width, this.height)
    }


}