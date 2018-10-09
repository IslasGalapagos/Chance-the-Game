/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as testRenderer from 'react-test-renderer';
import * as React from 'react';
import TotalScore, {Props} from '.';

const props: Props = {
  name: 'Diophantus',
  score: [150, 50],
  coefficients: [2, 1]
};

describe('<TotalScore/>', () => {
  it('renders correctly', () => {
    const treeAndStyles = testRenderer
      .create(<TotalScore {...props} />)
      .toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  // PROPS
  it('sets props.name to username', () => {
    const component = shallow(<TotalScore {...props} />);
    const rows = component.find('li');
    const userName = rows
      .at(0)
      .children()
      .at(1)
      .text()
      .split(': ')[0];
    expect(userName).toEqual(props.name);
  });

  it('shows props.score for user and random', () => {
    const component = shallow(<TotalScore {...props} />);
    const rows = component.find('li');
    const userScore = parseInt(
      rows
        .at(0)
        .text()
        .split(': ')[1],
      10
    );
    const randomScore = parseInt(
      rows
        .at(1)
        .text()
        .split(': ')[1],
      10
    );
    expect(userScore).toEqual(props.score[0]);
    expect(randomScore).toEqual(props.score[1]);
  });

  it('shows coefficients for user and random if it greater than 1', () => {
    const component = shallow(<TotalScore {...props} />);
    let userCoefficient = component
      .find('li')
      .at(0)
      .find('span');
    let randomCoefficient = component
      .find('li')
      .at(1)
      .find('span');
    expect(userCoefficient.length).toEqual(1);
    expect(randomCoefficient.length).toEqual(0);
    const userCoefficientNum = parseInt(userCoefficient.text(), 10);
    expect(userCoefficientNum).toEqual(props.coefficients[0]);

    component.setProps({coefficients: [1, 3]});
    userCoefficient = component
      .find('li')
      .at(0)
      .find('span');
    randomCoefficient = component
      .find('li')
      .at(1)
      .find('span');
    expect(userCoefficient.length).toEqual(0);
    expect(randomCoefficient.length).toEqual(1);
    const randomCoefficientNum = parseInt(randomCoefficient.text(), 10);
    expect(randomCoefficientNum).toEqual(3);
  });
});
