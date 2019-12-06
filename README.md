## ImageMap

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/qiuziz/react-image-map/CI/master)
![npm](https://img.shields.io/npm/v/@qiuz/react-image-map)
![David](https://img.shields.io/david/dev/qiuziz/react-image-map)

> A percent react image map compnent


[简体中文](https://github.com/qiuziz/react-image-map/blob/master/README-CN.md)

### Installation
```sh
$ yarn add @qiuz/react-image-map
# or
$ npm install @qiuz/react-image-map
```

### Get mapArea

open [https://qiuziz.github.io/react-image-map](https://qiuziz.github.io/react-image-map/) 

or with `imgSrc`  [https://qiuziz.github.io/react-image-map?imgSrc=img_address](https://qiuziz.github.io/react-image-map?imgSrc=http://5b0988e595225.cdn.sohucs.com/images/20170920/2a178d11bc8b4178a387398b5658e105.jpeg)



![page](https://raw.githubusercontent.com/qiuziz/react-image-map/master/src/assets/images/page.png)

### Usage
```js
import { ImageMap, Area } from '@qiuz/react-image-map'

interface AreaType extends Area {
	href?: string;
}
```

### Example
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
	map={formarMapArea(mapArea)}
	onMapClick={onMapClick}
/>

// in hooks
const ImageMapComponent = React.useMemo(() => <ImageMap className="usage-map" src={img} map={formarMapArea(mapArea)} onMapClick={onMapClick} />, [mapArea, img]);

return (
	...

	{ImageMapComponent}

	...
)
```
