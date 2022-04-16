## ImageMap
[![Build Status](https://travis-ci.org/qiuziz/react-image-map.svg?branch=master)](https://travis-ci.org/qiuziz/react-image-map)
![npm](https://img.shields.io/npm/v/@qiuz/react-image-map)
![David](https://img.shields.io/david/dev/qiuziz/react-image-map)

> 一个使用百分比添加热区的`React`组件

### 安装
```sh
$ yarn add @qiuz/react-image-map
# or
$ npm install @qiuz/react-image-map
```

### 获取热区配置

打开 [http://blog.qiuz.site/q/react-image-map/](http://blog.qiuz.site/q/react-image-map/) 

然后选择你自己的图片

你也可以传递`?imgSrc=${url}`参数，比如：

[http://blog.qiuz.site/q/react-image-map/?imgSrc=http://5b0988e595225.cdn.sohucs.com/images/20170920/2a178d11bc8b4178a387398b5658e105.jpeg](http://blog.qiuz.site/q/react-image-map/?imgSrc=http://5b0988e595225.cdn.sohucs.com/images/20170920/2a178d11bc8b4178a387398b5658e105.jpeg)

> `imgSrc`是图片链接地址


![page](https://raw.githubusercontent.com/qiuziz/react-image-map/master/src/assets/images/page.png)

### 使用
```js
import { ImageMap, Area } from '@qiuz/react-image-map';
```


## Props

#### ImageMapProps(extend React.ImgHTMLAttributes)

| Name         | Type                                      | Default |
| :----------- | :---------------------------------------- | :------ |
| `className`  | `String`                                  | `''`    |
| `src`        | `String`                                  | `''`    |
| `onClick`    | `() => void`                              | `noop`  |
| `onMapClick` | `(area: AreaType, index: number) => void` | `noop`  |
| `map`        | `Area[]`                                  | `[]`    |


#### Area(extend React.SpanHTMLAttributes)
| Name         | Type                                            | Default |
| :----------- | :---------------------------------------------- | :------ |
| `left`  		 | `String`                                        | `0`     |
| `top`        | `String`                                        | `0`     |
| `width`      | `String`                                        | `0`     |
| `height`     | `string`                                        | `0`     |
| `style`      | `React.CSSProperties`                           | `{}`    |
| `render`     | `(area: Area, index: number) => React.ReactNode`| `null`  |


## CHANGELOG

- 与React Img标签的Props一致，包括事件和属性（例如 `onMounse` 事件和 `alt` 属性）
- 热区可以通过render参数自定义节点内容(2021.4.9)
- 使用行内样式解决nextjs中样式导入问题(2022.4.16)


### 示例
[在线示例](https://codesandbox.io/s/silent-bash-c6zwx)
```jsx
const img = 'https://images.app.goo.gl/STr3xKQMbdjLketR7';

const mapArea: Area[] = [
  {
    left: '0%',
    top: '6%',
    height: '12%',
    width: '33%',
    style: { background: 'rgba(255, 0, 0, 0.5)' },
    onMouseOver: () => console.log('map onMouseOver')
  },
  {
    width: '33%',
    height: '12%',
    left: '0%',
    top: '36.37931034482759%',
    style: { background: 'rgba(255, 0, 0, 0.5)' },
    render: (area: any, index: number) => (
      <span
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
          background: 'rgba(255, 255, 0, 0.5)'
        }}
      >
        can render map node
      </span>
    ),
    onMouseOver: () => console.log('map onMouseOver')
  }
];

const onMapClick = (area, index) => {
	const tip = `click map${index + 1}`;
	console.log(tip, area);
	alert(tip);
}

<ImageMap
	className="usage-map"
	src={img}
	map={mapArea}
	onMapClick={onMapClick}
/>

// in hooks
const ImageMapComponent = React.useMemo(() => <ImageMap className="usage-map" src={img} map={mapArea} onMapClick={onMapClick} />, [mapArea, img]);

return (
	...

	{ImageMapComponent}

	...
)
```
