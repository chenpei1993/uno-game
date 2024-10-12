export class GameSetting{
    static fps: boolean

    static tableBg: string

    static scale: number

    static setFps(fps: boolean){
        GameSetting.fps = fps
    }

    static getFps(): boolean{
        return GameSetting.fps
    }

    static setTableBg(tableBg: string){
        GameSetting.tableBg = tableBg
    }

    static getTableBg(): string{
        return GameSetting.tableBg
    }

    static getScale(): number{
        return GameSetting.scale
    }

    static setScale(scale: number): void{
        GameSetting.scale = scale
    }
}