import {Component} from "./Component";

export class LogComponent implements Component{

    private isDevMode: boolean
    constructor(isDevMode: boolean = true) {
        this.isDevMode = isDevMode
    }

    debug(message: string){
        if(this.isDevMode){
            console.log(message)
        }
    }

    info(message: string){
        console.log(message)
    }


    error(message: string | Event){
        console.error(message)
    }

    init(): void {
        //
    }



}