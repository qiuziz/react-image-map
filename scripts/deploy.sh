#!/bin/bash

set -e

DEPLOY_BRANCH='deploy';

function build_deploy() {
	if [[ -n "$(git status --porcelain)" ]]; then
		echo "Working tree *NOT* clean. Please stash/commit your changes before any operations."
		exit 1
	fi

	current_branch="$(git symbolic-ref --short -q HEAD)"

	if [[ -n "$(git rev-parse --verify --quiet $DEPLOY_BRANCH)" ]]; then
		git branch -D $DEPLOY_BRANCH
	fi

	git checkout -b $DEPLOY_BRANCH

	git push -f origin $DEPLOY_BRANCH:$DEPLOY_BRANCH

	git checkout $current_branch

	git branch -D $DEPLOY_BRANCH

	for branch in $(git for-each-ref --format='%(refname)' refs/remotes/); do
    if [[ $branch =~ "deploy" ]];then
			git push --delete origin ${branch#*refs/remotes/origin/}
			echo $branch
		fi
	done
	# 解决远程分支删除后还是能看到
	git remote show origin

	git remote prune origin
}


build_deploy

