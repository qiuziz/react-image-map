/*
 * @Author: qiuz
 * @Date: 2019-11-01 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2022-04-16 15:04:22
 */

import React from 'react';
import Style from './style';

import { ImageMapProps, Area } from './index.d';
import { isFunction } from './helper';

export const ImageMap = (props: ImageMapProps) => {
  const {
    className = '',
    src = '',
    map = [],
    onMapClick = (area: Area, index: number) => {},
    onClick = () => {},
    style = {},
    ...restProps
  } = props;

  const mapClick = (area: Area, index: number) => () => {
    onMapClick(area, index);
  };

  return (
    <div className={`image-map__content ${className}`} style={Style.content}>
      <img
        className="image-map__content__img"
        src={src}
        onClick={onClick}
        alt=""
        style={{ ...Style.img, ...style }}
        {...restProps}
      />
      {map.map((area: Area, index: number) => {
        const {
          width = 0,
          height = 0,
          left = 0,
          top = 0,
          style = {},
          render,
          ...restMapProps
        } = area;
        return (
          <span
            key={index}
            className={`image-map__map ${className}_map_span-${index}`}
            {...restMapProps}
            style={{ ...Style.map, width, height, left, top, ...style }}
            onClick={mapClick(area, index)}
          >
            {render && isFunction(render) && render(area, index)}
          </span>
        );
      })}
    </div>
  );
};
