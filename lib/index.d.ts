/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-27 22:05:04
 * @Last Modified by: qiuz
 * @Last Modified time: 2021-05-07 09:34:26
 */

import * as React from 'react';

export interface Area
  extends React.DetailedHTMLProps<React.SpanHTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  left: string;
  top: string;
  height: string;
	width: string;
	style?: React.CSSProperties;
	render?: (area: Area, index: number) => React.ReactNode;
}

export interface ImageMapProps
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  className?: string;
  src: string;
  map?: Area[];
  onClick?: () => void;
  onMapClick?: (area: Area, index: number) => void;
}

export class ImageMap extends React.Component<ImageMapProps> {}
