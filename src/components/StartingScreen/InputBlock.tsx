/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import {
  StyledInputWrapper,
  StyledInput,
  AnimatedLabel
} from './InputBlock.styles';

export interface Props {
  inputVal: string;
  isEmpty: boolean;
  onInput: (event: React.FormEvent<HTMLInputElement>) => void;
  focus: (isFocused: boolean) => void;
}

class InputBlock extends React.PureComponent<Props, {}> {
  constructor(props: any) {
    super(props);

    this.focus = this.focus.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  focus(event: React.FocusEvent<HTMLInputElement>): void {
    this.props.focus(event.type === 'focus');
  }

  onKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.which === 13) {
      event.currentTarget.blur();
    }
  }

  render() {
    const {isEmpty, inputVal, onInput} = this.props;

    return (
      <StyledInputWrapper isEmpty={isEmpty}>
        <AnimatedLabel htmlFor="name">&#8680;</AnimatedLabel>
        <StyledInput
          id="name"
          type="text"
          autoComplete="off"
          value={inputVal}
          onChange={onInput}
          onFocus={this.focus}
          onBlur={this.focus}
          onKeyPress={this.onKeyPress}
          autoFocus={true}
        />
      </StyledInputWrapper>
    );
  }
}

export default InputBlock;
