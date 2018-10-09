/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow, mount} from 'enzyme';
import * as React from 'react';
import LetsStartBlock, {Props} from './LetsStartBlock';

const props: Props = {
  name: 'Diophantus',
  onSubmit: () => 'onSubmit'
};

describe('<LetsStartBlock/>', () => {
  it(`prints props.name in component's text`, () => {
    const component = shallow(<LetsStartBlock {...props} />);
    expect(component.find('span').text()).toEqual('Diophantus');
  });

  it(`sets props.onSubmit to button's onClick`, () => {
    const component = mount(<LetsStartBlock {...props} />);
    expect(component.find('button').prop('onClick')).toEqual(props.onSubmit);
  });
});
