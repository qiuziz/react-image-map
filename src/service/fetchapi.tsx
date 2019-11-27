/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-11-02 14:38:52
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-22 22:28:56
 */

import 'whatwg-fetch';
import { Toast } from 'antd-mobile';
import { getToken } from 'common/auth';
import { LocalStorage } from 'common';

interface ConfigType {
	loadingDelay?: number;
	des?: boolean;
	[propName: string]: any;
}

const TOAST_TIMER = [], ERROR_CODE = [42001, 40014];

let lastRequest: any = null;

// tslint:disable-next-line:variable-name
const fetchMethod = (_url: string, _config: any) => {
	const timer: any = setTimeout(() => {
		TOAST_TIMER[timer] = true;
		Toast.loading(0);
	}, (!_config.loadingDelay && _config.loadingDelay !== 0) ? 1500 : _config.loadingDelay);

	return fetch(_url, _config)
		.then((response) => {
			clearTimeout(timer);
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json().then(undefined, () => Promise.resolve(''));
		})
		.then((res: any) => {
			let result: any;
			console.log(res);
			console.log(_config);
			if (_config.auth) {
				return res;
			}
			if (res.errcode !== 0) {
				if (ERROR_CODE.indexOf(res.errcode) > -1) {
					debugger
					getToken(lastRequest);
					return;
				}
				throw res;
			}
			try {
				result = JSON.parse(res.resp_data);
			} catch {
				result = {};
			}
			return result;
		})
		.catch((err) => {
			clearTimeout(timer);
			throw err;
		});
};

const matchUrlSearchParams = (url: string, urlSearchParams: any) => {
	if (!urlSearchParams) {
		return url.replace(/\/:[^?]+/g, '');
	}
	const u = new URLSearchParams();
	// tslint:disable-next-line:variable-name
	let _url = Object.keys(urlSearchParams).reduce((pre, next) => {
		if (pre.includes(':' + next)) {
			return pre.replace(':' + next, urlSearchParams[next]);
		} else {
			if (urlSearchParams[next] && urlSearchParams[next].constructor === Array) {
				urlSearchParams[next].forEach((value: any) => {
					u.append(next, value);
				});
			} else {
				u.append(next, urlSearchParams[next]);
			}
			return pre;
		}
	}, url);
	// let u = toQueryString(urlSearchParams);
	_url = _url.replace(/\/:[^?]+/g, '');
	return _url + (u.toString() === '' ? '' : '?' + u);
};

class FetchApi {

	headers: any = {};
	url = '';
	// tslint:disable-next-line:variable-name
	constructor(_url: string) {
		this.url = _url;
		this.headers['Content-Type'] = 'application/json;charset=UTF-8';
	}

	get = (urlSearchParams: object, config?: ConfigType) => {
		lastRequest = () => this.get(urlSearchParams, config);
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams), config);
	}

	post = (urlSearchParams?: object, bodyParams?: any, config?: ConfigType) => {
		lastRequest = () => this.post(urlSearchParams, bodyParams, config);

		const access_token = LocalStorage.getItem('access_token');
		const _urlSearchParams = {...urlSearchParams, access_token};
		return fetchMethod(matchUrlSearchParams(this.url, _urlSearchParams),
			{ ...config,
				 method: 'POST',
				 body: JSON.stringify(bodyParams)}
		);
	}

	upload = (urlSearchParams: object, bodyParams: FormData) => {

		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			{
				method: 'POST',
				body: bodyParams
			}
		);
	}

	delete = (urlSearchParams: object, config = { headers: this.headers }) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			{...config,
				method: 'DELETE'}
		);
	}

	put = (urlSearchParams: object, bodyParams: object, config = { headers: this.headers }) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			{ ...config, headers: this.headers,
				 method: 'PUT',
				 body: JSON.stringify(bodyParams)}
		);
	}

	patch = (urlSearchParams: object, bodyParams: object, config = { headers: this.headers }) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			{...config,
				method: 'PATCH',
				body: JSON.stringify(bodyParams)}
		);
	}
}

const fetchResource = (url: string) => {
	return new FetchApi(url);
};

export { fetchResource };
