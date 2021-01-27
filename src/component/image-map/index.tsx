/*
 * @Author: qiuz
 * @Date: 2019-11-01 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2021-01-27 23:50:01
 */

import React from 'react';
import './index.scss';

import { ImageMapProps, Area } from './index.d';

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
      <img src={src} onClick={onClick} alt="" {...restProps} />
      {map.map((area: Area, index: number) => {
        const { width, height, left, top, style = {}, ...restMapProps } = area;
        return (
          <span
            key={index}
            className={`${className}_map_span-${index}`}
            {...restMapProps}
            style={{ width, height, left, top, ...style }}
            onClick={mapClick(area, index)}
          />
        );
      })}
    </div>
  );
};
