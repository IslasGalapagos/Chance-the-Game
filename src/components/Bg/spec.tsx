/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as React from 'react';
import * as testRenderer from 'react-test-renderer';
import debounce from 'lodash-es/debounce';
import {debouncedMock} from '../../../jest/mock-debounce';

import Bg, {StyledCanvas} from '.';

describe('<Bg/>', () => {
  beforeEach(() => {
    (debounce as any).mockClear();
    debouncedMock.mockClear();
  });

  it('renders correctly', () => {
    const treeAndStyles = testRenderer.create(<Bg />).toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  // REFS
  it('has a refs', () => {
    const component = shallow(<Bg />);
    expect(component.instance()).toHaveProperty('canvasRef');
    expect(component.instance()).toHaveProperty('logoRef');
  });

  // CONFIG
  it('has config with data for drawing', () => {
    const component = shallow(<Bg />).instance() as Bg;
    expect(component.gridConfig).toEqual(
      expect.objectContaining({
        ROWS: expect.any(Number),
        COLS: expect.any(Number),
        COLOR: expect.any(String)
      })
    );
  });

  // STATE
  it('has initial state with window sizes & renders with these sizes', () => {
    const component = shallow(<Bg />);
    expect(component.state('width')).toEqual(window.innerWidth);
    expect(component.state('height')).toEqual(
      window.document.body.clientHeight
    );
    const canvas = component.find(StyledCanvas).render();
    expect(canvas.prop('width')).toEqual(`${window.innerWidth}px`);
    expect(canvas.prop('height')).toEqual(
      `${window.document.body.clientHeight}px`
    );
  });

  // EVENT HANDLERS
  it('changes state & rerenders with new sizes on window.resize', () => {
    const component = shallow(<Bg />);
    let canvas = component.find(StyledCanvas).render();
    const sizeForTest = 100;

    expect(component.state('width')).not.toEqual(sizeForTest);
    expect(component.state('height')).not.toEqual(sizeForTest);
    expect(canvas.prop('width')).not.toEqual(`${sizeForTest}px`);
    expect(canvas.prop('height')).not.toEqual(`${sizeForTest}px`);

    window.resizeTo(sizeForTest, sizeForTest);

    canvas = component.find(StyledCanvas).render();
    expect(component.state('width')).toEqual(sizeForTest);
    expect(component.state('height')).toEqual(sizeForTest);
    expect(canvas.prop('width')).toEqual(`${sizeForTest}px`);
    expect(canvas.prop('height')).toEqual(`${sizeForTest}px`);
  });

  it('has state.logoIsLoad, that changes after logo image is loaded', () => {
    const spyOnLogoLoad = jest.spyOn(Bg.prototype, 'onLogoLoad');
    const component = shallow(<Bg />);
    expect(component.state('logoIsLoad')).toEqual(false);
    expect(spyOnLogoLoad).not.toBeCalled();
    component.find('img').simulate('load');
    expect(spyOnLogoLoad).toBeCalledTimes(1);
    expect(component.state('logoIsLoad')).toEqual(true);
  });

  // METHODS & LIFECYCLES
  it('calls draw when logo loaded', () => {
    const spyDraw = jest.spyOn(Bg.prototype, 'draw');
    const component = shallow(<Bg />);
    spyDraw.mockClear();
    (component.instance() as Bg).onLogoLoad();
    expect(spyDraw).toHaveBeenCalled();
  });

  it('calls draw on mount', () => {
    const spyCDM = jest.spyOn(Bg.prototype, 'componentDidMount');
    const spyDraw = jest.spyOn(Bg.prototype, 'draw');
    shallow(<Bg />);
    expect(spyCDM).toHaveBeenCalled();
    expect(spyDraw).toHaveBeenCalled();
  });

  it('calls draw in onResize with debounce', () => {
    const spyDraw = jest.spyOn(Bg.prototype, 'draw');
    expect(debounce).not.toHaveBeenCalled();
    const component = shallow(<Bg />).instance() as Bg;
    expect(debounce).toHaveBeenCalledTimes(1);
    expect(debouncedMock).not.toHaveBeenCalled();
    spyDraw.mockClear();
    component.onResize();
    expect(debouncedMock).toHaveBeenCalledTimes(1);
    expect(spyDraw).toHaveBeenCalledTimes(1);
  });

  it('calls onResize on window.resize', () => {
    const component = shallow(<Bg />).instance() as Bg;
    const spyOnResize = jest.spyOn(component, 'onResize');
    expect(spyOnResize).not.toHaveBeenCalled();
    window.resizeTo(100, 100);
    expect(spyOnResize).toHaveBeenCalledTimes(1);
  });

  it('removes resize handler on unmount', () => {
    window.removeEventListener = jest.fn();
    const component = shallow(<Bg />);
    expect(window.removeEventListener).not.toHaveBeenCalled();
    component.unmount();
    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
