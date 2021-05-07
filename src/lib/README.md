## ImageMap

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/qiuziz/react-image-map/CI?label=Github%20Actions)](https://github.com/qiuziz/react-image-map/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/@qiuz/react-image-map)](https://www.npmjs.com/package/@qiuz/react-image-map)

> A percent react image map compnent

[简体中文](https://github.com/qiuziz/react-image-map/blob/master/README-CN.md)

### Installation

```sh
$ yarn add @qiuz/react-image-map
# or
$ npm install @qiuz/react-image-map
```

### Get mapArea

open [http://blog.qiuz.site/q/react-image-map/](http://blog.qiuz.site/q/react-image-map/)

and select yourself img


you can add `?imgSrc=${url}` like:

[http://blog.qiuz.site/q/react-image-map/?imgSrc=http://5b0988e595225.cdn.sohucs.com/images/20170920/2a178d11bc8b4178a387398b5658e105.jpeg](http://blog.qiuz.site/q/react-image-map/?imgSrc=http://5b0988e595225.cdn.sohucs.com/images/20170920/2a178d11bc8b4178a387398b5658e105.jpeg)


> `imgSrc` is img url

![page](https://raw.githubusercontent.com/qiuziz/react-image-map/master/src/assets/images/page.png)

### Usage

```js
import { ImageMap } from '@qiuz/react-image-map';
```

## Props

#### ImageMapProps(extend React.ImgHTMLAttributes)

| Name         | Type                                      | Default |
| :----------- | :---------------------------------------- | :------ |
| `className`  | `String`                                  | `''`    |
| `src`        | `String`                                  | `''`    |
| `onClick`    | `() => void`                              | `noop`  |
| `onMapClick` | `(area: Area, index: number) => void`     | `noop`  |
| `map`        | `Area[]`                                  | `[]`    |




#### Area(extend React.SpanHTMLAttributes)
| Name         | Type                                            | Default |
| :----------- | :--------------------------------------------   | :------ |
| `left`  		 | `String`                                        | `0`     |
| `top`        | `String`                                        | `0`     |
| `width`      | `String`                                        | `0`     |
| `height`     | `string`                                        | `0`     |
| `style`      | `React.CSSProperties`                           | `{}`    |
| `render`     | `(area: Area, index: number) => React.ReactNode`| `null`  |

## CHANGELOG

- access all React.Img props, including events and attributes(like onMounse events and img alt attr.)
- image map can use render to custom your ReactNode(2021.4.9))

### Example

[online example](https://codesandbox.io/s/silent-bash-c6zwx)

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
