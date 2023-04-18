/**
 * 获取日期格式输出
 * @param  {Date}   time   时间
 * @param  {String} format 输出格式，要求必须含有yyyy,mm,dd
 * @return {String}        默认返回yyyymmdd格式时间
 */
export function formatTime(time: string | number | Date = Date.now(), format = 'yyyy-MM-dd') {
    time = new Date(time);
    return format
        .replace('yyyy', String(time.getFullYear()))
        .replace('MM', String(time.getMonth() + 1).padStart(2, '0'))
        .replace('dd', String(time.getDate()).padStart(2, '0'))
        .replace('HH', String(time.getHours()).padStart(2, '0'))
        .replace('mm', String(time.getMinutes()).padStart(2, '0'))
        .replace('ss', String(time.getSeconds()).padStart(2, '0'));
}

export async function sleep(timeout: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timeout));
}