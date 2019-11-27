/*
 * @Author: qiuz
 * @Date: 2018-05-24 19:24:46
 * */

import { fetchResource } from './fetchapi';
const API_HOST = '';
const SERVICE_NAME = '/api';

export const Resource = {
	/**
	 * 获取token
	 */
	getToken: fetchResource(`${API_HOST}${SERVICE_NAME}/cgi-bin/token`),
	getImgs: fetchResource(`${API_HOST}${SERVICE_NAME}/tcb/invokecloudfunction`),
};
