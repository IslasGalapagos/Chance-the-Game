/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {createStandardAction} from 'typesafe-actions';

export const setName = createStandardAction('SET_NAME')<string>();
export const setScore = createStandardAction('SET_SCORE')<[number, number]>();
export const setCoefficients = createStandardAction('SET_COEFFICIENTS')<
  [number, number]
>();
export const setTotalScore = createStandardAction('SET_TOTAL_SCORE')<
  [number, number]
>();
