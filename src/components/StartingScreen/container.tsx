/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {State as ReducerState} from '../../store/reducer';
import {setName} from '../../store/actions';
import StartingScreen from '.';

export interface Props {
  name: string;
  setName: (name: string) => Dispatch<ReturnType<typeof setName>>;
}

export class Wrapper extends React.PureComponent<Props, {}> {
  static readonly displayName = 'StartingScreenContainer';

  constructor(props: any) {
    super(props);
  }

  render() {
    const {props} = this;

    if (props.name.length) {
      return null;
    }

    return <StartingScreen {...props} />;
  }
}

const mapStateToProps = (state: ReducerState) => ({
  name: state.name
});

const mapDispatchToProps = (
  dispatch: Dispatch<ReturnType<typeof setName>>
) => ({
  setName: (name: string) => dispatch(setName(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper);
