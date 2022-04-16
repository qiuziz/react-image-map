#! /bin/bash

set -e

function build() {
    
    node scripts/build-lib.js
    
    BASE=lib
    
    # copy files
    # cp -rf package.json $BASE
    # cp -rf README.md $BASE
    cp -rf src/component/image-map/index.d.ts $BASE
    
    # create build/index.js
		cat > $BASE/index.js <<- EOT
		var ImageMap = require('./react-image-map.js');
		module.exports = { ImageMap: ImageMap };
		EOT
}


function buildProd() {
    version=$1
    
    VERSION=`npm version ${version:-patch}`
    
    build
    
    # git add .
    # git commit -m '**ImageMap npm build**'
    
    # npm login
    
    npm publish .
    
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




