/*
 * @Author: qiuz
 * @Date: 2019-11-01 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2020-01-14 10:35:03
 */

import React from 'react';
import './index.scss';

import { ImageMapProps, Area } from './index.d';

export const ImageMap = (props: ImageMapProps) => {
	const { className = '', src = '', map = [], onMapClick = (area: Area, index: number) => {}, onClick = () => {} } = props;

	const mapClick = (area: Area, index: number) => () => {
		onMapClick(area, index);
	}

	return (
		<div className={`image-map__content ${className}`}>
			<img src={src} alt="" onClick={onClick}/>
			{
				map.map((area: any, index: number) => {
					return (
						<span key={index} style={area} onClick={mapClick(area, index)}/>
					)
				})
			}
		</div>
	);
}

