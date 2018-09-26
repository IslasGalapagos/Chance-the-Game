import {shallow} from 'enzyme';
import * as testRenderer from 'react-test-renderer';
import * as React from 'react';
import Count, {StyledCountNum} from './Count';

describe('<Count/>', () => {
  it('renders correctly', () => {
    const treeAndStyles = testRenderer
      .create(<Count score={[0, 0]} />)
      .toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  it('renders with score from props', () => {
    const component = shallow(<Count score={[1, 2]} />);
    expect(
      component
        .find(StyledCountNum)
        .first()
        .render()
        .text()
    ).toEqual('1');
    expect(
      component
        .find(StyledCountNum)
        .last()
        .render()
        .text()
    ).toEqual('2');
  });

  it('overlap one element be another, depends on score', () => {
    const component = shallow(<Count score={[1, 1]} />);
    expect(
      component
        .find(StyledCountNum)
        .first()
        .prop('gameState')
    ).toEqual('draw');
    expect(
      component
        .find(StyledCountNum)
        .last()
        .prop('gameState')
    ).toEqual('draw');

    component.setProps({score: [2, 1]});
    expect(
      component
        .find(StyledCountNum)
        .first()
        .prop('gameState')
    ).toEqual('user_lead');
    expect(
      component
        .find(StyledCountNum)
        .last()
        .prop('gameState')
    ).toEqual('user_lead');

    const treeAndStyles = testRenderer.create(<Count score={[2, 1]} />);
    expect(treeAndStyles.toJSON()).toMatchSnapshot();

    component.setProps({score: [1, 2]});
    expect(
      component
        .find(StyledCountNum)
        .first()
        .prop('gameState')
    ).toEqual('random_lead');
    expect(
      component
        .find(StyledCountNum)
        .last()
        .prop('gameState')
    ).toEqual('random_lead');

    treeAndStyles.update(<Count score={[1, 2]} />);
    expect(treeAndStyles.toJSON()).toMatchSnapshot();
  });
});
