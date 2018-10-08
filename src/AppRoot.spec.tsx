/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {store} from './AppRoot';
import {setName} from './store/actions';

describe.only('root', () => {
  it('has store with subscriber that write store state to localStorage', () => {
    expect(localStorage.getItem('storeState')).toBeNull();
    store.dispatch(setName('Diophantus'));
    expect(localStorage.getItem('storeState')).not.toBeNull();
  });
  // TODO: Add missing test for preloadState from localStorage
});
