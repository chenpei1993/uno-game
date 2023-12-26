import {Scene} from "./Scene";
import {Container} from "../Container";
import {GameScene} from "./GameScene";
import {MainScene} from "./MainScene";
import {SettingScene} from "./SettingScene";
import {SceneType} from "../const/SceneType";

export class SceneManager{
    private container: Container
    private sceneMap: Map<SceneType, Scene>
    private preScene: Scene
    private curScene: Scene

    constructor(container: Container) {
        this.container = container
        this.sceneMap = new Map<SceneType, Scene>()
    }

    init(){
        this.sceneMap.set(SceneType.Main, new MainScene(SceneType.Main, this.container))
        this.sceneMap.set(SceneType.Game, new GameScene(SceneType.Game, this.container))
        this.sceneMap.set(SceneType.Setting, new SettingScene(SceneType.Setting, this.container))
        this.curScene = this.sceneMap.get(SceneType.Main)
    }

    nextScene(sceneType: SceneType){
        if(sceneType === SceneType.Game){
            let pre = this.curScene
            this.curScene = this.sceneMap.get(sceneType)
            this.preScene = pre
        }else if(sceneType === SceneType.Setting){
            //
        }
    }

    getCurScene(): Scene{
        return this.curScene
    }
}