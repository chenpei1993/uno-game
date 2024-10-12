import {Component} from "./Component";
import {LogComponent} from "./LogComponent";

export class AudioComponent implements Component{
    private readonly url: string
    private readonly audios: string[]
    private audioMap: Map<string,  HTMLAudioElement>
    private log: LogComponent

    constructor(url: string, audios: string[], log: LogComponent) {
        this.audios = audios
        this.url = url
        this.audioMap = new Map<string,  HTMLAudioElement>()
        this.log = log
    }

    async init() {
        let reg = /\/(.*)\./
        for(let audio of this.audios) {
            let name = audio.match(reg)[1]
            let audioEle = document.createElement("audio")
            audioEle.id = name
            audioEle.src = this.url + audio
            document.body.appendChild(audioEle)
            this.audioMap.set(name, audioEle)
        }
    }


    getAudio(name: string): HTMLAudioElement{
        return this.audioMap.get(name)
    }
}