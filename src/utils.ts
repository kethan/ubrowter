import { decode, encode } from "qss";

function pathToRegex(pattern: string, url: string) {
    const names: string[] = []
    const re = new RegExp(
        '^' +
        pattern
            .replace(/\((.*?)\)/g, '(?:$1)?')
            .replace(/(\(\?)?:\w+/g, (match, optional) => {
                names.push(match.slice(1))
                return optional ? match : '([^/?]+)'
            })
            .replace(/\*/g, () => {
                names.push('path')
                return '([^?]*?)'
            })
        + '(?:\\?([\\s\\S]*))?$');

    const matches = re.exec(url);
    const params: { [key: string]: string } = {}
    if (matches)
        for (let i = 0; i < names.length; i++) {
            params[names[i]] = matches[i + 1]
        }
    return { match: !!matches, params, pattern, url }
}

export {
    pathToRegex, decode, encode
};