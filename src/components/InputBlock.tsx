import * as React from 'react';
import styled, {keyframes} from 'react-emotion';
import {State as StartingScrennState, fontStyles, margin} from './StartingScreen';

interface StyledProps {
  isEmpty: boolean;
}

export const StyledInputWrapper = styled('div')<StyledProps>`
  input {
    border-bottom-color: ${({isEmpty}) => (isEmpty ? '#f55662' : '')};
  }
`;

const animatedLabelKeyframes = keyframes`
  from {
    left: 0;
  }

  50% {
    left: 4px;
  }

  to {
    left: 0;
  }
`;

const AnimatedLabel = styled('label')`
  position: relative;
  animation: ${animatedLabelKeyframes} 0.7s ease infinite;
`;

export const StyledInput = styled('input')`
  width: 241px;
  margin-left: 20px;

  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
`;

export interface Props extends Pick<StartingScrennState, 'name'> {
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
    const {isEmpty, name, onInput} = this.props;

    return (
      <StyledInputWrapper className={margin} isEmpty={isEmpty}>
        <AnimatedLabel className={fontStyles} htmlFor="name">
          &#8680;
        </AnimatedLabel>
        <StyledInput
          className={fontStyles}
          id="name"
          type="text"
          autoComplete="off"
          value={name}
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
