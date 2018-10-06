/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import {getType} from 'typesafe-actions';
import StartingScreenContainer, {Wrapper} from './StartingScreenContainer';
import {setName} from '../store/actions';

const mockStore = configureMockStore();

describe('<StartingScreenContainer/>', () => {
  // ACTIONS
  it('has props.setName that dispatch store.setName', () => {
    const store = mockStore({name: ''});
    const component = shallow(<StartingScreenContainer store={store} />);
    expect(component.props().setName).not.toBeUndefined();
    component.props().setName('Diophantus');
    expect(store.getActions()).toEqual([
      expect.objectContaining({
        type: getType(setName),
        payload: 'Diophantus'
      })
    ]);
  });

  // STORE
  it('has props.name', () => {
    const store = mockStore({name: 'Diophantus'});
    const component = shallow(<StartingScreenContainer store={store} />);
    expect(component.props().name).toEqual('Diophantus');
  });

  it('renders nothing when props.name is not equals empty string', () => {
    const component = shallow(
      <Wrapper name="Diophantus" setName={jest.fn()} />
    );
    expect(component.type()).toEqual(null);
  });
});
