/*
 * @Author: qiuz
 * @Date: 2019-11-01 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-01 10:54:54
 */

import React from 'react';
import './index.scss';

interface PropsType {
	className?: string;
	style?: React.CSSProperties;
	textUrl?: string;
	imgUrl: string;
	gaussBlur?: boolean;
	onClick?: () => void;
}

export class ImageText extends React.Component<PropsType, any> {
	static defaultProps = {
		className: '',
		style: {},
		textUrl: '',
		imgUrl: '',
		gaussBlur: false,
		onClick: () => { }
	}

	constructor(props: PropsType) {
		super(props);
		this.state = {
		}
	}

	public render() {
		const { className, textUrl, imgUrl, style, gaussBlur, ...rest__props } = this.props;
		return (
			<div className={`image-text__document ${gaussBlur ? 'gauss-blur' : ''} ${className}`} style={{backgroundImage: `url(${imgUrl})`, ...style}} {...rest__props}>
				<img className="image-text__document__text" src={textUrl} alt=""/>
				{/* <img className="image-text__document__img" src={imgUrl} alt=""/> */}
			</div>
		);
	}
}
