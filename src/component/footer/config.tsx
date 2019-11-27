/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-04 20:40:39
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-04 21:36:14
 */

import MAIN from './images/main.png';
import MAIN_S from './images/main-s.png';
import MAIN_CN from './images/main-cn.png';
import MAIN_CN_S from './images/main-cn-s.png';
import { getPathOfLang } from 'common';

export const CONFIG = {
	main: getPathOfLang(MAIN, MAIN_CN),
	mainMapArea: [
		{
			style: {
				position: 'absolute',
				width: '10%',
				height: '10%',
				left: '38%',
				top: '31%',
			},
			data: '/works'
		},
		{
			style: {
				position: 'absolute',
				width: '10%',
				height: '10%',
				left: '38%',
				top: '47%',
			},
			data: '/founder'
		},
		{
			style: {
				position: 'absolute',
				width: '10%',
				height: '10%',
				left: '38%',
				top: '62%',
			},
			data: '/about'
		},
	],
	mainS: getPathOfLang(MAIN_S, MAIN_CN_S),
	mainSMapArea: [
		{
			style: {
				position: 'absolute',
				width: '14%',
				height: '14%',
				left: '46%',
				top: '24%',
			},
			data: '/works'
		},
		{
			style: {
				position: 'absolute',
				width: '14%',
				height: '14%',
				left: '46%',
				top: '46%',
			},
			data: '/founder'
		},
		{
			style: {
				position: 'absolute',
				width: '14%',
				height: '14%',
				left: '46%',
				top: '69%',
			},
			data: '/about'
		},
		{
			style: {
				position: 'absolute',
				width: '14%',
				height: '14%',
				left: '75%',
				top: '23%',
			},
			data: '/contact'
		},
	],
};
