import * as React from 'react';
import styled, {css} from 'react-emotion';
import LetsStartBlock from './LetsStartBlock';
import InputBlock from './InputBlock';

const StyledWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 100%;
  padding: 35px;
  box-sizing: border-box;

  background-color: #eafff2;
`;

export const fontStyles = css`
  font-family: Arial;
  font-size: 35px;

  color: #333;
`;

export const margin = css`
  margin: 0 0 25px 0;
`;

const StyledH1 = styled('h1')`
  font-weight: normal;
`;

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
      <StyledWrapper>
        <StyledH1 className={`${fontStyles} ${margin}`}>{header}</StyledH1>
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
