#! /bin/bash

set -e

function build() {
	version=$1

	VERSION=`npm version ${version:-patch}`

	node scripts/build-lib.js

	BASE=lib

	# copy files
	cp -rf package.json $BASE
	cp -rf README.md $BASE
	cp -rf src/component/image-map/index.d.ts $BASE

	# create build/index.js
	cat > $BASE/index.js <<- EOT
	require('./react-image-map.css');
	var ImageMap = require('./react-image-map.js');
	module.exports = { ImageMap: ImageMap };
	EOT

	git commit -a -m '**ImageMap npm build**'

	# npm login 

	npm publish lib

	yarn add @qiuz/react-image-map@${VERSION#*v} -D

	git commit -a -m '**Update package.json react-image-map version**'

	git push

	yarn deploy

}

build $@

