/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import StartingScreen from './StartingScreen';
import Bg from './Bg';
import Score from './Score';
import TotalScore from './TotalScore';
import Game from './Game';
import ScreenChecker from './ScreenChecker';

describe('App', () => {
  it('contains <StartingScreen/>', () => {
    const component = shallow(<App />);
    expect(component.contains(<StartingScreen />)).toBeTruthy();
  });

  it('contains <Bg/>', () => {
    const component = shallow(<App />);
    expect(component.contains(<Bg />)).toBeTruthy();
  });

  it('contains <Score/>', () => {
    const component = shallow(<App />);
    expect(component.contains(<Score score={[0, 0]} />)).toBeTruthy();
  });

  it('contains <Game/>', () => {
    const component = shallow(<App />);
    expect(component.contains(<Game />)).toBeTruthy();
  });

  it('contains <ScreenChecker/>', () => {
    const component = shallow(<App />);
    expect(component.contains(<ScreenChecker />)).toBeTruthy();
  });

  it('contains <TotalScore/>', () => {
    const component = shallow(<App />);
    expect(
      component.contains(
        <TotalScore name="Diophantus" score={[150, 50]} coefficients={[5, 1]} />
      )
    ).toBeTruthy();
  });
});
