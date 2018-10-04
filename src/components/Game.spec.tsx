/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as testRenderer from 'react-test-renderer';
import * as React from 'react';
import Game, {Positions} from './Game';
import Head from './Head';
import Shells from './Shells';

const positionsArr: Positions[] = [
  Positions.Left,
  Positions.Center,
  Positions.Right
];

describe('<Game/>', () => {
  it('renders correctly', () => {
    const treeAndStyles = testRenderer.create(<Game />).toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  // STATE
  it(`sets 'center' to state.position by default`, () => {
    const component = shallow(<Game />);
    expect(component.state('position')).toEqual(Positions.Center);
  });

  it(`sets false to state.isMouseEnter by default`, () => {
    const component = shallow(<Game />);
    expect(component.state('isMouseEnter')).toEqual(false);
  });

  it(`sets null to state.chosenPosition by default`, () => {
    const component = shallow(<Game />);
    expect(component.state('chosenPosition')).toBeNull();
  });

  it(`sets null to state.isWin by default`, () => {
    const component = shallow(<Game />);
    expect(component.state('isWin')).toEqual(null);
  });

  // METHODS
  it('has move that changes state.position depends on arg & sets true to state.isMouseEnter', () => {
    const component = shallow(<Game />);
    const {move} = component.instance() as Game;
    move(Positions.Left);
    expect(component.state('position')).toEqual(Positions.Left);
    expect(component.state('isMouseEnter')).toEqual(true);
  });

  it('has onMouseLeave that sets false to state.isMouseEnter', () => {
    const component = shallow(<Game />);
    const {onMouseLeave} = component.instance() as Game;
    component.setState({isMouseEnter: true});
    onMouseLeave();
    expect(component.state('isMouseEnter')).toEqual(false);
  });

  it('has random that randomly returns one of Positions', () => {
    const component = shallow(<Game />);
    const {random} = component.instance() as Game;
    const randomsArr: Positions[] = Array.apply(null, {length: 5})
      .map(() => random())
      .sort();

    randomsArr.forEach((x: Positions) => {
      expect(positionsArr).toContain(x);
    });
    expect(randomsArr[0]).not.toEqual(randomsArr[4]);
  });

  it(`has onChoose that takes user's choice, determines win or fail by random & changes state for some time`, () => {
    jest.useFakeTimers();

    const spyRandom = jest.spyOn(Game.prototype, 'random');
    const component = shallow(<Game />);
    const {onChoose} = component.instance() as Game;

    expect(spyRandom).not.toBeCalled();

    onChoose(Positions.Left);
    expect(spyRandom).toBeCalledTimes(1);
    expect(component.state('chosenPosition')).toEqual(Positions.Left);
    expect(component.state('isWin')).toEqual(expect.any(Boolean));

    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 800);
    expect(component.state('chosenPosition')).toBeNull();
    expect(component.state('isWin')).toBeNull();

    jest.restoreAllMocks();
  });

  // HEAD
  it(`sets state.isWin to Head's prop isWin`, () => {
    const component = shallow(<Game />);
    expect(component.find(Head).prop('isWin')).toEqual(
      component.state('isWin')
    );
    component.setState({isWin: true});
    expect(component.find(Head).prop('isWin')).toEqual(true);
  });

  it(`sets state.position to Head's prop position`, () => {
    const component = shallow(<Game />);
    expect(component.find(Head).prop('position')).toEqual(
      component.state('position')
    );
    component.setState({position: Positions.Left});
    expect(component.find(Head).prop('position')).toEqual(Positions.Left);
  });

  it(`sets state.isMouseEnter to Head's prop isMouseEnter`, () => {
    const component = shallow(<Game />);
    expect(component.find(Head).prop('isMouseEnter')).toEqual(
      component.state('isMouseEnter')
    );
    component.setState({isMouseEnter: true});
    expect(component.find(Head).prop('isMouseEnter')).toEqual(true);
  });

  // SHELLS
  it(`sets Game.move  to Shells' prop move`, () => {
    const component = shallow(<Game />);
    const {move} = component.instance() as Game;
    expect(component.find(Shells).prop('move')).toEqual(move);
  });

  it(`sets Game.onMouseLeave to Shells' prop onMouseLeave`, () => {
    const component = shallow(<Game />);
    const {onMouseLeave} = component.instance() as Game;
    expect(component.find(Shells).prop('onMouseLeave')).toEqual(onMouseLeave);
  });

  it(`sets Game.onChoose to Shells' prop onChoose`, () => {
    const component = shallow(<Game />);
    const {onChoose} = component.instance() as Game;
    expect(component.find(Shells).prop('onChoose')).toEqual(onChoose);
  });

  it('sets state.chosenPosition to Shells.chosenPosition', () => {
    const component = shallow(<Game />);
    expect(component.find(Shells).prop('chosenPosition')).toEqual(
      component.state('chosenPosition')
    );
    component.setState({chosenPosition: Positions.Left});
    expect(component.find(Shells).prop('chosenPosition')).toEqual(
      Positions.Left
    );
  });

  it('sets state.isWin to Shells.isWin', () => {
    const component = shallow(<Game />);
    expect(component.find(Shells).prop('isWin')).toEqual(component.state('isWin'));
    component.setState({isWin: true});
    expect(component.find(Shells).prop('isWin')).toEqual(true);
  });
});
