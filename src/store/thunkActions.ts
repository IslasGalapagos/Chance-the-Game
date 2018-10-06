/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {StateType} from 'typesafe-actions';
import {ThunkAction} from 'redux-thunk';
import {setScore, setCoefficients, setTotalScore} from './actions';
import reducer from './reducer';

type State = StateType<typeof reducer>;

type ThunkSetScore = ThunkAction<
  void,
  State,
  null,
  ReturnType<typeof setScore>
>;

export const checkAndSetScore = (isWin: boolean): ThunkSetScore => (
  dispatch,
  getState
) => {
  const {score} = getState();
  const newScore: typeof score = [score[0], score[1]];

  newScore[isWin ? 0 : 1] += 1;

  dispatch(setScore(newScore));

  if (newScore.includes(10)) {
    setTimeout(() => {
      newScore[isWin ? 0 : 1] = 0;

      dispatch(setScore(newScore));
    }, 800);
  }
};

type ThunkSetCoefficients = ThunkAction<
  void,
  State,
  null,
  ReturnType<typeof setCoefficients>
>;

export const checkAndSetCoefficients = (
  isWin: boolean
): ThunkSetCoefficients => (dispatch, getState) => {
  const {coefficients} = getState();
  const newCoefficients: typeof coefficients = [
    coefficients[0],
    coefficients[1]
  ];

  newCoefficients[isWin ? 0 : 1] += 1;
  newCoefficients[!isWin ? 0 : 1] = 1;

  dispatch(setCoefficients(newCoefficients));
};

type ThunkSetTotalScore = ThunkAction<
  void,
  State,
  null,
  ReturnType<typeof setTotalScore>
>;

export const computeAndSetTotalScore = (
  isWin: boolean,
  scoreNum: number
): ThunkSetTotalScore => (dispatch, getState) => {
  const {coefficients, totalScore} = getState();
  const newTotalScore: typeof totalScore = [totalScore[0], totalScore[1]];

  const scoringIndex = isWin ? 0 : 1;

  newTotalScore[scoringIndex] += coefficients[scoringIndex] * scoreNum;

  dispatch(setTotalScore(newTotalScore));
};
