/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import {StyledWrapper, StyledShell} from './Shells.styles';
import Ball from './Ball';
import {Positions} from './Game';

import '../static/shell-1.svg';
import '../static/shell-2.svg';
import '../static/shell-3.svg';

export interface Props {
  move: (position: Positions) => void;
  onChoose: (position: Positions) => void;
  onMouseLeave: () => void;
  chosenPosition: Positions | null;
  isWin: boolean | null;
}

class Shells extends React.PureComponent<Props, {}> {
  constructor(props: any) {
    super(props);

    this.onChoose = this.onChoose.bind(this);
  }

  onChoose(position: Positions): () => void {
    return () => {
      this.props.onChoose(position);
    };
  }

  onMouseEnter(position: Positions): () => void {
    return () => {
      this.props.move(position);
    };
  }

  render() {
    const {onMouseLeave, chosenPosition, isWin} = this.props;

    const shells = [Positions.Left, Positions.Center, Positions.Right].map(
      (position, index) => (
        <StyledShell
          src={`./images/shell-${index + 1}.svg`}
          alt={`shell № ${index + 1}`}
          key={position}
          onClick={this.onChoose(position)}
          onMouseEnter={this.onMouseEnter(position)}
          onMouseLeave={onMouseLeave}
          isHidden={chosenPosition !== null && chosenPosition === position}
          middle={index === 1}
        />
      )
    );

    return (
      <StyledWrapper>
        {shells}
        {isWin !== null &&
          chosenPosition !== null && (
            <Ball isWin={isWin} chosenPosition={chosenPosition} />
          )}
      </StyledWrapper>
    );
  }
}

export default Shells;
