/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import {StyledWrapper, textBlockCSS, togglerCSS} from './About.styles';

interface State {
  readonly isShown: boolean;
  readonly timerID: number | null;
}

class About extends React.PureComponent<{}, State> {
  readonly state: State;

  constructor(props: any) {
    super(props);

    this.state = {
      isShown: false,
      timerID: null
    };

    this.onToggle = this.onToggle.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
  }

  onToggle(): void {
    this.setState(state => ({isShown: !state.isShown}));
  }

  onMouseLeave(): void {
    if (this.state.isShown) {
      const timerID = window.setTimeout(this.onToggle, 800);

      this.setState({timerID});
    }
  }

  onMouseEnter(): void {
    const {isShown, timerID} = this.state;

    if (isShown && timerID) {
      window.clearTimeout(timerID);

      this.setState({
        timerID: null
      });
    }
  }

  render() {
    const {isShown} = this.state;

    return (
      <StyledWrapper isShown={isShown}>
        <div
          onMouseLeave={this.onMouseLeave}
          onMouseEnter={this.onMouseEnter}
          className="about__inner"
        >
          {isShown && (
            <div className={`${textBlockCSS} about__text_block`}>
              <p className="about__text">
                The simple game that offers to compete with the Random, and use
                a prediction as a weapon.
              </p>
              <p className="about__text">⚔️ 🔮</p>
              <p className="about__text">
                You can use this game as a tool for procrastination, for
                example, or for divination, or what you want. Have fun!
              </p>
              <a
                href="https://github.com/IslasGalapagos/Chance-the-Game"
                target="_blank"
                className="about__source_link"
              >
                Source code
              </a>
              <span className="about__copyright">© Evgeny Sysoletin 2018</span>
            </div>
          )}
          <button className={togglerCSS} onClick={this.onToggle}>
            <svg
              width="16"
              height="35"
              viewBox="0 0 16 35"
              fill={isShown ? '#FFF' : '#A3ABF3'}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={`
                  M7.8667 5.38474C9.2811 5.38474 10.4277 4.17938 10.4277 2.69243C10.4277 1.20548 9.2811
                  0.00012207 7.8667 0.00012207C6.45231 0.00012207 5.30573 1.20548 5.30573 2.69243C5.30573
                  4.17938 6.45231 5.38474 7.8667 5.38474Z
                `}
              />
              <path
                d={`
                  M2.74475 13.4617C4.15914 13.4617 5.30573 12.3151 5.30573 10.9007V10.638C5.30573 9.22363
                  6.45232 8.07705 7.8667 8.07705C9.28109 8.07705 10.4277 9.22363 10.4277 10.638V27.0545C10.4277
                  28.4689 11.5743 29.6155 12.9887 29.6155C14.403 29.6155 15.5496 30.7621 15.5496 32.1765V32.3078C15.5496
                  33.7947 14.3442 35.0001 12.8573 35.0001H2.87608C1.38916 35.0001 0.183777 33.7947 0.183777
                  32.3078V32.1765C0.183777 30.7621 1.33037 29.6155 2.74475 29.6155C4.15914 29.6155 5.30573
                  28.4689 5.30573 27.0545V21.4073C5.30573 19.9929 4.15914 18.8463 2.74475 18.8463C1.33037
                  18.8463 0.183777 17.6997 0.183777 16.2853V16.0226C0.183777 14.6082 1.33037 13.4617 2.74475 13.4617Z
                `}
              />
            </svg>
          </button>
        </div>
      </StyledWrapper>
    );
  }
}

export default About;
