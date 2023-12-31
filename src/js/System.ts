import {Component} from "./component/Component";

export class System {
    private static delta: number
    private static fps: number
    private static time: number

    public static setDeltaTime(time: number){
        if(!System.time){
            System.time = time
        }else{
            System.delta = (time - System.time)  / 1000
            System.time = time
            System.fps = 1 /  System.time
        }
    }

    public static getDeltaTime(): number{
        return System.delta ?? 0
    }


    public static getFPS(): number{
        return System.fps
    }

}