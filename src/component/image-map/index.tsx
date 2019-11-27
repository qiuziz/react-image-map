/*
 * @Author: qiuz
 * @Date: 2019-11-01 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-27 22:27:09
 */

import React from 'react';
import './index.scss';

import { ImageMapProps } from './index.d';

export * from './index.d';

export const ImageMap = (props: ImageMapProps) => {
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
