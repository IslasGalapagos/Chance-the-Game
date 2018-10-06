/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import ScoreContainer from './ScoreContainer';

const mockStore = configureMockStore();

describe('<ScoreContainer/>', () => {
  // STORE
  it('passes store.score to props.score', () => {
    const store = mockStore({score: [2, 1]});
    const component = shallow(<ScoreContainer store={store} />);
    expect(component.props().score).toEqual([2, 1]);
  });
});
