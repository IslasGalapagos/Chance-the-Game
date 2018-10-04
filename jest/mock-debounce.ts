/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

type TDebouncedF = () => {};

let debouncedF: TDebouncedF;

export const debouncedMock = jest.fn(() => debouncedF());

jest.mock('lodash-es/debounce', () =>
  jest.fn((fn: TDebouncedF) => {
    debouncedF = fn;
    return debouncedMock;
  })
);
