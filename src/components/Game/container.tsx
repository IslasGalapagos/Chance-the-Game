/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import Game from '.';
import {
  checkAndSetScore,
  checkAndSetCoefficients,
  computeAndSetTotalScore
} from '../../store/thunk-actions';
import {setScore, setCoefficients, setTotalScore} from '../../store/actions';
import {State} from '../../store/reducer';

type Actions = ReturnType<
  typeof setScore | typeof setCoefficients | typeof setTotalScore
>;

const mapDispatchToProps = (dispatch: ThunkDispatch<State, null, Actions>) => ({
  setScore: (isWin: boolean, prize: number) =>
    dispatch(checkAndSetScore(isWin, prize)),
  setCoefficients: (isWin: boolean) => dispatch(checkAndSetCoefficients(isWin)),
  setTotalScore: (isWin: boolean, scoreNum: number) =>
    dispatch(computeAndSetTotalScore(isWin, scoreNum))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Game);
