/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {setName, setScore, setCoefficient, setTotalScore} from './actions';

jest.useFakeTimers();

describe('actions', () => {
  it('has setName', () => {
    const action = setName('Diophantus');
    expect(action).toEqual({
      type: 'SET_NAME',
      payload: 'Diophantus'
    });
  });

  it('has setScore', () => {
    const action = setScore([1, 0]);
    expect(action).toEqual({
      type: 'SET_SCORE',
      payload: [1, 0]
    });
  });

  it('has setCoefficient', () => {
    const action = setCoefficient([1, 2]);
    expect(action).toEqual({
      type: 'SET_COEFFICIENT',
      payload: [1, 2]
    });
  });

  it('has setTotalScore', () => {
    const action = setTotalScore([150, 50]);
    expect(action).toEqual({
      type: 'SET_TOTAL_SCORE',
      payload: [150, 50]
    });
  });
});
