import {Component} from "./Component";
import {LogComponent} from "./LogComponent";

export class ImageComponent implements Component{
    private readonly url: string
    private readonly images: string[]
    private imageMap: Map<string, HTMLImageElement>
    private log: LogComponent
    private fn: () => void

    constructor(url: string, images: string[], fn: ()=> void, log: LogComponent) {
        this.images = images
        this.url = url + "img/"
        this.imageMap = new Map<string, HTMLImageElement>()
        this.log = log
        this.fn = fn
    }

    async init() {
        let images: Promise<HTMLImageElement>[] = []
        let res: Awaited<HTMLImageElement>[]
        for (let url of this.images) {
            images.push(this.loadImage(url))
        }
        res = await Promise.all(images)
        return res
    }


    loadImage(name: string): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            let img = new Image()
            img.onload = () => {
                this.fn()
                resolve(img)
            }
            img.onerror = (e) => {
                this.log.error(name + " 加载失败！")
            }
            img.src = this.url + '/' + name
            let realName = name.substring(0, name.indexOf("."))
            this.imageMap.set(realName, img)
        })
    }


    getImage(name: string): HTMLImageElement{
        return this.imageMap.get(name)
    }
}