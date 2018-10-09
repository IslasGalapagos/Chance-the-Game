/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import {StyledWrapper, StyledHeader} from './styles';
import LetsStartBlock from './LetsStartBlock';
import InputBlock from './InputBlock';
import {Props} from './container';

export const enum Header {
  Question = "What's your name?",
  Asking = 'Tell me.'
}

export interface State {
  readonly header: Header;
  readonly inputVal: string;
  readonly inputIsFocused: boolean;
}

export class StartingScreen extends React.PureComponent<Props, State> {
  readonly state: State;

  constructor(props: any) {
    super(props);

    this.state = {
      header: Header.Question,
      inputVal: '',
      inputIsFocused: true
    };

    this.onInput = this.onInput.bind(this);
    this.focus = this.focus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInput(event: React.FormEvent<HTMLInputElement>): void {
    const {value} = event.currentTarget;
    const {inputVal, header} = this.state;

    let newHeader: Header | null = null;

    if (inputVal.length === 0 && value.length > 0 && header === Header.Asking) {
      newHeader = Header.Question;
    }

    if (
      inputVal.length > 0 &&
      value.length === 0 &&
      header === Header.Question
    ) {
      newHeader = Header.Asking;
    }

    this.setState({
      inputVal: inputVal !== value ? value : inputVal,
      header: newHeader || header
    });
  }

  focus(isFocused: boolean): void {
    const {inputIsFocused, header} = this.state;

    let newHeader: Header | null = null;

    if (inputIsFocused && header === Header.Asking) {
      newHeader = Header.Question;
    }

    this.setState({
      inputIsFocused: isFocused,
      header: newHeader || header
    });
  }

  onSubmit() {
    this.props.setName(this.state.inputVal);
  }

  render() {
    const {header, inputVal, inputIsFocused} = this.state;

    return (
      <StyledWrapper>
        <StyledHeader>{header}</StyledHeader>
        <InputBlock
          isEmpty={inputVal.length === 0}
          inputVal={inputVal}
          onInput={this.onInput}
          focus={this.focus}
        />
        {!!inputVal.length &&
          !inputIsFocused && (
            <LetsStartBlock name={inputVal} onSubmit={this.onSubmit} />
          )}
      </StyledWrapper>
    );
  }
}

export default StartingScreen;
