/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import wrapperCSS from './TotalScore.styles';

export interface Props {
  name: string;
  score: [number, number];
  coefficients: [number, number];
}

class TotalScore extends React.PureComponent<Props, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const {name, score, coefficients} = this.props;

    return (
      <ul className={wrapperCSS}>
        <li>
          {coefficients[0] > 1 && <span>{coefficients[0]}</span>}
          {name}: {score[0]}
        </li>
        <li>
          {coefficients[1] > 1 && <span>{coefficients[0]}</span>}
          Random: {score[1]}
        </li>
      </ul>
    );
  }
}

export default TotalScore;
