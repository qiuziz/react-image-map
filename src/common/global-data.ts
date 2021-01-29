/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2020-06-01 19:13:52
 * @Last Modified by: qiuz
 * @Last Modified time: 2020-08-11 12:21:44
 */

const globalData: any = {};

const setGlobalData = (key: string, val: any) => {
  globalData[key] = val;
};

const getGlobalData = (key: string) => {
  return globalData[key];
};

export { setGlobalData, getGlobalData };
