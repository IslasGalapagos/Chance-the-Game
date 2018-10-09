/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import StartingScreen from './StartingScreen/container';
import Bg from './Bg';
import Score from './Score/container';
import TotalScore from './TotalScore/container';
import Game from './Game/container';
import ScreenChecker from './ScreenChecker';
import About from './About';

class App extends React.PureComponent<{}, {}> {
  render() {
    return (
      <React.StrictMode>
        <React.Fragment>
          <ScreenChecker />
          <StartingScreen />
          <Score />
          <TotalScore />
          <Game />
          <About />
          <Bg />
        </React.Fragment>
      </React.StrictMode>
    );
  }
}

export default App;
