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
import {debouncedMock} from '../../jest/mock-debounce';
import ScreenChecker, {minSizes} from './ScreenChecker';
import Stub from './ScreenChecker.styles';

describe('<ScreenChecker/>', () => {
  beforeEach(() => {
    (debounce as any).mockClear();
    debouncedMock.mockClear();
  });

  it('renders correctly', () => {
    window.resizeTo(minSizes.WIDTH - 1, minSizes.HEIGHT);
    const treeAndStyles = testRenderer.create(<ScreenChecker />).toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  // THIS.MINSIZES
  it('has minSizes', () => {
    expect(minSizes).toEqual(expect.objectContaining({
      WIDTH: expect.any(Number),
      HEIGHT: expect.any(Number)
    }));
  });

  // STATE
  it(`sets bool dependent on ScreenChecker.check's result to state.isSuitable`, () => {
    window.resizeTo(minSizes.WIDTH, minSizes.HEIGHT);

    const spyCheck = jest.spyOn(ScreenChecker.prototype, 'check');
    const component = shallow(<ScreenChecker />);
    expect(spyCheck).toBeCalled();
    expect(spyCheck.mock.results[0].value).toEqual(true);
    expect(component.state('isSuitable')).toEqual(true);

    spyCheck.mockRestore();
  });

  // METHODS
  it('has check that returns bool dependent on window sizes', () => {
    const component = shallow(<ScreenChecker />);
    const {check} = component.instance() as ScreenChecker;
    window.resizeTo(minSizes.WIDTH, minSizes.HEIGHT);
    expect(check()).toEqual(true);
    window.resizeTo(minSizes.WIDTH - 1, minSizes.HEIGHT);
    expect(check()).toEqual(false);
    window.resizeTo(minSizes.WIDTH, minSizes.HEIGHT - 1);
    expect(check()).toEqual(false);
  });

  it('has onResize that calls ScreenChecker.check and sets result to state.isSuitable', () => {
    window.resizeTo(minSizes.WIDTH, minSizes.HEIGHT);

    const spyCheck = jest.spyOn(ScreenChecker.prototype, 'check');
    const component = shallow(<ScreenChecker />);
    expect(component.state('isSuitable')).toEqual(true);
    spyCheck.mockClear();
    const {onResize} = component.instance() as ScreenChecker;
    window.resizeTo(minSizes.WIDTH - 1, minSizes.HEIGHT);
    onResize();
    expect(spyCheck).toBeCalled();
    expect(component.state('isSuitable')).toEqual(false);

    spyCheck.mockRestore();
  });

  it('calls ScreenChecker.check in onResize with debounce', () => {
    const spyCheck = jest.spyOn(ScreenChecker.prototype, 'check');
    expect(debounce).not.toHaveBeenCalled();
    const {onResize} = shallow(<ScreenChecker />).instance() as ScreenChecker;
    expect(debounce).toHaveBeenCalledTimes(1);
    expect(debouncedMock).not.toHaveBeenCalled();
    spyCheck.mockClear();
    onResize();
    expect(debouncedMock).toHaveBeenCalledTimes(1);
    expect(spyCheck).toHaveBeenCalledTimes(1);

    spyCheck.mockRestore();
  });

  // EVENT HANDLERS
  it('sets ScreenChecker.onResize to window.onresize handler on mount', () => {
    const spyCDM = jest.spyOn(ScreenChecker.prototype, 'componentDidMount');
    const spyWindowAEL = jest.spyOn(window, 'addEventListener');
    const {onResize} = shallow(<ScreenChecker />).instance() as ScreenChecker;
    expect(spyCDM).toBeCalledTimes(1);
    expect(spyWindowAEL).toBeCalledTimes(1);
    expect(spyWindowAEL.mock.calls[0][0]).toEqual('resize');
    expect(spyWindowAEL.mock.calls[0][1]).toEqual(onResize);

    spyCDM.mockRestore();
    spyWindowAEL.mockRestore();
  });

  it('remove ScreenChecker.onResize from window.onresize handler on unmount', () => {
    const spyCDU = jest.spyOn(ScreenChecker.prototype, 'componentWillUnmount');
    const spyWindowREL = jest.spyOn(window, 'removeEventListener');
    const component = shallow(<ScreenChecker />);
    const {onResize} = component.instance() as ScreenChecker;
    component.unmount();
    expect(spyCDU).toBeCalledTimes(1);
    expect(spyWindowREL).toBeCalledTimes(1);
    expect(spyWindowREL.mock.calls[0][0]).toEqual('resize');
    expect(spyWindowREL.mock.calls[0][1]).toEqual(onResize);

    spyCDU.mockRestore();
    spyWindowREL.mockRestore();
  });

  // STUB
  it('renders Stub when state.isSuitable is false, otherwise returns null', () => {
    const component = shallow(<ScreenChecker />);
    component.setState({isSuitable: false});
    expect(component.find(Stub).length).toEqual(1);
    component.setState({isSuitable: true});
    expect(component.find(Stub).length).toEqual(0);
  });
});
