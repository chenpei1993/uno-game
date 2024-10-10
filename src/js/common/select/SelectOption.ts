export class SelectOption{
    private label: string
    private value: any
    private x: number
    private y: number
    private w: number
    private h: number

    constructor(label: string, value: any){
        this.label = label
        this.value = value
    }

    public getLabel(){
        return this.label
    }

    public getValue(){
        return this.value
    }

    click(x: number, y: number): boolean{
        if(this.x && this.x && this.y && this.w && this.h){
            if(this.x < x && x < this.x + this.w
                && this.y < y && y < this.y + this.h){
                return true
            }
        }
        return false
    }

    setPosition(x: number, y: number, w: number, h: number) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
}