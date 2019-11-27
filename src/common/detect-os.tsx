/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-12-06 17:43:19
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-11 16:51:42
 */

export function detectOS(version = false) {
	const sUserAgent = navigator.userAgent;

	const isWX = /MicroMessenger/i.test(navigator.userAgent);
	if(isWX) return 'isWX';

	// 先判断手机系统
	const matchResult = sUserAgent.toLowerCase().match(/android/i) || [];
	const bIsAndroid =  matchResult[0] === 'android';
	if (bIsAndroid) return 'Android';
	
	const isiOS = !!sUserAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if (isiOS) return 'iOS';

	// 再判断运行浏览器的 操作系统 或 硬件平台
	const isLinux = (String(navigator.platform).indexOf('Linux') > -1);
	if (isLinux) return 'Linux';

	const	isMac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel');
	if (isMac) return 'Mac';

	const	isWin = (navigator.platform === 'Win32') || (navigator.platform === 'Windows');
	if (isWin && !version) return 'Win';
	if (isWin && version) {
		const isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1;
		if (isWin2K) return 'Win2000';
		const isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1;
		if (isWinXP) return 'WinXP';
		const isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1;
		if (isWin2003) return 'Win2003';
		const isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1;
		if (isWinVista) return 'WinVista';
		const isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1;
		if (isWin7) return 'Win7';
		const isWin8 = sUserAgent.indexOf('Windows NT 6.2') > -1 || sUserAgent.indexOf('Windows 8') > -1;
		if (isWin8) return 'Win8';
		const isWin8_1 = sUserAgent.indexOf('Windows NT 6.3') > -1 || sUserAgent.indexOf('Windows 8.1') > -1;
		if (isWin8_1) return 'Win8.1';
		const isWin10 = sUserAgent.indexOf('Windows NT 6.4') > -1 || sUserAgent.indexOf('Windows 10') > -1;
		if (isWin10) return 'Win10';
		return 'Win';
	}

	const isUnix = (navigator.platform === 'X11') && !isWin && !isMac;
	if (isUnix) return 'Unix';
	

	return 'other';
};
