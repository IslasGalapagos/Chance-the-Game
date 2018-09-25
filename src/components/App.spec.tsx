import * as React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import Bg from './Bg';

describe('App', () => {
  it('contains <Bg/>', () => {
    const component = shallow(<App />);
    expect(component.contains(<Bg />)).toBeTruthy();
  });
});
