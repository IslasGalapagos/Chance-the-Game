/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import styled, {css} from 'react-emotion';

export const StyledWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  width: 100%;
  height: 100%;
  padding: 35px;
  box-sizing: border-box;

  background-color: #eafff2;
`;

export const fontStyles = css`
  font-family: Arial;
  font-size: 35px;

  color: #333;
`;

export const margin = css`
  margin: 0 0 25px 0;
`;

export const StyledHeader = styled('h1')`
  font-weight: normal;

  ${() => fontStyles}
  ${() => margin}
`;
