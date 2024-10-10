
export class System {
    private static delta: number
    private static fps: number
    private static time: number = Date.now()

    public static setDeltaTime(time: number){
        System.delta = (time - System.time)  / 1000
        System.time = time
        System.fps = 1 /  System.delta
    }

    public static getDeltaTime(): number{
        return System.delta ?? 0
    }

    public static getTime(): number{
        return System.time ?? 0
    }


    public static getFPS(): number{
        return System.fps
    }

}