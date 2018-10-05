/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {css} from 'react-emotion';

const xSVG = `<svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="
    M1.35354 0.646729C1.15829 0.451416 0.841696 0.451416 0.646437 0.646729C0.451178 0.842041 0.451178
    1.15845 0.646437 1.35376L2.79292 3.50024L0.646437 5.64673C0.451178 5.84204 0.451178 6.15845 0.646437
    6.35376C0.841696 6.54907 1.15829 6.54907 1.35354 6.35376L3.49999 4.20728L5.64644 6.35376C5.8417 6.54907
    6.15829 6.54907 6.35354 6.35376C6.5488 6.15845 6.5488 5.84204 6.35354 5.64673L4.20706 3.50024L6.35354
    1.35376C6.5488 1.15845 6.5488 0.842041 6.35354 0.646729C6.15829 0.451416 5.8417 0.451416 5.64644
    0.646729L3.49999 2.79321L1.35354 0.646729Z
  " fill="white"/>
</svg>`;

const wrapperCSS = css`
  list-style: none;
  text-align: right;

  position: absolute;
  top: 32px;
  right: 35px;
  z-index: 1;

  padding: 0;
  margin: 0;

  li {
    font-family: Arial;
    font-size: 30px;

    position: relative;

    color: #8ec7c3;

    span {
      font-size: 15px;
      line-height: 26px;
      text-align: center;

      display: block;

      position: absolute;
      top: 4px;
      left: -30px;

      width: 26px;
      padding-left: 5px;
      box-sizing: border-box;

      background-color: #8ec7c3;
      color: #fff;
      border-radius: 50%;
    }

    span:before {
      content: '';

      position: absolute;
      top: 9px;
      left: 5px;

      width: 6px;
      height: 6px;

      background: url('data:image/svg+xml;utf8,${xSVG}');
    }
  }
`;

export default wrapperCSS;
