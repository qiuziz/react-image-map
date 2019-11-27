/*
 * @Author: qiuz
 * @Date: 2019-11-01 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-25 21:00:37
 */

import React from 'react';
import './index.scss';

interface PropsType {
	className?: string;
	src: string;
	map?: any[];
	onClick?: () => void;
}

export const ImageMap = (props: PropsType) => {
	const { className = '', src = '', map = [], onClick = () => { }, ...rest__props } = props;
	return (
		<div className={`image-map__content ${className}`} {...rest__props} onClick={onClick}>
			<img src={src} alt="" />
			{
				map.map((area: any) => {
					return (
						<span style={area} />
					)
				})
			}
		</div>
	);
}
