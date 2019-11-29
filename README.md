## ImageMap
[![Build Status](https://travis-ci.org/qiuziz/react-image-map.svg?branch=master)](https://travis-ci.org/qiuziz/react-image-map)
[![Coverage Status](https://coveralls.io/repos/github/qiuziz/react-image-map/badge.svg?branch=master)](https://coveralls.io/github/qiuziz/react-image-map?branch=master)

> A React Image Map

### Installation
```sh
$ yarn add @qiuz/react-image-map
# or
$ npm install @qiuz/react-image-map
```

### Get mapArea
open [https://qiuziz.github.io/react-image-map](https://qiuziz.github.io/react-image-map/)

### Usage
```js
import { ImageMap } from '@qiuz/react-image-map'
```

### Example
```jsx
const img = 'https://images.app.goo.gl/STr3xKQMbdjLketR7';

const mapArea = [{"left":"0%","top":"6%","height":"12%","width":"33%"}];

const onMapClick = (index: number) => {
	const tip = `click map${index + 1}`;
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
