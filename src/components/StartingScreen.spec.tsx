import {shallow, mount} from 'enzyme';
import * as testRenderer from 'react-test-renderer';
import * as React from 'react';
import StartingScreen, {Header} from './StartingScreen';
import LetsStartBlock from './LetsStartBlock';
import InputBlock from './InputBlock';

describe('<StartingScreen/>', () => {
  it('renders correctly', () => {
    const treeAndStyles = testRenderer.create(<StartingScreen />).toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  it('has initial state with name property which equals empty string', () => {
    const component = shallow(<StartingScreen />);
    expect(component.state('name')).toEqual('');
  });

  it('hides button by default, shows when name.length not equals 0 & state.inputIsFocused is false', () => {
    const component = shallow(<StartingScreen />);
    expect(component.find(LetsStartBlock).length).toEqual(0);
    component.setState({name: 'Diophantus'});
    expect(component.find(LetsStartBlock).length).toEqual(0);
    component.setState({inputIsFocused: false});
    expect(component.find(LetsStartBlock).length).toEqual(1);
    component.setState({inputIsFocused: true});
    component.setState({name: ''});
    expect(component.find(LetsStartBlock).length).toEqual(0);
  });

  it(`changes text of header-question when state.inputIsFocused is true & state.name changes to empty string`, () => {
    const component = mount(<StartingScreen />);
    const header = component.find('h1');
    const instance = component.instance() as StartingScreen;
    const onInput = instance.onInput as (
      event: {currentTarget: {value: string}}
    ) => void;

    expect(header.text()).toEqual(Header.Question);
    instance.focus(true);
    expect(header.text()).toEqual(Header.Question);

    onInput({currentTarget: {value: 'Diophantus'}});
    expect(header.text()).toEqual(Header.Question);
    onInput({currentTarget: {value: ''}});
    expect(header.text()).toEqual(Header.Asking);

    instance.focus(false);
    expect(header.text()).toEqual(Header.Question);
  });

  it('sets isEmpty prop to input wrapper when name.length equals 0', () => {
    const component = shallow(<StartingScreen />);
    expect(component.find(InputBlock).prop('isEmpty')).toEqual(true);
    component.setState({name: 'Diophantus'});
    expect(component.find(InputBlock).prop('isEmpty')).toEqual(false);
    component.setState({name: ''});
    expect(component.find(InputBlock).prop('isEmpty')).toEqual(true);
  });

  it(`sets state.name to InputBlock's prop name`, () => {
    const component = shallow(<StartingScreen />);
    expect(component.find(InputBlock).prop('name')).toEqual('');
    component.setState({name: 'Diophantus'});
    expect(component.find(InputBlock).prop('name')).toEqual('Diophantus');
  });

  it(`sets state.name to LetsStartBlock's prop name`, () => {
    const component = shallow(<StartingScreen />);
    component.setState({name: 'Diophantus'});
    component.setState({inputIsFocused: false});
    expect(component.find(LetsStartBlock).prop('name')).toEqual('Diophantus');
    component.setState({name: 'Pythagoras'});
    expect(component.find(LetsStartBlock).prop('name')).toEqual('Pythagoras');
  });
});
