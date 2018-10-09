/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import styled, {css, keyframes} from 'react-emotion';

export const StyledWrapper = styled('div')`
  position: relative;

  display: block;
`;

const shellHoverKeyframes = keyframes`
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95, 1.02);
  }
  to {
    transform: scale(1);
  }
`;

const ShellCSS = css`
  display: inline-block;
  vertical-align: bottom;

  cursor: pointer;

  &:hover {
    animation: ${shellHoverKeyframes} 0.2s ease infinite;
    animation-delay: 0.2s;
  }
`;

interface StyledShellProps {
  isHidden: boolean;
  middle?: boolean;
}

export const StyledShell = styled('img')<StyledShellProps>`
  margin: ${({middle}) => (middle ? '0 50px' : '')};

  visibility: ${({isHidden}) => (isHidden ? 'hidden' : '')};

  ${() => ShellCSS};
`;
