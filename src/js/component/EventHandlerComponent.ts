import {EventHandler} from "../EventHandler";

export class EventHandlerComponent {
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