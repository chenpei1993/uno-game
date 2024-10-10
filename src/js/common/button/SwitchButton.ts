import {Point} from "../Point";
import {BasicButton} from "./BasicButton";
import {ButtonOption} from "./option/ButtonOption";

export class SwitchButton extends BasicButton {
    private sliderX: number
    private sliderY: number
    private r: number
    private value: boolean
    constructor(pos: Point, option: ButtonOption) {
        option = option ?? {}
        super(pos, option)
        this.setDefaultOption({
            width: 100,
            height: 30,
            text: '',
            font: '24px',
            backgroundColor: '#000',
            color: '#000',
            textColor: '#000',
            radius: 10,
            func: () => {}
        })
        this.updateConfig()
        this.r = this.option.height / 2
        this.pos.y = this.pos.y - this.r
        this.sliderX = this.pos.x +  this.r
        this.sliderY = this.pos.y +  this.r
        this.value = false

    }

    draw(ctx: CanvasRenderingContext2D): void {
        let r = this.option.height / 2

        ctx.save()
        ctx.strokeStyle = this.option.color
        ctx.beginPath()
        ctx.arc(this.pos.x +  this.r, this.pos.y +  this.r,  this.r, Math.PI * 0.5, Math.PI * 1.5)
        ctx.lineTo(this.pos.x + this.option.width -  this.r * 2, this.pos.y)
        ctx.arc(this.pos.x + this.option.width -  this.r * 2, this.pos.y +  this.r,  this.r, Math.PI * 1.5, Math.PI * 0.5)
        ctx.closePath()
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(this.pos.x + this.r, this.pos.y + this.r, this.r, Math.PI * 0.5, Math.PI * 1.5)
        ctx.lineTo(this.pos.x + this.option.width - this.r * 2, this.pos.y)
        ctx.arc(this.sliderX, this.pos.y + this.r, this.r, Math.PI * 1.5, Math.PI * 0.5)
        ctx.closePath()
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.fill()

        ctx.beginPath()
        ctx.arc(this.sliderX, this.sliderY, this.r  , 0 , Math.PI * 2)
        ctx.fillStyle = "#000"
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

    setSliderX(x :number){
        this.value = !this.value
        this.sliderX = this.value ? this.pos.x + this.option.width - this.r * 2 : this.pos.x + this.r
    }

    click(x: number, y: number): void {
        if(this.pos.x < x && x < this.pos.x + this.option.width
            && this.pos.y < y && y < this.pos.y + this.option.height){
            this.setSliderX(x)
            if(this.option.func){
                this.option.func(this.value)
            }
        }
    }


}