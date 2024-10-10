import {Drawable} from "../ui/Drawable";
import {Clickable} from "../ui/Clickable";
import {SceneType} from "../const/SceneType";

export interface Scene extends Drawable, Clickable{
    getSceneType():SceneType
    init(): void
}