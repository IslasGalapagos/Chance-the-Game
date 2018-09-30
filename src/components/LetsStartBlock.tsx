import * as React from 'react';
import styled, {css, keyframes} from 'react-emotion';
import {State as StartingScrennState, fontStyles} from './StartingScreen';

const animatedWrapperKeyframes = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const animatedWrapper = css`
  display: inline-block;

  animation: ${animatedWrapperKeyframes} 0.1s ease;
`;

const StyledButton = styled('button')`
  ${() => fontStyles};
  font-style: italic;

  padding: 0;

  background-color: transparent;
  color: #3e3cae;
  border: none;
  border-bottom: 1px solid #3e3cae;
  outline: none;

  cursor: pointer;
`;

interface Props extends Pick<StartingScrennState, 'name'> {}

class LetsStartBlock extends React.PureComponent<Props, {}> {
  render() {
    const {name} = this.props;

    return (
      <div className={`${fontStyles} ${animatedWrapper}`}>
        Hello,&#32;
        <span>{name}</span>
        .&#32;
        <StyledButton type="button">
          Let's play!
        </StyledButton>
      </div>
    );
  }
}

export default LetsStartBlock;
