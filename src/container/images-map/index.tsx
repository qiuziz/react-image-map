/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-25 12:55:15
 * @Last Modified by: qiuz
 * @Last Modified time: 2021-01-26 00:54:00
 */

import React from 'react';
import './index.scss';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';
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
    left: '0',
    top: '6',
    height: '12',
    width: '33',
    href: ''
  }
];

const CROP: ReactCrop.Crop = {
  unit: '%',
  x: 0,
  y: 20,
  height: 12,
  width: 33
};

const formatMapArea = (mapArea: any): AreaType[] => {
  return mapArea.map((area: AreaType & { [k: string]: string }) => {
    let result: any = {};
    Object.keys(area).forEach((key: string) => {
      result[key] = key !== 'href' ? `${parseFloat(area[key])}%` : area[key];
    });
    return result;
  });
};

// JSON数据处理
const trycatchHandle = (jsonStr: string) => {
  let result = [];
  try {
    result = JSON.parse(jsonStr);
  } catch (err) {
    console.log(err);
  }
  return result;
};

const { imgSrc, postmessage } = getUrlParams();

export const ImagesMap = () => {
  const [img, setImg] = useState<string>(imgSrc || EXAMPLE);
  const [mapArea, setMapArea] = useState<AreaType[]>(EXAMPLE_AREA);
  const [crop, setCrop] = useState<ReactCrop.Crop>(CROP);
  const [mapAreaString, setMapAreaString] = useState<string>(
    JSON.stringify(formatMapArea(mapArea))
  );
  const [mapAreaFormatString, setMapAreaFormatString] = useState<string>(
    JSON.stringify(formatMapArea(mapArea), null, 4)
  );

  postmessage &&
    window.addEventListener(
      'message',
      (event: any) => {
        console.log(event);
        const { data } = event;
        if (!data) return;
        const mapAreaData = trycatchHandle(data);
        setMapArea(mapAreaData);
        setMapAreaString(JSON.stringify(formatMapArea(mapAreaData)));
        setMapAreaFormatString(JSON.stringify(formatMapArea(mapAreaData), null, 4));
      },
      false
    );

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
  };

  const setMap = (type: string, index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const mapAreaNew = mapArea.map((map: any, idx: number) =>
      index === idx ? { ...map, [type]: value } : map
    );
    setMapArea(mapAreaNew);
    setMapAreaString(JSON.stringify(formatMapArea(mapAreaNew)));
    setMapAreaFormatString(JSON.stringify(formatMapArea(mapAreaNew), null, 4));
  };

  const addSubArea = (type: string, index: number = 0) => () => {
    let newArea = {},
      mapAreaNew: any = [];
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
    setMapAreaString(JSON.stringify(formatMapArea(mapAreaNew)));
    setMapAreaFormatString(JSON.stringify(formatMapArea(mapAreaNew), null, 4));
    message.success('success');
  };

  const onCropChange = (crop: any, percentCrop: any) => {
    setCrop(percentCrop);
  };

  const onMapClick = (area: AreaType, index: number) => {
    const tip = `click map ${area.href || index + 1}`;
    console.log(tip, area);
    message.info(tip);
  };

  const toSetMap = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value: string = e.target.value;
    let result = [];
    try {
      result = JSON.parse(value);
      setMapArea(result);
      setMapAreaString(JSON.stringify(formatMapArea(result)));
      setMapAreaFormatString(JSON.stringify(formatMapArea(result), null, 4));
      message.success('success');
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  };

  const ImageMapComponent = React.useMemo(
    () => (
      <ImageMap
        className="usage-map"
        src={img}
        map={formatMapArea(mapArea)}
        onMapClick={onMapClick}
      />
    ),
    [mapArea, img]
  );

  return (
    <div className="images-map-content">
      <div className="crop-box">
        <div className="map-box">
          <div className="map-box-img">
            <ReactCrop src={img} crop={crop} ruleOfThirds onChange={onCropChange} />
            {img &&
              mapArea.map((map: any, index: number) => (
                <span
                  className="crop-item"
                  key={index}
                  style={{
                    width: `${parseFloat(map.width)}%`,
                    height: `${parseFloat(map.height)}%`,
                    left: `${parseFloat(map.left)}%`,
                    top: `${parseFloat(map.top)}%`
                  }}
                />
              ))}
          </div>
          <div className="map-box-img">{ImageMapComponent}</div>
        </div>
      </div>

      {img &&
        mapArea.map((map: any, index: number) => {
          return (
            <div className="map-area" key={index}>
              <label className="title">map{index + 1}</label>
              <div className="setting-box">
                <div className="setting-box-item">
                  <label>width: </label>
                  <input
                    value={parseFloat(map.width)}
                    type="number"
                    onChange={setMap('width', index)}
                  />
                </div>
                <div className="setting-box-item">
                  <label>height: </label>
                  <input
                    value={parseFloat(map.height)}
                    type="number"
                    onChange={setMap('height', index)}
                  />
                </div>
                <div className="setting-box-item">
                  <label>left: </label>
                  <input
                    value={parseFloat(map.left)}
                    type="number"
                    onChange={setMap('left', index)}
                  />
                </div>
                <div className="setting-box-item">
                  <label>top: </label>
                  <input
                    value={parseFloat(map.top)}
                    type="number"
                    onChange={setMap('top', index)}
                  />
                </div>
                <div className="setting-box-item">
                  <label>href: </label>
                  <input value={map.href} type="text" onChange={setMap('href', index)} />
                </div>
              </div>
              <i className="cad-iconfont icon-sub" onClick={addSubArea('sub', index)} />
            </div>
          );
        })}
      <div className="opt-box">
        <Button
          className="opt-box-btn"
          icon={<i className="cad-iconfont icon-dotted-box" />}
          onClick={addSubArea('add')}
        >
          Add map
        </Button>
        <CopyToClipboard text={mapAreaString} onCopy={() => message.success('copy success')}>
          <Button className="opt-box-btn" icon={<i className="cad-iconfont icon-copy" />}>
            Copy
          </Button>
        </CopyToClipboard>
        <CopyToClipboard text={mapAreaFormatString} onCopy={() => message.success('copy success')}>
          <Button className="opt-box-btn" icon={<i className="cad-iconfont icon-copy" />}>
            Format copy
          </Button>
        </CopyToClipboard>
        <Button className="opt-box-btn" icon={<i className="cad-iconfont icon-image" />}>
          <input type="file" accept="image/*" className="picker-image" onChange={onChange} />
          Select images
        </Button>
      </div>
      <textarea cols={3} value={mapAreaString} onChange={toSetMap} />

      <Button
        href="https://github.com/qiuziz/react-image-map#imagemap"
        target="_blank"
        className="help-btn"
        shape="circle"
        size="large"
        icon={<QuestionOutlined />}
      />
    </div>
  );
};
