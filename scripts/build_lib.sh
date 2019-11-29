#! /bin/bash

set -e

function build() {
	# git_revision=$1

	# if [[ -n "$git_revision" ]]; then
	# 	current_branch="$(git symbolic-ref --short -q HEAD)"
	# 	current_branch=${current_branch:-dev}

	# 	git checkout $git_revision
	# fi

	# install dependencies
	# npm install --registry=https://registry.npm.taobao.org

	# webpack build
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

	cp -rf $BASE/* node_modules/react-image-map

	

	# if [[ -n "$current_branch" ]]; then
	# 	git checkout $current_branch
	# fi
}

build $@

