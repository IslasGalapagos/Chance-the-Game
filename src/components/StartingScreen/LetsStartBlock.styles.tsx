/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import styled, {css, keyframes} from 'react-emotion';
import {fontStyles} from './styles';

const animatedWrapperKeyframes = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const animatedWrapper = css`
  animation: ${animatedWrapperKeyframes} 0.1s ease;
`;

export const StyledWrapper = styled('div')`
  ${() => fontStyles} display: inline-block;

  ${() => animatedWrapper};
`;

export const StyledButton = styled('button')`
  ${() => fontStyles};
  font-style: italic;

  padding: 0;

  background-color: transparent;
  color: #3e3cae;
  border: none;
  border-bottom: 1px solid #3e3cae;
  outline: none;

  cursor: pointer;
`;
