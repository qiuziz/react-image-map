/*
 * @Author: qiuz
 * @Date: 2019-11-01 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-11 16:12:43
 */

import React from 'react';
import './index.scss';
import { isZhCN } from 'common';

import ZH from './images/zh.png';
import EN from './images/en.png';

interface PropsType {
	className?: string;
	style?: React.CSSProperties;
	activelang?: string;
}

export class LangToggle extends React.Component<PropsType, any> {
	static defaultProps = {
		className: '',
		style: {},
		activelang: isZhCN() ? 'ZH' : 'EN'
	}

	constructor(props: PropsType) {
		super(props);
		this.state = {
			activelang: props.activelang
		}
	}

	static getDerivedStateFromProps(props: PropsType, state: any) {
    if (props.activelang !== state.activelang) {
      return {
        activelang: props.activelang
      };
    }
    return null;
  }

	toggleLang = () => {
		if(isZhCN()) {
			window.location.href = window.location.href.replace(/-cn\/?$/, '');
		} else {
			window.location.href = window.location.href + '-cn';
		}
	}

	public render() {
		const { className, ...rest__props } = this.props;
		const { activelang } = this.state;
		return (
			<div className={`lang-btn ${className}`} {...rest__props} onClick={this.toggleLang}>
				<img src={activelang === 'ZH' ? ZH : EN} alt=""/>
			</div>
		);
	}
}
