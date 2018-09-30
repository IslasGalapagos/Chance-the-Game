import * as React from 'react';
import StartingScreen from './StartingScreen';
import Bg from './Bg';
import Count from './Count';

class App extends React.PureComponent<{}, {}> {
  render() {
    return (
      <React.StrictMode>
        <React.Fragment>
          <StartingScreen />
          <Bg />
          <Count score={[0, 0]} />
        </React.Fragment>
      </React.StrictMode>
    );
  }
}

export default App;
