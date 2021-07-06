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


function encode(obj, pfx?) {
    var k, i, tmp, str = '';

    for (k in obj) {
        if ((tmp = obj[k]) !== void 0) {
            if (Array.isArray(tmp)) {
                for (i = 0; i < tmp.length; i++) {
                    str && (str += '&');
                    str += encodeURIComponent(k) + '=' + encodeURIComponent(tmp[i]);
                }
            } else {
                str && (str += '&');
                str += encodeURIComponent(k) + '=' + encodeURIComponent(tmp);
            }
        }
    }

    return (pfx || '') + str;
}

function toValue(mix) {
    if (!mix) return '';
    var str = decodeURIComponent(mix);
    if (str === 'false') return false;
    if (str === 'true') return true;
    return (+str * 0 === 0) ? (+str) : str;
}

function decode(str) {
    var tmp, k, out = {}, arr = str.split('&');

    while (tmp = arr.shift()) {
        tmp = tmp.split('=');
        k = tmp.shift();
        if (out[k] !== void 0) {
            out[k] = [].concat(out[k], toValue(tmp.shift()) as any);
        } else {
            out[k] = toValue(tmp.shift());
        }
    }

    return out;
}

export {
    pathToRegex, decode, encode
};