/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as React from 'react';
import * as testRenderer from 'react-test-renderer';
import About from './About';

jest.useFakeTimers();

describe('<About/>', () => {
  it('renders correctly', () => {
    const treeAndStyles = testRenderer.create(<About />).toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  // STATE
  it('sets false to state.isShown by default', () => {
    const component = shallow(<About />);
    expect(component.state('isShown')).toEqual(false);
  });

  it('sets null to state.timerId by edfault', () => {
    const component = shallow(<About />);
    expect(component.state('timerID')).toEqual(null);
  });

  // METHODS
  it('has onToggle that toggle state.isShown', () => {
    const component = shallow(<About />);
    const {onToggle} = component.instance() as About;

    onToggle();
    expect(component.state('isShown')).toEqual(true);
    onToggle();
    expect(component.state('isShown')).toEqual(false);
  });

  it('has onMouseLeave that sets internal setTimeout id to state.timerID when state.isShown equals true', () => {
    const spyOnToggle = jest.spyOn(About.prototype, 'onToggle');
    const component = shallow(<About />);
    const {onMouseLeave} = component.instance() as About;

    onMouseLeave();
    expect(setTimeout).not.toBeCalled();
    expect(spyOnToggle).not.toBeCalled();

    component.setState({
      isShown: true
    });

    onMouseLeave();
    expect(setTimeout).toBeCalledTimes(1);
    const timerID = (setTimeout as any).mock.results[0].value;
    expect(component.state('timerID')).toEqual(timerID);
    jest.runAllTimers();
    expect(spyOnToggle).toBeCalledTimes(1);
  });

  it('has onMouseEnter that sets null to state.timerID', () => {
    const component = shallow(<About />);
    const {onMouseEnter} = component.instance() as About;
    component.setState({timerID: 123});
    onMouseEnter();
    expect(clearTimeout).not.toBeCalled();
    expect(component.state('timerID')).toEqual(123);
    component.setState({isShown: true});
    onMouseEnter();
    expect(clearTimeout).toBeCalledTimes(1);
    expect(component.state('timerID')).toEqual(null);
  });

  // ABOUT BLOCK
  it('shows about block depending on state.isShown', () => {
    const component = shallow(<About />);
    expect(component.find('.about__text_block').length).toEqual(0);
    component.setState({isShown: true});
    expect(component.find('.about__text_block').length).toEqual(1);
  });

  it(`sets onMouseLeave to about wrapper's`, () => {
    const component = shallow(<About />);
    const {onMouseLeave} = component.instance() as About;
    expect(component.find('.about__inner').props().onMouseLeave).toEqual(
      onMouseLeave
    );
  });

  it(`sets onMouseEnter to about wrapper's`, () => {
    const component = shallow(<About />);
    const {onMouseEnter} = component.instance() as About;
    expect(component.find('.about__inner').props().onMouseEnter).toEqual(
      onMouseEnter
    );
  });

  // BUTTON
  it('sets onToggle to button.onClick', () => {
    const component = shallow(<About />);
    const {onToggle} = component.instance() as About;
    expect(component.find('button').props().onClick).toEqual(onToggle);
  });
});
