export class GameSetting{
    static fps: boolean

    static setFps(fps: boolean){
        GameSetting.fps = fps
    }

    static getFps(): boolean{
        return GameSetting.fps
    }
}