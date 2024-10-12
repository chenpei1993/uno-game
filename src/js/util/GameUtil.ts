export class GameUtil{
    static getScaleByScreen(w: number, h: number): number {
        if(w >= 1200){
            return 2
        }else if(w >= 960){
            return 1.5
        }else{
            return 1
        }
    }
}