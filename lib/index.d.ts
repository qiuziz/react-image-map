/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-27 22:05:04
 * @Last Modified by: qiuz
 * @Last Modified time: 2020-09-21 18:44:29
 */

import * as React from 'react';

export interface Area {
  left: string;
  top: string;
  height: string;
  width: string;
}

export interface ImageMapProps {
  className?: string;
  src: string;
  map?: Area[];
  onClick?: () => void;
  onMapClick?: (area: Area, index: number) => void;
}

export class ImageMap extends React.Component<ImageMapProps> {}
