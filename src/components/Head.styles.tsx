/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import styled, {keyframes} from 'react-emotion';
import {Emotions} from './Head';
import {Positions} from './Game';

const viewKeyframes = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

interface ViewProps {
  emotion: Emotions;
}

export const View = styled('img')<ViewProps>`
  position: absolute;
  left: 50%;
  top: 144px;
  z-index: 2;

  margin-left: -52px;
  animation: ${({emotion}) =>
    emotion === 'default' ? `${viewKeyframes} 0.3s steps(2) infinite` : ''};
  animation-delay: 0.2s;

  opacity: 0;
`;

const headDefaultKeyframes = keyframes`
  from {
    top: 0;
  }
  50% {
    top: 10px;
  }
  to {
    top: 0;
  }
`;

const headHappyKeyframes = keyframes`
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
`;

const headUnhappyKeyframes = keyframes`
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
`;

interface StyledWrapperProps {
  position: Positions;
  emotion: Emotions;
}

export const StyledWrapper = styled('div')<StyledWrapperProps>`
  position: relative;
  left: ${({position}) => {
    if (position === 'left') {
      return '-236px';
    }

    if (position === 'right') {
      return '236px';
    }

    return '0';
  }};

  margin-bottom: 85px;

  transition: left 0.2s ease;
  animation: ${({emotion}) => {
    if (emotion === 'default') {
      return `${headDefaultKeyframes} 1s ease infinite`;
    }

    if (emotion === 'happy') {
      return `${headHappyKeyframes} 0.4s ease`;
    }

    if (emotion === 'unhappy') {
      return `${headUnhappyKeyframes} 0.4s ease`;
    }

    return '';
  }};
`;
