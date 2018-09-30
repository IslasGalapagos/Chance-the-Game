import {shallow} from 'enzyme';
import * as React from 'react';
import LetsStartBlock from './LetsStartBlock';

describe('<LetsStartBlock/>', () => {
  it(`prints props.name in component's text`, () => {
    const component = shallow(<LetsStartBlock name="Diophantus" />);
    expect(component.find('span').text()).toEqual('Diophantus');
  });
});
