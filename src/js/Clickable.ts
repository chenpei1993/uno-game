export interface Clickable{
    click(x: number, y: number, func: () => void): void
}