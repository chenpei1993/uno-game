import {Component} from "./Component";
import {Config} from "../Config";



export class ConfigComponent implements Component{
    private config: Config
    private resourceUrl: string
    private imageUrls: string[]

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
    }

    getResourceUrl(){
        return this.resourceUrl
    }

    getImageUrls(){
        return this.imageUrls
    }

}