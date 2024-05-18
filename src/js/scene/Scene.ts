import {Drawable} from "../Drawable";
import {Clickable} from "../Clickable";
import {SceneType} from "../const/SceneType";

export interface Scene extends Drawable, Clickable{
    getSceneType():SceneType
    init(): void
}