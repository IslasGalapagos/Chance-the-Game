/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow, mount} from 'enzyme';
import * as testRenderer from 'react-test-renderer';
import * as React from 'react';
import Shells, {Props} from './Shells';
import {StyledShell as Shell} from './Shells.styles';
import Ball from './Ball';
import {Positions} from '.';

const props: Props = {
  move: jest.fn(),
  onChoose: jest.fn(),
  onMouseLeave: jest.fn(),
  chosenPosition: null,
  isWin: null
};

describe('<Shells/>', () => {
  it('renders correctly', () => {
    const treeAndStyles = testRenderer.create(<Shells {...props} />).toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  // SHELL
  it('calls props.onChoose with determined position on click for each shell', () => {
    const spyOnChoose = jest.spyOn(Shells.prototype, 'onChoose');
    const component = mount(<Shells {...props} />);

    expect(spyOnChoose).toBeCalledTimes(3);
    expect(spyOnChoose.mock.calls[0][0]).toEqual(Positions.Left);
    expect(spyOnChoose.mock.calls[1][0]).toEqual(Positions.Center);
    expect(spyOnChoose.mock.calls[2][0]).toEqual(Positions.Right);

    const spyPropsOnChoose = jest.spyOn(props, 'onChoose');

    component.find('img').forEach(el => el.simulate('click'));

    expect(spyPropsOnChoose).toBeCalledTimes(3);
    expect(spyPropsOnChoose.mock.calls[0][0]).toEqual(Positions.Left);
    expect(spyPropsOnChoose.mock.calls[1][0]).toEqual(Positions.Center);
    expect(spyPropsOnChoose.mock.calls[2][0]).toEqual(Positions.Right);
  });

  it('calls props.move with determined position on mouseenter for each shell', () => {
    const spyOnMouseEnter = jest.spyOn(Shells.prototype, 'onMouseEnter');
    const component = mount(<Shells {...props} />);

    expect(spyOnMouseEnter).toBeCalledTimes(3);
    expect(spyOnMouseEnter.mock.calls[0][0]).toEqual(Positions.Left);
    expect(spyOnMouseEnter.mock.calls[1][0]).toEqual(Positions.Center);
    expect(spyOnMouseEnter.mock.calls[2][0]).toEqual(Positions.Right);

    const spyMove = jest.spyOn(props, 'move');

    component.find('img').forEach(el => el.simulate('mouseenter'));

    expect(spyMove).toBeCalledTimes(3);
    expect(spyMove.mock.calls[0][0]).toEqual(Positions.Left);
    expect(spyMove.mock.calls[1][0]).toEqual(Positions.Center);
    expect(spyMove.mock.calls[2][0]).toEqual(Positions.Right);
  });

  it('calls props.onMouseLeave on mouseleave for each shell', () => {
    const spyonMouseLeave = jest.spyOn(props, 'onMouseLeave');
    const component = mount(<Shells {...props} />);

    expect(spyonMouseLeave).toBeCalledTimes(0);

    component.find('img').forEach(el => el.simulate('mouseleave'));

    expect(spyonMouseLeave).toBeCalledTimes(3);
  });

  it('sets bool dependent on props.chosenPosition to Shell.isHidden', () => {
    const component = shallow(<Shells {...props} />);

    const hiddenShells = component
      .find(Shell)
      .filterWhere(el => el.prop('isHidden') === true);

    expect(hiddenShells.length).toEqual(0);

    component.setProps({chosenPosition: Positions.Left});
    const shells = component.find(Shell);
    expect(shells.at(0).prop('isHidden')).toEqual(true);
    expect(shells.at(1).prop('isHidden')).toEqual(false);
    expect(shells.at(2).prop('isHidden')).toEqual(false);
  });

  // BALL
  it('shows ball when props.isWin is not null & props.chosenPosition is not null', () => {
    const component = shallow(<Shells {...props} />);
    expect(component.find(Ball).length).toEqual(0);
    component.setProps({isWin: true, chosenPosition: Positions.Center});
    expect(component.find(Ball).length).toEqual(1);
  });

  it(`sets props.isWin to Ball's isWin`, () => {
    const component = shallow(
      <Shells {...props} isWin={true} chosenPosition={Positions.Center} />
    );
    expect(component.find(Ball).prop('isWin')).toEqual(true);
  });

  it(`sets props.chosenPosition to Ball's chosenPosition`, () => {
    const component = shallow(
      <Shells {...props} isWin={true} chosenPosition={Positions.Center} />
    );
    expect(component.find(Ball).prop('chosenPosition')).toEqual(
      Positions.Center
    );
  });
});
