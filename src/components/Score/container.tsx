/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

import {connect} from 'react-redux';
import {State as ReducerState} from '../../store/reducer';
import Score from './';

const mapStateToProps = (state: ReducerState) => ({
  score: state.score
});

export default connect(mapStateToProps)(Score);
