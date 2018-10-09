/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import shuffle from 'lodash-es/shuffle';
import StyledWrapper from './Game.styles';
import Head from './Head';
import Shells from './Shells';
import {
  ThunkSetScore,
  ThunkSetCoefficients,
  ThunkSetTotalScore
} from '../store/thunk-actions';

export const enum Positions {
  Left = 'left',
  Center = 'center',
  Right = 'right'
}

export interface Props {
  setScore: (isWin: boolean, prize: number) => ThunkSetScore;
  setTotalScore: (isWin: boolean, scoreNum: number) => ThunkSetCoefficients;
  setCoefficients: (isWin: boolean) => ThunkSetTotalScore;
}

export interface State {
  readonly position: Positions;
  readonly isMouseEnter: boolean;
  readonly chosenPosition: Positions | null;
  readonly isWin: boolean | null;
}

class Game extends React.PureComponent<Props, State> {
  static readonly SCORE_NUM: number = 50;
  static readonly PRIZE: number = 500;

  readonly state: State;

  constructor(props: any) {
    super(props);

    this.state = {
      position: Positions.Center,
      isMouseEnter: false,
      chosenPosition: null,
      isWin: null
    };

    this.move = this.move.bind(this);
    this.onChoose = this.onChoose.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.updateStore = this.updateStore.bind(this);
  }

  move(position: Positions): void {
    this.setState({
      position,
      isMouseEnter: true
    });
  }

  random(): Positions[] {
    const position: Positions[] = shuffle([
      Positions.Left,
      Positions.Center,
      Positions.Right
    ]);
    const oneOrTwo = Math.floor(Math.random() * 4 + 1) === 3 ? 2 : 1;

    return Array.apply(null, {length: oneOrTwo}).map(
      () => position.splice(0, 1)[0]
    );
  }

  onChoose(position: Positions): void {
    const winningPositions: Positions[] = this.random();
    const isWin = winningPositions.includes(position);

    this.setState({
      chosenPosition: position,
      isWin
    });

    setTimeout(() => {
      this.setState({
        chosenPosition: null,
        isWin: null
      });
    }, 800);

    this.updateStore(isWin);
  }

  updateStore(isWin: boolean): void {
    const {setScore, setTotalScore, setCoefficients} = this.props;

    setScore(isWin, Game.PRIZE);
    setTotalScore(isWin, Game.SCORE_NUM);
    setCoefficients(isWin);
  }

  onMouseLeave() {
    this.setState({
      isMouseEnter: false
    });
  }

  render() {
    const {position, isMouseEnter, chosenPosition, isWin} = this.state;

    return (
      <StyledWrapper>
        <Head isWin={isWin} position={position} isMouseEnter={isMouseEnter} />
        <Shells
          move={this.move}
          onChoose={this.onChoose}
          onMouseLeave={this.onMouseLeave}
          chosenPosition={chosenPosition}
          isWin={isWin}
        />
      </StyledWrapper>
    );
  }
}

export default Game;
