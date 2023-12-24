import {Button} from "./Button";
import {Point} from "../Point";
import {ButtonOption} from "./option/ButtonOption";
import {BasicButton} from "./BasicButton";

export class RectButton extends BasicButton<ButtonOption>{

    constructor(pos: Point, option: ButtonOption) {
        super(pos, option)
    }

    click(): void {

    }

    draw(ctx: CanvasRenderingContext2D): void {
    }


}