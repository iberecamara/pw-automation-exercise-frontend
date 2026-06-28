export class StringUtils {

    static prettyJson<T>(target: T): string {
        return JSON.stringify(target, null, 4);
    }
}
