import * as React from 'react';
import styled, {css} from 'react-emotion';

const CountNumCSS = css`
  font-family: Arial;
  font-size: 36px;
  text-align: center;
  position: relative;
  display: inline-block;
  width: 64px;
  box-sizing: border-box;
  border-radius: 50%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

interface CountNumProps {
  className?: string;
  score: number;
}

const CountNum: React.SFC<CountNumProps> = ({className, score}) => (
  <div className={`${CountNumCSS} ${className}`}>{score}</div>
);

interface StyledCountNumProps {
  user?: boolean;
  gameState: string;
}

export const StyledCountNum = styled(CountNum)<StyledCountNumProps>`
  line-height: ${props => (props.user ? '60px' : '64px')};

  left: ${props => {
    if (props.gameState === 'draw') {
      return props.user ? '1px' : '-1px';
    }

    return props.user ? '5px' : '-5px';
  }};
  z-index: ${props => {
    if (props.gameState === 'draw') {
      return '';
    }

    if (props.user) {
      return props.gameState === 'user_lead' ? '1' : '0';
    }

    return props.gameState === 'random_lead' ? '1' : '0';
  }};

  background-color: ${props => (props.user ? '#FCFFDA' : '#49404E')};
  color: ${props => (props.user ? '#49404E' : '#FCFFDA')};
  border: ${props => (props.user ? '2px solid #49404E' : '')};
`;

const StyledCountWrapper = styled('div')`
  position: absolute;
  top: 35px;
  left: 35px;
`;

type Score = [number, number];

interface CountProps {
  score: Score;
}

const enum GameState {
  Draw = 'draw',
  User = 'user_lead',
  Random = 'random_lead'
}

const getGameState = (score: Score): GameState => {
  const diff = score[0] - score[1];

  switch (diff === 0 ? 0 : diff / Math.abs(diff)) {
    case 1:
      return GameState.User;
      break;
    case -1:
      return GameState.Random;
      break;
    case 0:
      return GameState.Draw;
      break;
    default:
      return GameState.Draw;
  }
};

class Count extends React.PureComponent<CountProps, {}> {
  render() {
    const {score} = this.props;
    const gameState = getGameState(score);

    return (
      <StyledCountWrapper>
        <StyledCountNum score={score[0]} gameState={gameState} user />
        <StyledCountNum score={score[1]} gameState={gameState} />
      </StyledCountWrapper>
    );
  }
}

export default Count;
