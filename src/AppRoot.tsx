/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import {createStore, applyMiddleware, DeepPartial} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App';
import reducer, {State, initialState} from './store/reducer';

const stateFromLS = localStorage.getItem('storeState');
const preloadStore: DeepPartial<State> =
  stateFromLS !== null ? JSON.parse(stateFromLS) : initialState;

export const store = createStore(reducer, preloadStore, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage.setItem('storeState', JSON.stringify(store.getState()));
});

const AppRoot = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppRoot;
