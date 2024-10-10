import {Card} from "../character/Card";

export interface Rule{
    check(card:Card[], lastCards:Card[]): number
}