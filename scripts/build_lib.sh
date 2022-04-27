#! /bin/bash

set -e

function build() {
    DEV=$1
    
    node scripts/build-lib.js
    
    BASE=lib
    
    cp -rf src/component/image-map/index.d.ts $BASE
    
    # create build/index.js
		cat > $BASE/index.js <<- EOT
		var ImageMap = require('./react-image-map.js');
		module.exports = { ImageMap: ImageMap };
		EOT
    
    if [[ $DEV = 'dev' ]]; then
        cp -rf $BASE node_modules/@qiuz/react-image-map
    fi
}


function buildProd() {
    version=$1
    
    VERSION=`npm version ${version:-patch}`
    
    build
    
    # git add .
    # git commit -m '**ImageMap npm build**'
    
    # npm login
    
    npm publish . --tag latest
    
    yarn add @qiuz/react-image-map@${VERSION#*v} -D
    
    git commit -a -m '**Update package.json react-image-map version**'
    
    git push
    
    yarn pages
}

if [[ $BUILD_ENV = 'prod' ]]; then
    npm who am i
    buildProd $@
else
    build $@
fi




