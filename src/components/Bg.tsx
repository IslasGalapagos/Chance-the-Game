/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import debounce from 'lodash-es/debounce';
import styled from 'react-emotion';

import '../static/chance.svg';

export const StyledCanvas = styled('canvas')`
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
  readonly logoIsLoad: boolean;
}

class Bg extends React.PureComponent<{}, State> {
  readonly state: State;

  readonly gridConfig: GridConfig = {
    ROWS: 6,
    COLS: 3,
    COLOR: '#F2FEFD'
  };

  onResize = debounce(() => {
    this.setState(this.getSizes(), this.draw);
  }, 200);

  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private logoRef: React.RefObject<HTMLImageElement>;

  constructor(props: {}) {
    super(props);

    this.canvasRef = React.createRef();
    this.logoRef = React.createRef();

    this.state = {...this.getSizes(), logoIsLoad: false};

    this.onLogoLoad = this.onLogoLoad.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    this.draw();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
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

    const logo = this.state.logoIsLoad ? this.logoRef.current : null;

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
        } else if (logo !== null) {
          ctx.drawImage(
            logo,
            j * rectWidth +  (rectWidth / 2 - logo.naturalWidth / 2),
            i * rectHeight +  (rectHeight / 2 - logo.naturalHeight / 2)
          );
        }
      }
    }
  }

  onLogoLoad() {
    this.setState({logoIsLoad: true}, this.draw);
  }

  render() {
    return (
      <React.Fragment>
        <img
          src="./images/chance.svg"
          ref={this.logoRef}
          onLoad={this.onLogoLoad}
          hidden
        />
        <StyledCanvas
          width={`${this.state.width}px`}
          height={`${this.state.height}px`}
          innerRef={this.canvasRef}
        />
      </React.Fragment>
    );
  }
}

export default Bg;
