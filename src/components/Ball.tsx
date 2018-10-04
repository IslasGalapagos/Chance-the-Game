/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import StyledBall from './Ball.styles';
import {Positions} from './Game';

import '../static/ball-good.svg';
import '../static/ball-bad.svg';

export interface Props {
  chosenPosition: Positions;
  isWin: boolean;
}

class Ball extends React.PureComponent<Props, {}> {
  render() {
    const {isWin, chosenPosition} = this.props;

    return (
      <StyledBall
        src={`./images/ball-${isWin ? 'good' : 'bad'}.svg`}
        isWin={isWin}
        chosenPosition={chosenPosition}
        alt="ball"
      />
    );
  }
}

export default Ball;
