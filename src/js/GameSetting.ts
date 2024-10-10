export class GameSetting{
    static fps: boolean

    static tableBg: string

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
}