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
  z-index: 5;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background: #0000b1;

  span {
    font-family: 'Courier New', Courer;
    font-size: 25px;
    font-weight: bold;
    text-align: center;

    padding: 0 30px;

    color: #fff;

    @media (min-width: 740px) {
      padding: 0;
    }
  }
`;

export default StyledStub;
