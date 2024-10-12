import {Component} from "./Component";
import {Config} from "../Config";



export class ConfigComponent implements Component{
    private config: Config
    private resourceUrl: string
    private imageUrls: string[]
    private audioUrls: string[]

    constructor(config: Config) {
        this.config = config
    }

    init() {
        if(this.config.resourceUrl){
            this.resourceUrl = this.config.resourceUrl
        }

        if(this.config.imageUrls){
            this.imageUrls = this.config.imageUrls
        }

        if(this.config.audioUrls){
            this.audioUrls = this.config.audioUrls
        }
    }

    getResourceUrl(){
        return this.resourceUrl
    }

    getImageUrls(){
        return this.imageUrls
    }

    getAudioUrls(){
        return this.audioUrls
    }

}