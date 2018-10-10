/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import {StyledWrapper, View} from './Head.styles';
import {Positions} from '.';

import '../../static/head-default.svg';
import '../../static/head-happy.svg';
import '../../static/head-unhappy.svg';
import '../../static/view.svg';

export const enum Emotions {
  Default = 'default',
  Happy = 'happy',
  Unhappy = 'unhappy'
}

export interface Props {
  position: Positions;
  isMouseEnter: boolean;
  isWin: boolean | null;
}

class Head extends React.PureComponent<Props, {}> {
  constructor(props: any) {
    super(props);

    this.getEmotion = this.getEmotion.bind(this);
  }

  getEmotion(): Emotions {
    switch (this.props.isWin) {
      case true:
        return Emotions.Happy;
        break;
      case false:
        return Emotions.Unhappy;
        break;
      case null:
      default:
        return Emotions.Default;
    }
  }

  render() {
    const {position, isMouseEnter} = this.props;
    const emotion: Emotions = this.getEmotion();

    return (
      <StyledWrapper position={position} emotion={emotion}>
        {isMouseEnter && (
          <View src="./images/view.svg" emotion={emotion} alt="view" />
        )}
        <img src={`./images/head-${emotion}.svg`} alt="head" />
      </StyledWrapper>
    );
  }
}

export default Head;
