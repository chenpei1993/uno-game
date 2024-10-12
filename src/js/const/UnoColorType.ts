export enum UnoColorType{
    "Green" = "Green",
    "Red" = "Red",
    "Blue" = "Blue",
    "Yellow" = "Yellow",
    "Wild" = "Wild",
}

export function randomColor(): UnoColorType {
    let n = Math.floor(Math.random() * 4);
    if(n == 0){
        return UnoColorType.Green
    }else if(n == 1){
        return UnoColorType.Red
    }else if(n == 2){
        return UnoColorType.Blue
    }else if(n == 3){
        return UnoColorType.Yellow
    }
}