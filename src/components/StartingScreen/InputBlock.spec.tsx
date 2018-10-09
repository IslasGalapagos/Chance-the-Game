/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {shallow, mount} from 'enzyme';
import * as React from 'react';
import InputBlock, {Props} from './InputBlock';

const props: Props = {
  isEmpty: false,
  inputVal: 'Diophantus',
  onInput: () => 'onInput',
  focus: () => 'focus'
};

describe('<InputBlock/>', () => {
  // PROPS
  it(`sets props.isEmpty to wrapper's isEmpty prop`, () => {
    const component = shallow(<InputBlock {...props} />);
    expect(component.prop('isEmpty')).toEqual(props.isEmpty);
  });

  it(`sets props.inputVal to input's value`, () => {
    const component = mount(<InputBlock {...props} />);
    expect(component.find('input').prop('value')).toEqual('Diophantus');
    component.setProps({inputVal: 'Pythagoras'});
    expect(component.find('input').prop('value')).toEqual('Pythagoras');
  });

  // EVENT HANDLERS
  it(`calls props.onInput on input change event`, () => {
    const spyOnInput = jest.spyOn(props, 'onInput');
    const component = mount(<InputBlock {...props} />);

    expect(spyOnInput).not.toBeCalled();
    component.find('input').simulate('change');
    expect(spyOnInput).toHaveBeenCalledTimes(1);

    spyOnInput.mockRestore();
  });

  it(`calls InputBlock.focus on input's onFocus and onBlur`, () => {
    const spyFocusMethod = jest.spyOn(InputBlock.prototype, 'focus');
    const component = mount(<InputBlock {...props} />);

    expect(spyFocusMethod).not.toBeCalled();
    component.find('input').simulate('focus');
    expect(spyFocusMethod).toBeCalledTimes(1);
    component.find('input').simulate('blur');
    expect(spyFocusMethod).toBeCalledTimes(2);

    spyFocusMethod.mockRestore();
  });

  it(`calls InputBlock.onKeyPress on input's onKeyPress`, () => {
    const spyOnKeyPressMethod = jest.spyOn(InputBlock.prototype, 'onKeyPress');
    const component = mount(<InputBlock {...props} />);

    expect(spyOnKeyPressMethod).not.toBeCalled();
    component.find('input').simulate('keypress');
    expect(spyOnKeyPressMethod).toBeCalledTimes(1);
  });

  // METHODS
  it(`calls props.focus in InputBlock.focus`, () => {
    const spyFocus = jest.spyOn(props, 'focus');

    const component = shallow(<InputBlock {...props} />);
    const instance = component.instance() as InputBlock;
    const focus = instance.focus as (
      event: Pick<React.FocusEvent<HTMLInputElement>, 'type'>
    ) => void;

    focus({type: 'focus'});
    expect(spyFocus).toBeCalledTimes(1);
    expect(spyFocus.mock.calls[0][0]).toEqual(true);

    focus({type: 'blur'});
    expect(spyFocus).toBeCalledTimes(2);
    expect(spyFocus.mock.calls[1][0]).toEqual(false);

    spyFocus.mockRestore();
  });

  it(`blurs input in InputBlock.onKeyPress when keyCode is equals 13`, () => {
    const component = shallow(<InputBlock {...props} />);
    const instance = component.instance() as InputBlock;
    const onKeyPress = instance.onKeyPress as (
      event: Partial<React.KeyboardEvent<HTMLInputElement>>
    ) => void;
    const testArgs = {
      which: 13,
      currentTarget: {
        blur: jest.fn()
      } as {blur: () => void}
    } as Pick<React.KeyboardEvent<HTMLInputElement>, 'which' | 'currentTarget'>;

    onKeyPress(testArgs);
    expect(testArgs.currentTarget.blur).toBeCalledTimes(1);

    testArgs.which = 12;
    onKeyPress({which: 12});
    expect(testArgs.currentTarget.blur).toBeCalledTimes(1);
  });
});
