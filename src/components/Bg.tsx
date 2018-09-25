import * as React from 'react';
import debounce from 'lodash-es/debounce';
import styled from 'react-emotion';

const StyledCanvas = styled('canvas')`
  position: absolute;
  z-index: 0;
`;

interface GridConfig {
  readonly ROWS: number;
  readonly COLS: number;
  readonly COLOR: string;
}

interface State {
  readonly width: number;
  readonly height: number;
}

class Bg extends React.PureComponent<{}, State> {
  readonly state: State;

  readonly gridConfig: GridConfig = {
    ROWS: 6,
    COLS: 3,
    COLOR: '#F2FEFD'
  };

  onResize = debounce(() => {
    this.setState(this.getSizes());

    this.draw();
  }, 200);

  private canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: {}) {
    super(props);

    this.canvasRef = React.createRef();

    this.state = this.getSizes();
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    this.draw();
  }

  getSizes() {
    return {
      width: window.innerWidth,
      height: document.body.clientHeight
    };
  }

  draw() {
    // TODO: write visual test ?
    // TODO: create more complicated thing – interactive or animated
    const canvas = this.canvasRef.current;

    if (canvas === null) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (ctx === null) {
      return;
    }

    const {ROWS, COLS, COLOR} = this.gridConfig;
    const {width, height} = this.state;

    const rectWidth = Math.floor(width / COLS);
    const lastRectWidth = width - rectWidth * (COLS - 1);
    const rectHeight = Math.floor(height / ROWS);
    const lastRectHeight = height - rectHeight * (ROWS - 1);

    ctx.fillStyle = COLOR;

    for (let i = 0; i < ROWS; i += 1) {
      for (let j = 0; j < COLS; j += 1) {
        if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) {
          ctx.fillRect(
            j * rectWidth,
            i * rectHeight,
            j < COLS - 1 ? rectWidth : lastRectWidth,
            i < ROWS - 1 ? rectHeight : lastRectHeight
          );
        }
      }
    }
  }

  render() {
    return (
      <StyledCanvas
        width={`${this.state.width}px`}
        height={`${this.state.height}px`}
        innerRef={this.canvasRef}
      />
    );
  }
}

export default Bg;
