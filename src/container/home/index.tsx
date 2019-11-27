/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-10-31 20:39:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-26 09:39:10
 */

import React, { useState } from 'react';
import './index.scss';
import { Carousel, SearchBar } from 'antd-mobile';

import NEW from './images/new.png';
import { ImageMap } from 'component';

interface PropsType {
	History: any;
	location: any;
	history: any;
}

const ICON_LIST = [
	{
		img: 'https://yanxuan.nosdn.127.net/25daae363ef6662629d06e70846b983f.png?quality=85&type=webp&imageView&thumbnail=144x144',
		title: '美肤',
	},
	{
		img: 'https://yanxuan.nosdn.127.net/25daae363ef6662629d06e70846b983f.png?quality=85&type=webp&imageView&thumbnail=144x144',
		title: '美肤',
	},
	{
		img: 'https://yanxuan.nosdn.127.net/25daae363ef6662629d06e70846b983f.png?quality=85&type=webp&imageView&thumbnail=144x144',
		title: '美肤',
	},
	{
		img: 'https://yanxuan.nosdn.127.net/25daae363ef6662629d06e70846b983f.png?quality=85&type=webp&imageView&thumbnail=144x144',
		title: '美肤',
	},
	{
		img: 'https://yanxuan.nosdn.127.net/25daae363ef6662629d06e70846b983f.png?quality=85&type=webp&imageView&thumbnail=144x144',
		title: '美肤',
	},
	{
		img: 'https://yanxuan.nosdn.127.net/25daae363ef6662629d06e70846b983f.png?quality=85&type=webp&imageView&thumbnail=144x144',
		title: '美肤',
	},
	{
		img: 'https://yanxuan.nosdn.127.net/25daae363ef6662629d06e70846b983f.png?quality=85&type=webp&imageView&thumbnail=144x144',
		title: '美肤',
	},
	{
		img: 'https://yanxuan.nosdn.127.net/25daae363ef6662629d06e70846b983f.png?quality=85&type=webp&imageView&thumbnail=144x144',
		title: '美肤',
	},
];

export const Home = (props: PropsType) => {

	const [data] = useState(['1', '2', '3']);
	const [primaryIcon] = useState(ICON_LIST);

	return (
		<div className="home">
			<div className="search-box">
				<SearchBar className="search" placeholder="搜索商品" maxLength={8} />
			</div>
			<Carousel
				autoplay
				infinite
			>
				{data.map(val => (
					<a
						key={val}
						href="http://www.alipay.com"
						style={{ display: 'inline-block', width: '100%', }}
					>
						<img
							src={`https://yanxuan.nosdn.127.net/dac8b589005292d74c06bcc6ca4a84d8.jpg?type=webp&imageView&quality=75&thumbnail=750x0`}
							alt=""
							style={{ width: '100%', verticalAlign: 'top' }}
						/>
					</a>
				))}
			</Carousel>
			<div className="primary-icon">
				{
					primaryIcon.map((icon: any, index: number) => {
						return (
							<div className="icon-box" key={index}>
								<img src={icon.img} alt="" />
								<span>{icon.title}</span>
							</div>
						)
					})
				}
			</div>
			<div className="new-gift">
				<p className="title">-新人专享礼-</p>
				<div className="content">
					<ImageMap src={NEW} />
				</div>
			</div>
		</div>
	);
}

