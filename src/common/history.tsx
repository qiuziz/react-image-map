import { isZhCN } from "./utils";

/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-01-09 14:54:17
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-01 21:20:07
 */

interface PropType {
	pathname: string;
	search?: string;
	hash?: string;
	state?: object;
}

export const HashHistory = (history: any, location: any) => {
	return {
		push: (params: PropType) => {
			const pathSearch = params.search || '';
			const pathname = isZhCN() ? params.pathname + '-cn' : params.pathname;
			history.push({
				...params,
				pathname,
				search: pathSearch
			});
		},
		go: (n: number) => history.go(n),
		replace: (params: PropType) => {
			const pathSearch = params.search || '';
			const pathname = isZhCN(params.pathname) ? params.pathname : params.pathname.replace(/-cn\/?$/, '');
			history.replace({
				...params,
				pathname,
				search: pathSearch
			});
		},
		goForward: () => history.go(1),
		block: () => history.block(),
		goBack: () => {
			history.goBack();
		}
	}
}