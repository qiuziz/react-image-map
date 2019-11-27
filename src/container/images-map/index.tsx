/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-25 12:55:15
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-27 18:14:20
 */

import * as React from 'react';
import './index.scss';
import { ImagePicker, Toast, Button } from 'antd-mobile';
import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import CopyToClipboard from 'react-copy-to-clipboard';
import EXAMPLE from './images/example.png';
import { useState, useEffect } from 'react';
import { ImageMap } from 'component';
const EXAMPLE_AREA = [
	{
		"left": "0",
		"top": "6",
		"height": "12",
		"width": "33",
	}
];
const CROP: ReactCrop.Crop = {
	unit: "%",
	x: 0,
	y: 6,
	height: 12,
	width: 33,
};

const formarMapArea = (mapArea: any) => {
	return mapArea.map((area: any) => {
		let result: any = {};
		Object.keys(area).forEach((key: string) => {
			result[key] = `${area[key]}%`;
		});
		return result;
	});
}

export const ImagesMap = (props: any) => {
	const [img, setImg] = useState(EXAMPLE);
	const [mapArea, setMapArea] = useState(EXAMPLE_AREA);
	const [crop, setCrop] = useState(CROP);
	const [mapAreaString, setMapAreaString] = useState(JSON.stringify(formarMapArea(mapArea)));

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

	const onChange = (files: any) => {
		const [data = { url: '' }] = files;
		setImg(data.url);
		setMapArea([]);
		setCrop(CROP);
	}

	const setMap = (type: string, index: number) => (e: any) => {
		const value = e.target.value;
		setMapArea(mapArea.map((map: any, idx: number) => index === idx ? { ...map, [type]: value } : map));
	}

	const addSubArea = (type: string, index: number = 0) => () => {
		let newArea = {}, mapAreaNew: any = [];
		if (type === 'add') {
			const { x, y, width, height } = crop;
			newArea = {
				width: width,
				height: height,
				left: x,
				top: y
			};
			mapAreaNew = [...mapArea, newArea];
		} else {
			mapArea.splice(index, 1);
			mapAreaNew = [...mapArea];
		}
		setMapArea(mapAreaNew);
		setMapAreaString(JSON.stringify(formarMapArea(mapAreaNew)));
	}


	const onCropChange = (crop: any, percentCrop: any) => {
		setCrop(percentCrop);
	}

	const onMapClick = (index: number) => {
		const tip = `当前点击：热区${index + 1}`;
		console.log(tip);
		alert(tip);
	}


	const ImageMapComponent = React.useMemo(() => <ImageMap className="usage-map" src={img} map={formarMapArea(mapArea)} onMapClick={onMapClick} />, [mapArea, img]);

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
							<label className="title">热区{index + 1}</label>
							<div className="setting-box">
								<div className="setting-box-item">
									<label>宽: </label>
									<input value={map.width} type="number" onChange={setMap('width', index)} />
								</div>
								<div className="setting-box-item">
									<label>高: </label>
									<input value={map.height} type="number" onChange={setMap('height', index)} />
								</div>
								<div className="setting-box-item">
									<label>左边距: </label>
									<input value={map.left} type="number" onChange={setMap('left', index)} />
								</div>
								<div className="setting-box-item">
									<label>上边距: </label>
									<input value={map.top} type="number" onChange={setMap('top', index)} />
								</div>
							</div>
							<i className="cad-iconfont icon-sub" onClick={addSubArea('sub', index)} />
						</div>
					)
				})
			}
			<div className="opt-box">
				<Button className="cad-iconfont icon-dotted-box" onClick={addSubArea('add')}>添加热区</Button>
				<CopyToClipboard text={mapAreaString} onCopy={() => Toast.info('已复制到剪贴板')}>
					<Button className="cad-iconfont icon-copy" >复制</Button>
				</CopyToClipboard>
				<Button className="cad-iconfont icon-image">
					<ImagePicker
						className="picker-image"
						length={1}
						onChange={onChange}
					/>选择图片
				</Button>
			</div>
			<textarea cols={3} value={mapAreaString} readOnly />

			<h3>点击设置的热区：</h3>
			<div className="usage">
				{ImageMapComponent}
			</div>
		</div>
	);
}
