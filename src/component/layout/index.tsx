/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-21 16:00:33
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-22 15:06:00
 */

import './index.scss';
import React from 'react';

interface Props {
	children: any;
	History: any;
}

export const LayoutView = (props: Props) => {

	return (
		<section className="layout">
			<main className="layout__content">
				{props.children}
			</main>
		</section>
	
	)
}

