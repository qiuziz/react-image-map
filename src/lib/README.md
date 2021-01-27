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

open [http://blog.qiuz.site/widget/react-image-map/](http://blog.qiuz.site/widget/react-image-map/)

or with `imgSrc` [http://blog.qiuz.site/widget/react-image-map/?imgSrc=img_address](http://blog.qiuz.site/widget/react-image-map/?imgSrc=http://5b0988e595225.cdn.sohucs.com/images/20170920/2a178d11bc8b4178a387398b5658e105.jpeg)

![page](https://raw.githubusercontent.com/qiuziz/react-image-map/master/src/assets/images/page.png)

### Usage

```js
import {ImageMap, Area} from '@qiuz/react-image-map';

interface AreaType extends Area {
  href?: string;
}
```

## Props

| Name         | Type                                      | Default |
| :----------- | :---------------------------------------- | :------ |
| `className`  | `String`                                  | `''`    |
| `src`        | `String`                                  | `''`    |
| `onClick`    | `() => void`                              | `noop`  |
| `onMapClick` | `(area: AreaType, index: number) => void` | `noop`  |
| `map`        | `Area[]`                                  | `[]`    |

### Example

[online example](https://codesandbox.io/s/silent-bash-c6zwx)

```jsx
const img = 'https://images.app.goo.gl/STr3xKQMbdjLketR7';

const mapArea = [{"left":"0%","top":"6%","height":"12%","width":"33%"}];

const onMapClick = (area: AreaType, index: number) => {
	const tip = `click map${area.href || index + 1}`;
	console.log(tip);
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
