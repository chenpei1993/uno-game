import {Button} from "./Button";
import {Point} from "../Point";
import {ButtonOption} from "./option/ButtonOption";
import {BasicButton} from "./BasicButton";

export class ImageButton extends BasicButton{

    constructor(pos: Point, option: ButtonOption) {
        option = option ?? {}
        super(pos, option)
        this.setDefaultOption({
            width: 100,
            height: 30,
            text: '',
            font: '24px',
            color: '#000',
            textColor: '#000',
            radius: 0,
            img: null,
            func: () => {}
        })
        this.updateConfig()
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.drawImage(this.option.img, this.pos.x
            , this.pos.y, this.option.width, this.option.height)
        ctx.restore()
    }

}