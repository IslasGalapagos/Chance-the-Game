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
import Count from './Count';
import Game from './Game';

describe('App', () => {
  it('contains <StartingScreen/>', () => {
    const component = shallow(<App />);
    expect(component.contains(<StartingScreen />)).toBeTruthy();
  });

  it('contains <Bg/>', () => {
    const component = shallow(<App />);
    expect(component.contains(<Bg />)).toBeTruthy();
  });

  it('contains <Count/>', () => {
    const component = shallow(<App />);
    expect(component.contains(<Count score={[0, 0]} />)).toBeTruthy();
  });

  it('contains <Game/>', () => {
    const component = shallow(<App />);
    expect(component.contains(<Game />)).toBeTruthy();
  });
});
