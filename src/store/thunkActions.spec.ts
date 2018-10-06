/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {
  checkAndSetScore,
  checkAndSetCoefficient,
  computeAndSetTotalScore
} from './thunkActions';

jest.useFakeTimers();

describe('actions', () => {
  it('has checkAndSetScore that resets value if it is greater than 10', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce({score: [0, 0]});
    getState.mockReturnValueOnce({score: [9, 0]});
    checkAndSetScore(true)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch.mock.calls[0][0].payload).toEqual([1, 0]);
    dispatch.mockClear();
    checkAndSetScore(true)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch.mock.calls[0][0].payload).toEqual([10, 0]);
    jest.runAllTimers();
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch.mock.calls[1][0].payload).toEqual([0, 0]);
  });

  it('has checkAndSetCoefficient that compare the value with the previous result', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce({coefficient: [1, 1]});
    getState.mockReturnValueOnce({coefficient: [1, 1]});
    getState.mockReturnValueOnce({coefficient: [5, 1]});
    getState.mockReturnValueOnce({coefficient: [1, 5]});

    checkAndSetCoefficient(true)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch.mock.calls[0][0].payload).toEqual([2, 1]);

    checkAndSetCoefficient(false)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch.mock.calls[1][0].payload).toEqual([1, 2]);

    checkAndSetCoefficient(false)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(3);
    expect(dispatch.mock.calls[2][0].payload).toEqual([1, 2]);

    checkAndSetCoefficient(true)(dispatch, getState, null);
    expect(dispatch).toBeCalledTimes(4);
    expect(dispatch.mock.calls[3][0].payload).toEqual([2, 1]);
  });

  it('has computeAndSetTotalScore that multiply constant value on cofficient', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce({coefficient: [1, 1], totalScore: [0, 0]});
    getState.mockReturnValueOnce({coefficient: [1, 1], totalScore: [0, 0]});
    getState.mockReturnValueOnce({coefficient: [5, 1], totalScore: [0, 0]});
    getState.mockReturnValueOnce({coefficient: [1, 5], totalScore: [0, 0]});

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
