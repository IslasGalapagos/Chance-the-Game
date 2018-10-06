/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import reducer from './reducer';
import {setName, setScore, setCoefficients, setTotalScore} from './actions';

const initialState = reducer(undefined, {} as any);

describe('reducer', () => {
  it('has initial state', () => {
    expect(initialState).toMatchSnapshot();
  });

  it('sets name', () => {
    const action = setName('Diophantus');
    const state = reducer(initialState, action);
    expect(state.name).toEqual('Diophantus');
  });

  it('sets score', () => {
    const action = setScore([2, 1]);
    const state = reducer(initialState, action);
    expect(state.score).toEqual([2, 1]);
  });

  it('sets coefficients', () => {
    const action = setCoefficients([2, 1]);
    const state = reducer(initialState, action);
    expect(state.coefficients).toEqual([2, 1]);
  });

  it('sets totalScore', () => {
    const action = setTotalScore([50, 0]);
    const state = reducer(initialState, action);
    expect(state.totalScore).toEqual([50, 0]);
  });
});
