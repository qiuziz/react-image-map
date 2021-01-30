import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';

import Router from './router';
import { setGlobalData } from 'common';
import { message } from 'antd';

declare const window: any;
declare let __webpack_public_path__: any;



setGlobalData('PREFIX', '');

/**
 * @see https://qiankun.umijs.org/zh/faq#a-%E4%BD%BF%E7%94%A8-webpack-%E8%BF%90%E8%A1%8C%E6%97%B6-publicpath-%E9%85%8D%E7%BD%AE
 * runtime publicPath 主要解决的是微应用动态载入的 脚本、样式、图片 等地址不正确的问题。
 */
if (window.__POWERED_BY_QIANKUN__) {
  setGlobalData('PREFIX', '/q');
  // eslint-disable-next-line no-unused-vars
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

function render(props: any) {
	const { container } = props;
	message.config({
		getContainer: () => (container || document).querySelector('#root')
	});
  ReactDOM.render(<Router />, (container || document).querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {}

export async function mount(props: any) {
  render(props);
}

export async function unmount(props: any) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode((container || document).querySelector('#root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
