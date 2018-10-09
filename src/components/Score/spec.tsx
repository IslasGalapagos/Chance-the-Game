/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as testRenderer from 'react-test-renderer';
import * as React from 'react';
import Score from '.';
import {StyledNum} from './styles';

describe('<Score/>', () => {
  it('renders correctly', () => {
    const treeAndStyles = testRenderer
      .create(<Score score={[0, 0]} />)
      .toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  // PROPS
  it('renders with score from props', () => {
    const component = shallow(<Score score={[1, 2]} />);
    const Nums = component.find(StyledNum);
    expect(
      Nums.at(0)
        .render()
        .text()
    ).toEqual('1');
    expect(
      Nums.at(1)
        .render()
        .text()
    ).toEqual('2');
  });

  it('overlap one element be another, depends on score', () => {
    const component = shallow(<Score score={[1, 1]} />);
    let Nums = component.find(StyledNum);
    expect(Nums.at(0).prop('gameState')).toEqual('draw');
    expect(Nums.at(1).prop('gameState')).toEqual('draw');

    component.setProps({score: [2, 1]});
    Nums = component.find(StyledNum);
    expect(Nums.at(0).prop('gameState')).toEqual('user_lead');
    expect(Nums.at(1).prop('gameState')).toEqual('user_lead');

    const treeAndStyles = testRenderer.create(<Score score={[2, 1]} />);
    expect(treeAndStyles.toJSON()).toMatchSnapshot();

    component.setProps({score: [1, 2]});
    Nums = component.find(StyledNum);
    expect(Nums.at(0).prop('gameState')).toEqual('random_lead');
    expect(Nums.at(1).prop('gameState')).toEqual('random_lead');

    treeAndStyles.update(<Score score={[1, 2]} />);
    expect(treeAndStyles.toJSON()).toMatchSnapshot();
  });
});
