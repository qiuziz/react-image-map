/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-27 22:05:04
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-27 22:26:38
 */

export interface Area {
	left: string;
	top: string;
	height: string;
	width: string;
}

export interface ImageMapProps {
	className?: string;
	src: string;
	map?: AreaTypes[];
	onMapClick?: (index: number) => void;
}