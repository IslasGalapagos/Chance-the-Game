/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import styled from 'react-emotion';

const StyledStub = styled('div')`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background: #663399;

  span {
    font-family: Arial;
    font-size: 30px;
    text-align: center;

    padding: 0 30px;

    color: #FFF;

    @media (min-width: 7400px) {
      padding: 0;
    }
  }
`;

export default StyledStub;
