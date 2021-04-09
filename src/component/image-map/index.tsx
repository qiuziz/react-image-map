/*
 * @Author: qiuz
 * @Date: 2019-11-01 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2021-04-09 14:56:08
 */

import React from 'react';
import './index.scss';

import { ImageMapProps, Area } from './index.d';
import { isFunction } from './helper';

export const ImageMap = (props: ImageMapProps) => {
  const {
    className = '',
    src = '',
    map = [],
    onMapClick = (area: Area, index: number) => {},
    onClick = () => {},
    ...restProps
  } = props;

  const mapClick = (area: Area, index: number) => () => {
    onMapClick(area, index);
  };

  return (
    <div className={`image-map__content ${className}`}>
      <img className="image-map__content__img" src={src} onClick={onClick} alt="" {...restProps} />
      {map.map((area: Area, index: number) => {
        const { width = 0, height = 0, left = 0, top = 0, style = {}, render, ...restMapProps } = area;
        return (
          <span
            key={index}
            className={`image-map__map ${className}_map_span-${index}`}
            {...restMapProps}
            style={{ width, height, left, top, ...style }}
            onClick={mapClick(area, index)}
          >
            {render && isFunction(render) && render(area, index)}
          </span>
        );
      })}
    </div>
  );
};
