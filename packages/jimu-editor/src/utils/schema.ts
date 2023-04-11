export function styleHelper(styles?: Record<string, number | string>) {
    if(!styles) {
        return {};
    }
    return Object.keys(styles).reduce((res, cur) => {
        if(typeof styles[cur] === 'number') {
            res[cur] = `${styles[cur]}px`
        } else {
            res[cur] = styles[cur]
        }
        return res;
    }, {} as Record<string, any>)
}

export function stringToColor(str: string) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }