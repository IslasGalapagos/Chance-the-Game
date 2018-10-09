/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow, mount} from 'enzyme';
import * as testRenderer from 'react-test-renderer';
import * as React from 'react';
import StartingScreen, {Header} from '.';
import {Props} from './container';
import LetsStartBlock from './LetsStartBlock';
import InputBlock from './InputBlock';

const props: Props = {
  name: '',
  setName: jest.fn()
};

describe('<StartingScreen/>', () => {
  it('renders correctly', () => {
    const treeAndStyles = testRenderer
      .create(<StartingScreen {...props} />)
      .toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  // STATE
  it(`sets '' to state.inputVal by default`, () => {
    const component = shallow(<StartingScreen {...props} />);
    expect(component.state('inputVal')).toEqual('');
  });

  // METHODS
  it('has onSubmit that calls props.setName with state.inputVal', () => {
    const component = shallow(<StartingScreen {...props} />);
    component.setState({inputVal: 'Diophantus'});
    const {onSubmit} = component.instance() as StartingScreen;
    onSubmit();
    expect(props.setName).toBeCalledTimes(1);
    expect(props.setName).toBeCalledWith('Diophantus');

    (props.setName as any).mockClear();
  });

  // HEADER
  it(`changes text of header-question when state.inputIsFocused is true
      & state.inputVal changes to empty string`, () => {
    const component = mount(<StartingScreen {...props} />);
    const header = component.find('h1');
    const instance = component.instance() as StartingScreen;
    const onInput = instance.onInput as (
      event: {currentTarget: {value: string}}
    ) => void;

    expect(header.text()).toEqual(Header.Question);
    instance.focus(true);
    expect(header.text()).toEqual(Header.Question);

    onInput({currentTarget: {value: 'Diophantus'}});
    expect(header.text()).toEqual(Header.Question);
    onInput({currentTarget: {value: ''}});
    expect(header.text()).toEqual(Header.Asking);

    instance.focus(false);
    expect(header.text()).toEqual(Header.Question);
  });

  // BUTTON
  it('hides button by default, shows when inputVal.length is not equals 0 & state.inputIsFocused is false', () => {
    const component = shallow(<StartingScreen {...props} />);
    expect(component.find(LetsStartBlock).length).toEqual(0);
    component.setState({inputVal: 'Diophantus'});
    expect(component.find(LetsStartBlock).length).toEqual(0);
    component.setState({inputIsFocused: false});
    expect(component.find(LetsStartBlock).length).toEqual(1);
    component.setState({inputIsFocused: true});
    component.setState({inputVal: ''});
    expect(component.find(LetsStartBlock).length).toEqual(0);
  });

  // INPUT
  it('sets isEmpty prop to input wrapper when inputVal.length is equals 0', () => {
    const component = shallow(<StartingScreen {...props} />);
    expect(component.find(InputBlock).prop('isEmpty')).toEqual(true);
    component.setState({inputVal: 'Diophantus'});
    expect(component.find(InputBlock).prop('isEmpty')).toEqual(false);
    component.setState({inputVal: ''});
    expect(component.find(InputBlock).prop('isEmpty')).toEqual(true);
  });

  it(`sets state.inputVal to InputBlock's prop inputVal`, () => {
    const component = shallow(<StartingScreen {...props} />);
    expect(component.find(InputBlock).prop('inputVal')).toEqual('');
    component.setState({inputVal: 'Diophantus'});
    expect(component.find(InputBlock).prop('inputVal')).toEqual('Diophantus');
  });

  // LETSSTART
  it(`sets state.inputVal to LetsStartBlock's prop name`, () => {
    const component = shallow(<StartingScreen {...props} />);
    component.setState({inputVal: 'Diophantus'});
    component.setState({inputIsFocused: false});
    expect(component.find(LetsStartBlock).prop('name')).toEqual('Diophantus');
    component.setState({inputVal: 'Pythagoras'});
    expect(component.find(LetsStartBlock).prop('name')).toEqual('Pythagoras');
  });

  it(`sets onSubmit to LetsStartBlock's onSubmit prop`, () => {
    const component = shallow(<StartingScreen {...props} />);
    component.setState({inputVal: 'Diophantus'});
    component.setState({inputIsFocused: false});
    const {onSubmit} = component.instance() as StartingScreen;
    expect(component.find(LetsStartBlock).prop('onSubmit')).toEqual(onSubmit);
  });
});
