import {EventHandler} from "../EventHandler";
import {Component} from "./Component";

export class EventHandlerComponent implements Component{
    private handlers: EventHandler[]
    init(){
        window.addEventListener("keydown", e => {
            for(let handler of this.handlers){
                handler.handle(e)
            }
        })
    }

    addHandler(handler: EventHandler){
        this.handlers.push(handler)
    }
}