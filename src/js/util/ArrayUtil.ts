export class ArrayUtil{
    static swap<T>(arr: Array<T>, i: number, j: number): void {
        let t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }

    static del<T>(arr: Array<T>, i: number): void {
        arr.splice(i, 1)
    }

    static shuffle<T>(arr: Array<T>) {
        let n = arr.length;
        for (let i = 0; i < n; i++) {
            let rand = Math.floor(Math.random() * (n - i)) + i;
            ArrayUtil.swap(arr, i, rand);
        }
    }

}