/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-25 12:55:15
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-12-03 16:15:50
 */

import React, { useCallback } from 'react';
import './index.scss';
import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import CopyToClipboard from 'react-copy-to-clipboard';
import { useState, useEffect } from 'react';
// import { ImageMap, Area } from '@qiuz/react-image-map';
import { ImageMap } from 'component';
import { Area } from 'component/image-map/index.d';

import EXAMPLE from './images/example.png';
import { getUrlParams } from 'common';

interface AreaType extends Area {
	href?: string;
}
const EXAMPLE_AREA: AreaType[] = [
	{
		"left": "0",
		"top": "6",
		"height": "12",
		"width": "33",
		"href": ''
	}
];

const CROP: ReactCrop.Crop = {
	unit: "%",
	x: 0,
	y: 6,
	height: 12,
	width: 33,
};

const formarMapArea = (mapArea: any): AreaType[] => {
	return mapArea.map((area: AreaType & {[k: string]: string}) => {
		let result: any = {};
		Object.keys(area).forEach((key: string) => {
			result[key] = key !== 'href' ? `${area[key]}%` : area[key];
		});
		return result;
	});
}

const { imgSrc } = getUrlParams();

export const ImagesMap = () => {
	const [img, setImg] = useState<string>(imgSrc || EXAMPLE);
	const [mapArea, setMapArea] = useState<AreaType[]>(EXAMPLE_AREA);
	const [crop, setCrop] = useState<ReactCrop.Crop>(CROP);
	const [mapAreaString, setMapAreaString] = useState<string>(JSON.stringify(formarMapArea(mapArea)));
	const [mapAreaFormatString, setMapAreaFormatString] = useState<string>(JSON.stringify(formarMapArea(mapArea), null, 4));
	
	useEffect(() => {
		const cropBoxEle: HTMLElement | null = document.querySelector('.ReactCrop');
		const handle = (e: any) => {
			const cropEle: HTMLElement | null = document.querySelector('.ReactCrop__crop-selection');
			if (e.target === cropEle) {
				addSubArea('add')();
			}
		};
		if (cropBoxEle) {
			cropBoxEle.addEventListener('dblclick', handle);
			return () => cropBoxEle.removeEventListener('dblclick', handle);
		}
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
      const reader: FileReader = new FileReader();
      reader.addEventListener('load', () => {
				setImg(reader.result as string);
				setMapArea([]);
				setCrop(CROP);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
	}

	const setMap = (type: string, index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const mapAreaNew = mapArea.map((map: any, idx: number) => index === idx ? { ...map, [type]: value } : map);
		setMapArea(mapAreaNew);
		setMapAreaString(JSON.stringify(formarMapArea(mapAreaNew)));
		setMapAreaFormatString(JSON.stringify(formarMapArea(mapAreaNew), null, 4));
	}

	const addSubArea = (type: string, index: number = 0) => () => {
		let newArea = {}, mapAreaNew: any = [];
		if (type === 'add') {
			const { x, y, width, height } = crop;
			newArea = {
				width: width,
				height: height,
				left: x,
				top: y,
				href: ''
			};
			mapAreaNew = [...mapArea, newArea];
		} else {
			mapArea.splice(index, 1);
			mapAreaNew = [...mapArea];
		}
		setMapArea(mapAreaNew);
		setMapAreaString(JSON.stringify(formarMapArea(mapAreaNew)));
		setMapAreaFormatString(JSON.stringify(formarMapArea(mapAreaNew), null, 4));
	}


	const onCropChange = (crop: any, percentCrop: any) => {
		setCrop(percentCrop);
	}

	const onMapClick = useCallback((area: Area, index: number) => {
		const data = mapArea[index];
		const tip = `click map ${data.href || (index + 1)}`;
		console.log(tip, area);
		alert(tip);
	}, [mapArea]);


	// @ts-ignore
	const ImageMapComponent = React.useMemo(() => <ImageMap className="usage-map" src={img} map={formarMapArea(mapArea)} onMapClick={onMapClick} />, [mapArea, img, onMapClick]);

	return (
		<div className="images-map-content">
			<div className="crop-box">
				<ReactCrop
					src={img}
					crop={crop}
					ruleOfThirds
					style={{ width: '50%' }}
					onChange={onCropChange}
				/>
				<div className="map-box">
					<div className="map-box-img">
						<img src={img} alt="" />
						{
							img &&
							mapArea.map((map: any, index: number) =>
								<span className="crop-item" key={index} style={{
									width: `${map.width}%`,
									height: `${map.height}%`,
									left: `${map.left}%`,
									top: `${map.top}%`,
								}} />
							)
						}
					</div>

				</div>
			</div>
			
			{
				img && mapArea.map((map: any, index: number) => {
					return (
						<div className="map-area" key={index}>
							<label className="title">map{index + 1}</label>
							<div className="setting-box">
								<div className="setting-box-item">
									<label>width: </label>
									<input value={map.width} type="number" onChange={setMap('width', index)} />
								</div>
								<div className="setting-box-item">
									<label>height: </label>
									<input value={map.height} type="number" onChange={setMap('height', index)} />
								</div>
								<div className="setting-box-item">
									<label>left: </label>
									<input value={map.left} type="number" onChange={setMap('left', index)} />
								</div>
								<div className="setting-box-item">
									<label>top: </label>
									<input value={map.top} type="number" onChange={setMap('top', index)} />
								</div>
								<div className="setting-box-item">
									<label>href: </label>
									<input value={map.href} type="text" onChange={setMap('href', index)} />
								</div>
							</div>
							<i className="cad-iconfont icon-sub" onClick={addSubArea('sub', index)} />
						</div>
					)
				})
			}
			<div className="opt-box">
				<button className="cad-iconfont icon-dotted-box" onClick={addSubArea('add')}>Add map</button>
				<CopyToClipboard text={mapAreaString}>
					<button className="cad-iconfont icon-copy" >Copy</button>
				</CopyToClipboard>
				<CopyToClipboard text={mapAreaFormatString}>
					<button className="cad-iconfont icon-copy" >Format copy</button>
				</CopyToClipboard>
				<button className="cad-iconfont icon-image">
					<input
						type="file"
						accept="image/*"
						className="picker-image"
						onChange={onChange}
					/>Select images
				</button>
			</div>
			<textarea cols={3} value={mapAreaString} readOnly />

			<h3>Click on you set of map：</h3>
			<div className="usage">
				{ImageMapComponent}
			</div>
		</div>
	);
}
