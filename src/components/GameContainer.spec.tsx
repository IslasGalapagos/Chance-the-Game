/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
// import Game from './Game';
import GameContainer from './GameContainer';

const mockStore = configureMockStore([thunk]);

jest.useFakeTimers();

describe('<GameContainer/>', () => {
  // ACTIONS
  it('has props.setScore that updates store.score', () => {
    const store = mockStore({score: [9, 1], totalScore: [50, 0]});
    const component = shallow(<GameContainer store={store} />);
    const {setScore} = component.props();
    setScore(true, 500);
    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: 'SET_SCORE',
        payload: [10, 1]
      })
    );
    expect(store.getActions()[1]).toEqual(
      expect.objectContaining({
        type: 'SET_TOTAL_SCORE',
        payload: [550, 0]
      })
    );
    jest.runAllTimers();
    expect(store.getActions()[3]).toEqual(
      expect.objectContaining({
        type: 'SET_SCORE',
        payload: [0, 0]
      })
    );
  });

  it('has props.setCoefficients that updates store.coefficients', () => {
    const store = mockStore({coefficients: [1, 1]});
    const component = shallow(<GameContainer store={store} />);
    const {setCoefficients} = component.props();
    setCoefficients(true);
    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: 'SET_COEFFICIENTS',
        payload: [2, 0]
      })
    );
  });

  it('has props.setTotalScore that updates store.totalScore', () => {
    const store = mockStore({totalScore: [50, 0], coefficients: [2, 1]});
    const component = shallow(<GameContainer store={store} />);
    const {setTotalScore} = component.props();
    setTotalScore(true, 50);
    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: 'SET_TOTAL_SCORE',
        payload: [150, 0]
      })
    );
  });
});
