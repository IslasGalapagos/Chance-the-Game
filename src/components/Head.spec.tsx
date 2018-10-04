/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow} from 'enzyme';
import * as testRenderer from 'react-test-renderer';
import * as React from 'react';
import Head, {Emotions, Props} from './Head';
import {View} from './Head.styles';
import {Positions} from './Game';

const props: Props = {
  position: Positions.Center,
  isMouseEnter: false,
  isWin: null
};

describe('<Head/>', () => {
  it('renders correctly', () => {
    const treeAndStyles = testRenderer.create(<Head {...props} />).toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  // METHODS
  it('has getEmotion that return one of Emotions depends on props.isWin', () => {
    const component = shallow(<Head {...props} />);
    const {getEmotion} = component.instance() as Head;
    expect(getEmotion()).toEqual(Emotions.Default);
    component.setProps({isWin: true});
    expect(getEmotion()).toEqual(Emotions.Happy);
    component.setProps({isWin: false});
    expect(getEmotion()).toEqual(Emotions.Unhappy);
  });

  // WRAPPER
  it(`sets wrapper's prop position to props.emotion`, () => {
    const component = shallow(<Head {...props} />);
    expect(component.prop('position')).toEqual(props.position);
  });

  // VIEW
  it('shows View when props.isMouseEnter is equals true', () => {
    const component = shallow(<Head {...props} />);
    expect(component.find(View).length).toEqual(0);
    component.setProps({isMouseEnter: true});
    expect(component.find(View).length).toEqual(1);
  });

  it(`sets View's emotion prop to props.emotion`, () => {
    const component = shallow(<Head {...props} isMouseEnter={true} />);
    expect(component.find(View).prop('emotion')).toEqual(Emotions.Default);
    component.setProps({isWin: true});
    expect(component.find(View).prop('emotion')).toEqual(Emotions.Happy);
  });

  // IMG (Head)
  it(`changes img's src depends on value that returns getEmotion`, () => {
    const component = shallow(<Head {...props} />);
    let headImgSrc = component.find('img[alt="head"]').prop('src');
    component.setProps({isWin: true});
    expect(component.find('img[alt="head"]').prop('src')).not.toEqual(headImgSrc);
    headImgSrc = component.find('img[alt="head"]').prop('src');
    component.setProps({isWin: false});
    expect(component.find('img[alt="head"]').prop('src')).not.toEqual(headImgSrc);
  });
});
