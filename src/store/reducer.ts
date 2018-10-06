/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {ActionType, getType} from 'typesafe-actions';
import * as actions from './actions';

type TupleNum = [number, number];

export interface State {
  readonly name: string;
  readonly score: TupleNum;
  readonly coefficient: TupleNum;
  readonly totalScore: TupleNum;
}

const initialState: Readonly<State> = {
  name: '',
  score: [0, 0],
  coefficient: [1, 1],
  totalScore: [0, 0]
};

type Actions = ActionType<typeof actions>;

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case getType(actions.setName):
      return {...state, ...{name: action.payload}};

    case getType(actions.setScore):
      return {...state, ...{score: action.payload}};

    case getType(actions.setCoefficient):
      return {...state, ...{coefficient: action.payload}};

    case getType(actions.setTotalScore):
      return {...state, ...{totalScore: action.payload}};

    default:
      return state;
  }
};

export default reducer;
