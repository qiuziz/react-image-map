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
	onMapClick?: (index: number) => void;
}

export const ImageMap = (props: PropsType) => {
	const { className = '', src = '', map = [], onMapClick = (index: number) => {} } = props;

	const mapClick = (index: number) => () => {
		onMapClick(index);
	}

	return (
		<div className={`image-map__content ${className}`}>
			{console.log(11)}
			<img src={src} alt="" />
			{
				map.map((area: any, index: number) => {
					return (
						<span key={index} style={area} onClick={mapClick(index)}/>
					)
				})
			}
		</div>
	);
}
