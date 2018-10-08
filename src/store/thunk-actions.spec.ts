/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {
  checkAndSetScore,
  checkAndSetCoefficients,
  computeAndSetTotalScore
} from './thunk-actions';

jest.useFakeTimers();

describe('thunk actions', () => {
  it('has checkAndSetScore that resets value if it is greater than 10', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce({score: [0, 0]});
    getState.mockReturnValueOnce({score: [9, 1]});
    getState.mockReturnValueOnce({totalScore: [50, 0]});

    checkAndSetScore(true, 500)(dispatch, getState, null);

    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        type: 'SET_SCORE',
        payload: [1, 0]
      })
    );

    dispatch.mockClear();

    checkAndSetScore(true, 500)(dispatch, getState, null);

    expect(dispatch).toBeCalledTimes(3);
    expect(dispatch.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        type: 'SET_SCORE',
        payload: [10, 1]
      })
    );
    expect(dispatch.mock.calls[1][0]).toEqual(
      expect.objectContaining({
        type: 'SET_TOTAL_SCORE',
        payload: [550, 0]
      })
    );
    expect(dispatch.mock.calls[2][0]).toEqual(
      expect.objectContaining({
        type: 'SET_COEFFICIENTS',
        payload: [0, 0]
      })
    );
    jest.runAllTimers();
    expect(dispatch).toBeCalledTimes(4);
    expect(dispatch.mock.calls[3][0]).toEqual(
      expect.objectContaining({
        type: 'SET_SCORE',
        payload: [0, 0]
      })
    );
  });

  it('has checkAndSetCoefficients that compare the value with the previous result', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce({coefficients: [1, 1]});
    getState.mockReturnValueOnce({coefficients: [1, 1]});
    getState.mockReturnValueOnce({coefficients: [5, 1]});
    getState.mockReturnValueOnce({coefficients: [1, 5]});

    checkAndSetCoefficients(true)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch.mock.calls[0][0].payload).toEqual([2, 0]);

    checkAndSetCoefficients(false)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch.mock.calls[1][0].payload).toEqual([0, 2]);

    checkAndSetCoefficients(false)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(3);
    expect(dispatch.mock.calls[2][0].payload).toEqual([0, 2]);

    checkAndSetCoefficients(true)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(4);
    expect(dispatch.mock.calls[3][0].payload).toEqual([2, 0]);
  });

  it('has computeAndSetTotalScore that multiply constant value on cofficient', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce({coefficients: [0, 0], totalScore: [0, 0]});
    getState.mockReturnValueOnce({coefficients: [0, 0], totalScore: [0, 0]});
    getState.mockReturnValueOnce({coefficients: [5, 1], totalScore: [0, 0]});
    getState.mockReturnValueOnce({coefficients: [1, 5], totalScore: [0, 0]});

    computeAndSetTotalScore(true, 50)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch.mock.calls[0][0].payload).toEqual([50, 0]);

    computeAndSetTotalScore(false, 50)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch.mock.calls[1][0].payload).toEqual([0, 50]);

    computeAndSetTotalScore(true, 50)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(3);
    expect(dispatch.mock.calls[2][0].payload).toEqual([250, 0]);

    computeAndSetTotalScore(false, 50)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(4);
    expect(dispatch.mock.calls[3][0].payload).toEqual([0, 250]);
  });
});
