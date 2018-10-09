/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import styled, {css} from 'react-emotion';

interface StyledWrapperProps {
  isShown: boolean;
}

export const StyledWrapper = styled('div')<StyledWrapperProps>`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;

  ${({isShown}) =>
    isShown
      ? `
    width: 100%;
    height: 100%;

    background-color: rgba(219, 249, 255, 0.2);
  `
      : ''};
`;

export const textBlockCSS = css`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 0;

  width: 50%;
  height: 50%;
  padding: 25px;
  box-sizing: border-box;

  background-color: #84b7b1;

  .about__text,
  .about__source_link,
  .about__copyright {
    color: #fff;
  }

  .about__text {
    font-size: 24px;

    margin: 0 0 15px 0;
  }

  .about__text,
  .about__copyright {
    font-family: 'Helvetica Neu', Helvetica, Arial;
  }

  .about__source_link {
    font-family: 'Courier New', Courer;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;

    display: inline-block;

    position: relative;

    margin: 15px 0 0 26px;

    border-bottom: 1px solid #fff;

    &:before {
      content: '⇨';

      position: absolute;
      top: -2px;
      left: -26px;
    }

    &:hover {
      opacity: 0.75;
    }
  }

  .about__copyright {
    font-size: 14px;

    position: absolute;
    left: 25px;
    bottom: 25px;
  }
`;

export const togglerCSS = css`
  position: absolute;
  right: 25px;
  bottom: 25px;
  z-index: 1;

  width: 74px;
  height: 74px;
  padding: 0;

  background-color: transparent;
  border: none;
  outline: none;

  cursor: pointer;

  &:before {
    content: '';

    position: absolute;
    left: 10px;
    top: 10px;

    width: 54px;
    height: 54px;
    box-sizing: border-box;

    border: 2px solid #c8e8e5;

    transform: rotate(45deg);
  }
`;
