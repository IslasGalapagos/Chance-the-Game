/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as testRenderer from 'react-test-renderer';
import * as React from 'react';
import isEqual from 'lodash-es/isEqual';
import Game, {Positions, Props} from '.';
import Head from './Head';
import Shells from './Shells';

const positionsArr: Positions[] = [
  Positions.Left,
  Positions.Center,
  Positions.Right
];

const props: Props = {
  setScore: jest.fn(),
  setTotalScore: jest.fn(),
  setCoefficients: jest.fn()
};

describe('<Game/>', () => {
  beforeEach(() => {
    (props.setScore as any).mockClear();
    (props.setTotalScore as any).mockClear();
    (props.setCoefficients as any).mockClear();
  });

  it('renders correctly', () => {
    const treeAndStyles = testRenderer.create(<Game {...props} />).toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  // STATE
  it(`sets 'center' to state.position by default`, () => {
    const component = shallow(<Game {...props} />);
    expect(component.state('position')).toEqual(Positions.Center);
  });

  it(`sets false to state.isMouseEnter by default`, () => {
    const component = shallow(<Game {...props} />);
    expect(component.state('isMouseEnter')).toEqual(false);
  });

  it(`sets null to state.chosenPosition by default`, () => {
    const component = shallow(<Game {...props} />);
    expect(component.state('chosenPosition')).toBeNull();
  });

  it(`sets null to state.isWin by default`, () => {
    const component = shallow(<Game {...props} />);
    expect(component.state('isWin')).toEqual(null);
  });

  // METHODS
  it('has move that changes state.position depends on arg & sets true to state.isMouseEnter', () => {
    const component = shallow(<Game {...props} />);
    const {move} = component.instance() as Game;
    move(Positions.Left);
    expect(component.state('position')).toEqual(Positions.Left);
    expect(component.state('isMouseEnter')).toEqual(true);
  });

  it('has onMouseLeave that sets false to state.isMouseEnter', () => {
    const component = shallow(<Game {...props} />);
    const {onMouseLeave} = component.instance() as Game;
    component.setState({isMouseEnter: true});
    onMouseLeave();
    expect(component.state('isMouseEnter')).toEqual(false);
  });

  it('has random that returns random Position(s)', () => {
    const component = shallow(<Game {...props} />);
    const {random} = component.instance() as Game;
    const randomsArr: Positions[][] = Array.apply(null, {length: 20}).map(() =>
      random()
    );

    randomsArr.forEach((x: Positions[]) => {
      expect(positionsArr).toEqual(expect.arrayContaining(x));
    });

    const singles = randomsArr.filter((x: Positions[]) => x.length === 1);
    expect(singles.length).not.toEqual(0);
    const tuples = randomsArr.filter((x: Positions[]) => x.length === 2);
    expect(tuples.length).not.toEqual(0);

    expect(singles.length + tuples.length).toEqual(20);

    const isSinglesDiff = singles.some(
      (x: Positions[], index) => index > 0 && x[0] !== singles[index - 1][0]
    );
    expect(isSinglesDiff).toBeTruthy();

    const isTupleasDiff = tuples.some((x: Positions[], index) => {
      x.sort();

      if (index === 0) {
        return false;
      }

      return !isEqual(x[0], tuples[index - 1]);
    });

    expect(isTupleasDiff).toBeTruthy();
  });

  it(`has onChoose that takes user's choice, determines win or fail by random & changes state for some time`, () => {
    jest.useFakeTimers();

    const spyRandom = jest.spyOn(Game.prototype, 'random');
    const component = shallow(<Game {...props} />);
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

  it('has updateStore that calls props.updateScore, props.updateTotalScore and props.updateCoefficients', () => {
    const component = shallow(<Game {...props} />);
    const {updateStore} = component.instance() as Game;
    updateStore(true);
    expect(props.setScore).toBeCalledTimes(1);
    expect(props.setScore).toBeCalledWith(true, expect.any(Number));
    expect(props.setTotalScore).toBeCalledTimes(1);
    expect(props.setTotalScore).toBeCalledWith(true, Game.SCORE_NUM);
    expect(props.setCoefficients).toBeCalledTimes(1);
    expect(props.setCoefficients).toBeCalledWith(true);
  });

  it('calls updateStore in onChoose', () => {
    const spyUpdateStore = jest.spyOn(Game.prototype, 'updateStore');
    const spyRandom = jest.spyOn(Game.prototype, 'random');
    const component = shallow(<Game {...props} />);
    const {onChoose} = component.instance() as Game;
    onChoose(Positions.Left);
    expect(spyUpdateStore).toBeCalledTimes(1);
    expect(spyUpdateStore).toBeCalledWith(
      spyRandom.mock.results[0].value.includes(Positions.Left)
    );
  });

  // HEAD
  it(`sets state.isWin to Head's prop isWin`, () => {
    const component = shallow(<Game {...props} />);
    expect(component.find(Head).prop('isWin')).toEqual(
      component.state('isWin')
    );
    component.setState({isWin: true});
    expect(component.find(Head).prop('isWin')).toEqual(true);
  });

  it(`sets state.position to Head's prop position`, () => {
    const component = shallow(<Game {...props} />);
    expect(component.find(Head).prop('position')).toEqual(
      component.state('position')
    );
    component.setState({position: Positions.Left});
    expect(component.find(Head).prop('position')).toEqual(Positions.Left);
  });

  it(`sets state.isMouseEnter to Head's prop isMouseEnter`, () => {
    const component = shallow(<Game {...props} />);
    expect(component.find(Head).prop('isMouseEnter')).toEqual(
      component.state('isMouseEnter')
    );
    component.setState({isMouseEnter: true});
    expect(component.find(Head).prop('isMouseEnter')).toEqual(true);
  });

  // SHELLS
  it(`sets Game.move  to Shells' prop move`, () => {
    const component = shallow(<Game {...props} />);
    const {move} = component.instance() as Game;
    expect(component.find(Shells).prop('move')).toEqual(move);
  });

  it(`sets Game.onMouseLeave to Shells' prop onMouseLeave`, () => {
    const component = shallow(<Game {...props} />);
    const {onMouseLeave} = component.instance() as Game;
    expect(component.find(Shells).prop('onMouseLeave')).toEqual(onMouseLeave);
  });

  it(`sets Game.onChoose to Shells' prop onChoose`, () => {
    const component = shallow(<Game {...props} />);
    const {onChoose} = component.instance() as Game;
    expect(component.find(Shells).prop('onChoose')).toEqual(onChoose);
  });

  it('sets state.chosenPosition to Shells.chosenPosition', () => {
    const component = shallow(<Game {...props} />);
    expect(component.find(Shells).prop('chosenPosition')).toEqual(
      component.state('chosenPosition')
    );
    component.setState({chosenPosition: Positions.Left});
    expect(component.find(Shells).prop('chosenPosition')).toEqual(
      Positions.Left
    );
  });

  it('sets state.isWin to Shells.isWin', () => {
    const component = shallow(<Game {...props} />);
    expect(component.find(Shells).prop('isWin')).toEqual(
      component.state('isWin')
    );
    component.setState({isWin: true});
    expect(component.find(Shells).prop('isWin')).toEqual(true);
  });

  it('has static constant SCORE_NUM', () => {
    expect(Game.SCORE_NUM).toEqual(50);
  });

  it('has static constant PRIZE', () => {
    expect(Game.PRIZE).toEqual(500);
  });
});
