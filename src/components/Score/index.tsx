/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import {StyledWrapper, StyledNum} from './styles';

const enum GameState {
  Draw = 'draw',
  User = 'user_lead',
  Random = 'random_lead'
}

type ScoreT = [number, number];

interface Props {
  score: ScoreT;
}

class Score extends React.PureComponent<Props, {}> {
  constructor(props: any) {
    super(props);
  }

  getGameState(score: ScoreT): GameState {
    const diff = score[0] - score[1];

    switch (diff === 0 ? 0 : diff / Math.abs(diff)) {
      case 1:
        return GameState.User;
        break;
      case -1:
        return GameState.Random;
        break;
      case 0:
        return GameState.Draw;
        break;
      default:
        return GameState.Draw;
    }
  }

  render() {
    const {score} = this.props;
    const gameState = this.getGameState(score);

    return (
      <StyledWrapper>
        <StyledNum score={score[0]} gameState={gameState} user />
        <StyledNum score={score[1]} gameState={gameState} />
      </StyledWrapper>
    );
  }
}

export default Score;
