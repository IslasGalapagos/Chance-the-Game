/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as testRenderer from 'react-test-renderer';
import * as React from 'react';
import Ball, {Props} from './Ball';
import {Positions} from './Game';

const props: Props = {
  chosenPosition: Positions.Left,
  isWin: true
};

describe('<Ball />', () => {
  it('renders correctly', () => {
    const treeAndStyles = testRenderer.create(<Ball {...props} />).toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  it('sets props.chosenPosition to wrapper.chosenPosition', () => {
    const component = shallow(<Ball {...props} />);
    expect(component.prop('chosenPosition')).toEqual(props.chosenPosition);
  });

  it('sets props.isWin to wrapper.isWin', () => {
    const component = shallow(<Ball {...props} />);
    expect(component.prop('isWin')).toEqual(props.isWin);
  });

  it(`changes img's src depends on props.isWin`, () => {
    const component = shallow(<Ball {...props} />);
    const imgSrc = component.prop('src');
    component.setProps({isWin: false});
    expect(component.prop('src')).not.toEqual(imgSrc);
  });
});
