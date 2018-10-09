/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import styled, {keyframes} from 'react-emotion';
import {fontStyles, margin} from './styles';

interface StyledProps {
  isEmpty: boolean;
}

export const StyledInputWrapper = styled('div')<StyledProps>`
  ${() => margin} input {
    border-bottom-color: ${({isEmpty}) => (isEmpty ? '#f55662' : '')};
  }
`;

const animatedLabelKeyframes = keyframes`
  from {
    left: 0;
  }

  50% {
    left: 4px;
  }

  to {
    left: 0;
  }
`;

export const AnimatedLabel = styled('label')`
  ${() => fontStyles} position: relative;
  animation: ${animatedLabelKeyframes} 0.7s ease infinite;
`;

export const StyledInput = styled('input')`
  ${() => fontStyles} width: 241px;
  margin-left: 20px;

  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
`;
