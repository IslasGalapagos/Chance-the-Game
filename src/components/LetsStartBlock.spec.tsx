/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as React from 'react';
import LetsStartBlock from './LetsStartBlock';

describe('<LetsStartBlock/>', () => {
  it(`prints props.name in component's text`, () => {
    const component = shallow(<LetsStartBlock name="Diophantus" />);
    expect(component.find('span').text()).toEqual('Diophantus');
  });
});
