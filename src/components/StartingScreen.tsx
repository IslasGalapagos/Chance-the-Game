/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import {StyledWrapper, StyledHeader} from './StartingScreen.styles';
import LetsStartBlock from './LetsStartBlock';
import InputBlock from './InputBlock';

export const enum Header {
  Question = "What's your name?",
  Asking = 'Tell me.'
}

export interface State {
  readonly header: Header;
  readonly name: string;
  readonly inputIsFocused: boolean;
}

class StartingScreen extends React.PureComponent<{}, State> {
  readonly state: State;

  constructor(props: any) {
    super(props);

    this.state = {
      header: Header.Question,
      name: '',
      inputIsFocused: true
    };

    this.onInput = this.onInput.bind(this);
    this.focus = this.focus.bind(this);
  }

  onInput(event: React.FormEvent<HTMLInputElement>): void {
    const {value} = event.currentTarget;
    const {name, header} = this.state;

    let newHeader: Header | null = null;

    if (name.length === 0 && value.length > 0 && header === Header.Asking) {
      newHeader = Header.Question;
    }

    if (name.length > 0 && value.length === 0 && header === Header.Question) {
      newHeader = Header.Asking;
    }

    this.setState({
      name: name !== value ? value : name,
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

  render() {
    const {header, name, inputIsFocused} = this.state;

    return (
      <StyledWrapper hidden>
        <StyledHeader>
          {header}
        </StyledHeader>
        <InputBlock
          isEmpty={name.length === 0}
          name={name}
          onInput={this.onInput}
          focus={this.focus}
        />
        {!!name.length && !inputIsFocused && <LetsStartBlock name={name} />}
      </StyledWrapper>
    );
  }
}

export default StartingScreen;
