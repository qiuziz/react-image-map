/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-07 16:03:31
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-26 17:43:21
 */

import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { HashHistory } from './common';

import { LayoutView as Layout } from './component';

import {
	Home, Category,
} from './container';

export const routes = [
  {
    path: '/home',
    Component: Home,
    exact: true,
		Layout: Layout,
		title: '首页',
		noNav: true
  },
  {
    path: '/category',
    Component: Category,
    exact: true,
		Layout: Layout,
		title: '分类',
		noNav: true
  },
];

const App = () => {
  return (
    <Switch>
      {
        routes.map(({ path, noNav, Layout, Component, exact, title, noPadding, navStyle, white }: any, index) => {
					return (
						<Route
							key={index}
							path={path}
							exact={exact}
							render={
	              props => {
									const { history, location } = props;
	                const History = HashHistory(history, location);
	                title && (document.title = title);
	                return Layout
		                  ? <Layout {...props} History={History} noNav={noNav} navStyle={navStyle} noPadding={noPadding} white={white}>
		                    <Component {...props} History={History} />
		                  </Layout>
		                  : <div>
													<Component {...props} History={History} />
												</div>
	              }
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