/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import {StyledWrapper, StyledButton} from './LetsStartBlock.styles';


interface Props {
  name: string;
}

class LetsStartBlock extends React.PureComponent<Props, {}> {
  render() {
    const {name} = this.props;

    return (
      <StyledWrapper>
        Hello,&#32;
        <span>{name}</span>
        .&#32;
        <StyledButton type="button">
          Let's play!
        </StyledButton>
      </StyledWrapper>
    );
  }
}

export default LetsStartBlock;
