export class NumberUtils {

    public static getRandomNumber(options?: { min?: number; max?: number }): number {
        const min = options?.min ?? 0;
        const max = options?.max ?? 1;

        if (min >= max) {
            throw new Error("Min must be less than max");
        }

        return Math.floor(Math.random() * (max - min) + min);
    }

}
