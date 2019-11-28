/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-28 10:30:01
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-28 13:30:59
 */

import * as React from 'react';
import { render, mount } from 'enzyme';
import { ImageMap } from '../index';
import EXAMPLE from '../../images/example.png';

describe('ImagePicker', () => {
  it('renders correctly', () => {
    const renderDom = render(
      <ImageMap />,
    );

    expect(renderDom).toMatchSnapshot();
	});
	
  it('renders className correctly', () => {
    const wrapper = mount(
			<ImageMap
				className="image-map-test"
				src={EXAMPLE}
      />,
		);
		
    expect(wrapper.find(".image-map-test").exists());
	});

  it('renders img correctly', () => {
    const wrapper = mount(
      <ImageMap
				src={EXAMPLE}
      />,
		);
		
    // show img
    expect(wrapper.find("img").prop("src")).toEqual(EXAMPLE);

	});
	
	it('render map correctly', () => {
		const wrapper = mount(
      <ImageMap
				src={EXAMPLE}
      />,
		);

		expect(wrapper.find("span").length).toEqual(0);
		
		const mapArea = [{"left":"0%","top":"6%","height":"12%","width":"33%"}];
		const wrapperMap = mount(
      <ImageMap
				src={EXAMPLE}
				map={mapArea}
      />,
		);

		expect(wrapperMap.find("span").length).toEqual(1);
	});

	it('Test click event', () => {
		const mockCallBack = jest.fn(index => index);
		const mapArea = [{"left":"0%","top":"6%","height":"12%","width":"33%"}];
		const wrapperMapClick = mount(
      <ImageMap
				src={EXAMPLE}
				map={mapArea}
				onMapClick={mockCallBack}
      />,
		);
		const map1 = wrapperMapClick.find('span').at(0);

		expect(map1.exists());

		map1.simulate('click');
		
		expect(mockCallBack).toBeCalledWith(0);
  });

});
