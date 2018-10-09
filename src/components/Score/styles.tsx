/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import styled, {css} from 'react-emotion';

const NumCSS = css`
  font-family: 'Helvetica Neu', Helvetica, Arial;
  font-size: 36px;
  text-align: center;
  position: relative;
  display: inline-block;
  width: 64px;
  box-sizing: border-box;
  border-radius: 50%;

  transition: left 0.2s ease;
`;

interface NumProps {
  className?: string;
  score: number;
}

const Num: React.SFC<NumProps> = ({className, score}) => (
  <div className={`${NumCSS} ${className}`}>{score}</div>
);

interface StyledNumProps {
  user?: boolean;
  gameState: string;
}

export const StyledNum = styled(Num)<StyledNumProps>`
  line-height: ${({user}) => (user ? '60px' : '64px')};

  left: ${({gameState, user}) => {
    if (gameState === 'draw') {
      return user ? '1px' : '-1px';
    }

    return user ? '5px' : '-5px';
  }};
  z-index: ${({gameState, user}) => {
    if (gameState === 'draw') {
      return '';
    }

    if (user) {
      return gameState === 'user_lead' ? '1' : '0';
    }

    return gameState === 'random_lead' ? '1' : '0';
  }};

  background-color: ${({user}) => (user ? '#FCFFDA' : '#49404E')};
  color: ${({user}) => (user ? '#49404E' : '#FCFFDA')};
  border: ${({user}) => (user ? '2px solid #49404E' : '')};
`;

export const StyledWrapper = styled('div')`
  position: absolute;
  top: 35px;
  left: 35px;
  z-index: 1;
`;
