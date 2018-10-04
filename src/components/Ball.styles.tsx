/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import styled from 'react-emotion';
import {Props} from './Ball';
import {Positions} from './Game';

const StyledBall = styled('img')<Props>`
  position: absolute;
  left: ${({chosenPosition}) => {
    if (chosenPosition === Positions.Left) {
      return '59px';
    }

    if (chosenPosition === Positions.Center) {
      return '297px';
    }

    return '533px';
  }};
  bottom: 20px;
`;

export default StyledBall;
