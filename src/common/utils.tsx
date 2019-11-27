import { isObject, isArray, isDate } from './is-type';
import queryString from 'qs';

/**
 * @description m => km
 * @param value string
 */
export function m2km(value: string): string {
	if (!value) {
		console.log('value 不能为空')
		return '0';
	}
	let result = parseInt(value);
	return result > 1000 ? ((result / 1000).toFixed(2) + ' k') : result + ' ';
}

/**
 * @description digital toFixed
 * @param value string
 * @param decimals string
 */
export function digitalFormat(value: string, decimals: number = 2): string {
	if (!value) return '0';
	const result = parseFloat(value);
	if (isNaN(result)) {
		console.log('传入的值解析错误')
		return '0';
	}
	return Number(result.toFixed(decimals)).toString();
}

/**
 * @description 18512345678 => 185****5678
 * @param value string
 */
export const formatPhone = (phone: string) => {
	if (!phone) return '';
	return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

/**
 * @description sub toFixed
 * @param reduction string
 * @param minuend string
 * @param decimals string
 */
export function subCount(reduction: string, minuend: string, decimals: number = 2): string {
	if (!(reduction + '')) return '0';
	if (!(minuend + '')) return reduction;
	const result1 = parseFloat(reduction);
	const result2 = parseFloat(minuend);
	if (isNaN(result1) || isNaN(result2)) {
		console.log('传入的值解析错误');
		return '0';
	}
	return Number((result1 - result2).toFixed(decimals)).toString();
}

/**
 * @description digital prefix zore
 * @param number string
 */
export const zore = (number: number): string => {
	return number < 10 ? ('0' + number) : number + '';
};

/**
 * @description ms => {minute, second}
 * @param remain string
 * @param remain string
 */
export function msToTime(remain: number): object {
	const
		minute = parseInt(`${remain / 60000}`),
		second = parseInt(`${remain % 60000 / 1000}`);

	return {
		minute: isNaN(minute) ? 0 : minute,
		second: isNaN(second) ? 0 : second
	}
}

/**
 * @description 根据Ascii码排序对象
 * @param caseSensitive boolean default: false 大小写敏感
 * @returns string
 */
export const sortForAscii = (obj: any, lowerCase = false,caseSensitive: boolean = false): string => {
	if (!isObject(obj)) {
		console.log('参数必须为Object');
		return '';
	}
	let upperObj: any = {};

	// onject array date转换成默认字段
	Object.keys(obj).forEach(key => {
		if ((obj[key] || obj[key] === 0) && !isDate(obj[key])) {
			upperObj[key] = (isObject(obj[key]) || isArray(obj[key]) || isDate(obj[key])) ? 'AAAAAA' : (obj[key] + '');
		}
	});

	upperObj = caseSensitive ? upperObj : JSON.parse(JSON.stringify(upperObj).toLocaleLowerCase());
	let sortObjToString = '';
	const sortKeys = Object.keys(upperObj).sort();
	const LEN = sortKeys.length - 1;
	sortKeys.forEach((key, index) => {
		sortObjToString += upperObj[key] ? `${key}=${upperObj[key]}${index < LEN ? '&' : ''}` : ``;
	});

	return lowerCase ? sortObjToString.toLocaleLowerCase() : sortObjToString.toLocaleUpperCase();
};

/**
 * @description 时间格式转化为通用
 * @param dateStr 
 */
export const MPDate = (dateStr: string): Date => {
	if (typeof dateStr === 'string' && isNaN(Date.parse(dateStr))) {
		// '2000-01-01 00:00:00' => '2000/01/01 00:00:00'
		dateStr = dateStr.replace(/-/g, '/');
	}
	return new Date(dateStr);
};

/**
 * @description 时间对象格式化
 * @param date 
 * @param format 
 */
export const dateFormat = (date: Date, format: string = 'yyyy-MM-dd hh:mm:ss'): string => {
	if (!date) return '';
	let args = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
		'S': date.getMilliseconds()
	};
	if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)); }
	for (let i in args) {
		// @ts-ignore
		let n = args[i];
		if (new RegExp('(' + i + ')').test(format)) { format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length)); }
	}
	return format;
}

/**
 * @description 百度地图经纬度转换为腾讯/高德地图经纬度
 */
export const bMapTransQQMap = (lng: number, lat: number) => {
	let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	let x = lng - 0.0065;
	let y = lat - 0.006;
	let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
	let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
	let lngs = z * Math.cos(theta);
	let lats = z * Math.sin(theta);

	return {
		lng: lngs,
		lat: lats
	}
}


/**
 * @description 腾讯/高德地图经纬度转换为百度地图经纬度
 */
export const qqMapTransBMap = (lng: number, lat: number) => {
	let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	let x = lng;
	let y = lat;
	let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
	let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
	let lngs = z * Math.cos(theta) + 0.0065;
	let lats = z * Math.sin(theta) + 0.006;

	return {
		lng: lngs,
		lat: lats
	}
}

/**
 * @description 获取当前url参数
 * @returns object
 */
export const getUrlParams = (): any => {
	const search = window.location.href.split('?')[1];
	return queryString.parse(search);
}

/**
 * @description 判断是否是中文路径
 * @param pathname string
 */
export function isZhCN(pathname: string = window.location.pathname) {
  return /-cn\/?$/.test(pathname);
}

/**
 * @description 根据中英文路径获取对应地址
 * @param enPath string 英文路径
 * @param zhPath string 中文路径
 */
export const getPathOfLang = (enPath: string, zhPath: string) => {
	return isZhCN() ? zhPath : enPath
}

