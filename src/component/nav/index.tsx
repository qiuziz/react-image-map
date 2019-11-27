/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-01 10:57:09
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-01 23:12:34
 */

import './index.scss';
import React from 'react';

import RIGHT from './images/right.png';
import RIGHT_WHITE from './images/right-white.png';
import LEFT from './images/left.png';
import LEFT_WHITE from './images/left-white.png';

interface Props {
	History: any;
	style: React.CSSProperties;
	white: boolean;
}

export class Nav extends React.Component<Props, {}> {

	go = (path: string) => () => {
		this.props.History.push({
			pathname: path
		})
	}

  render () {
		const { style, white } = this.props;
    return (
			<nav className="nav-bar" style={style}>
				<img src={white ? LEFT_WHITE : LEFT} alt="" onClick={this.go('/home')}/>
				<img src={white ? RIGHT_WHITE : RIGHT} alt="" onClick={this.go('/works')}/>
			</nav>
    )
  }
}

