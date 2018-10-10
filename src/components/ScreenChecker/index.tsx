/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import debounce from 'lodash-es/debounce';
import StyledStub from './styles';

interface MinSizes {
  readonly WIDTH: number;
  readonly HEIGHT: number;
}

export const minSizes: Readonly<MinSizes> = {
  WIDTH: 960,
  HEIGHT: 740
};

interface State {
  readonly isSuitable: boolean;
}

class ScreenChecker extends React.PureComponent<{}, State> {
  readonly state: State;

  onResize = debounce(() => {
    this.setState({
      isSuitable: this.check()
    });
  }, 200);

  constructor(props: any) {
    super(props);

    this.state = {
      isSuitable: this.check()
    };
  }

  check(): boolean {
    const windowWidth: number = window.innerWidth;
    const windowHeight: number = document.body.clientHeight;
    const {WIDTH, HEIGHT} = minSizes;

    if (windowWidth < WIDTH || windowHeight < HEIGHT) {
      return false;
    }

    return true;
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    const {isSuitable} = this.state;
    return (
      <div>
        {!isSuitable ? (
          <StyledStub>
            <span>
              Sorry, but your screen sizes are smaller than required.
              <br />
              Minimum needed: width=960, height=800
            </span>
          </StyledStub>
        ) : null}
      </div>
    );
  }
}

export default ScreenChecker;
