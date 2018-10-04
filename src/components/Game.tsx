/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import StyledWrapper from './Game.styles';
import Head from './Head';
import Shells from './Shells';

export const enum Positions {
  Left = 'left',
  Center = 'center',
  Right = 'right'
}

export interface State {
  readonly position: Positions;
  readonly isMouseEnter: boolean;
  readonly chosenPosition: Positions | null;
  readonly isWin: boolean | null;
}

class Game extends React.PureComponent<{}, State> {
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
  }

  move(position: Positions): void {
    this.setState({
      position,
      isMouseEnter: true
    });
  }

  random(): Positions {
    return [Positions.Left, Positions.Center, Positions.Right][
      Math.floor(Math.random() * 3)
    ];
  }

  onChoose(position: Positions): void {
    this.setState({
      chosenPosition: position,
      isWin: position === this.random()
    });

    setTimeout(() => {
      this.setState({
        chosenPosition: null,
        isWin: null
      });
    }, 800);
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
        <Head
          isWin={isWin}
          position={position}
          isMouseEnter={isMouseEnter}
        />
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
