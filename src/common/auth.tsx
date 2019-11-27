/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-22 16:16:43
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-22 22:02:16
 */

import { Resource } from 'service';
import { LocalStorage } from './local-storage';

export const getToken = (cb?: any) => {
	const token = LocalStorage.getItem('access_token');
	const expiresTime = LocalStorage.getItem('expires_time');
	if (token && expiresTime > new Date().getTime()) {
		console.log('_------------------')
		return;
	}
	Resource.getToken.get({
		grant_type: 'client_credential',
		appid: 'wx78a70364e72a5303',
		secret: '51093d5b68fcca5d212fc7c19c7f74ab'
	}, {auth: true}).then((res: any) => {
		const { access_token, expires_in } = res;
		LocalStorage.setItem('access_token', access_token);
		LocalStorage.setItem('expires_time', new Date().getTime() + expires_in * 1000);
		cb && cb();
	})
}