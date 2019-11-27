/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-07 16:03:31
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-26 17:43:21
 */

import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import {
	ImagesMap,
} from './container';

export const routes = [
  {
    path: '/example',
    Component: ImagesMap,
    exact: true,
		title: '分类',
  },
];

const App = () => {
  return (
    <Switch>
      {
        routes.map(({ path, Component, exact, title }: any, index) => {
					return (
						<Route
							key={index}
							path={path}
							exact={exact}
							render={
	              props => <Component {...props} />
							}
            />
          )
        })
      }
      <Redirect to="/home" />
    </Switch>
  )
}

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends React.Component {

  render() {
    return (
      <Router>
        <App />
      </Router>
    )
  }
}