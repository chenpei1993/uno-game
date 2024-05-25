import {Card} from "../item/Card";

export interface Rule{
    check(card:Card[], lastCards:Card[]): number
}