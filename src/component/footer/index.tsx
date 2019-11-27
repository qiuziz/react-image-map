/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-01 10:57:09
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-04 20:57:03
 */

import './index.scss';
import React from 'react';
import { CONFIG } from './config';

const { main, mainMapArea, mainS, mainSMapArea } = CONFIG;

interface Props {
	History: any;
}

const mapArea = window.innerWidth < 600 ? mainSMapArea : mainMapArea;

export class Footer extends React.Component<Props, {}> {


	go = (path: string) => () => {
		this.props.History.push({
			pathname: path
		})
	}

  render () {
    return (
			<footer className="footer">
				<picture>
				  <source srcSet={mainS} media="(max-width: 600px)" />
				  <source srcSet={main} media="(min-width: 600px)" />
				  <img src={main} alt="" />
				</picture>

				{
					mapArea.map((map: any, index: number) => {
						return (
							<span key={index} style={map.style} onClick={this.go(map.data)}></span>
						)
					})
				}
			</footer>
    )
  }
}

