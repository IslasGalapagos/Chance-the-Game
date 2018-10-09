/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import TotalScoreContainer from './container';

const mockStore = configureMockStore();

describe('<TotalScoreContainer/>', () => {
  // STORE
  it('passes store.name to props.name', () => {
    const store = mockStore({name: 'Diophantus'});
    const component = shallow(<TotalScoreContainer store={store} />);
    expect(component.props().name).toEqual('Diophantus');
  });

  it('passes store.totalScore to props.score', () => {
    const store = mockStore({totalScore: [150, 50]});
    const component = shallow(<TotalScoreContainer store={store} />);
    expect(component.props().score).toEqual([150, 50]);
  });

  it('passes store.coefficients to props.coefficients', () => {
    const store = mockStore({coefficients: [2, 1]});
    const component = shallow(<TotalScoreContainer store={store} />);
    expect(component.props().coefficients).toEqual([2, 1]);
  });
});
