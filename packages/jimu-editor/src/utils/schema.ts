export function styleHelper(props: Record<string, any>) {

    if(!props) {
      return {}; 
    }
    const styles = Object.keys(props).reduce((res, cur) => {
        if(cur.startsWith('styles')) {
            res[cur.replace('styles.default.', '')] = props[cur].value.value ||  props[cur].value.default;
        }
        return res;
    }, {} as any)

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


let uuid = 1;

export function getUuid(name: string) {
  uuid += 1;
  return (Date.now() + uuid).toString(16).substring(3) + `[${name}]`;
}
