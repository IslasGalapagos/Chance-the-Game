import {shallow} from 'enzyme';
import * as React from 'react';
import * as testRenderer from 'react-test-renderer';
import debounce from 'lodash-es/debounce';

import Bg from './Bg';

type TDebouncedF = () => {};
let debouncedF: TDebouncedF;
const debouncedMock = jest.fn(() => debouncedF());
jest.mock('lodash-es/debounce', () =>
  jest.fn((fn: TDebouncedF) => {
    debouncedF = fn;
    return debouncedMock;
  })
);

describe('<Bg/>', () => {
  beforeEach(() => {
    (debounce as any).mockClear();
    debouncedMock.mockClear();
  });

  it('renders correctly', () => {
    const treeAndStyles = testRenderer.create(<Bg />).toJSON();
    expect(treeAndStyles).toMatchSnapshot();
  });

  it('has a ref', () => {
    const component = shallow(<Bg />);
    expect(component.instance()).toHaveProperty('canvasRef');
  });

  it('has config with data for drawing', () => {
    const component = shallow(<Bg />).instance() as Bg;
    expect(component.gridConfig).toEqual(
      expect.objectContaining({
        ROWS: expect.any(Number),
        COLS: expect.any(Number),
        COLOR: expect.any(String)
      })
    );
  });

  it('has initial state with window sizes & renders with these sizes', () => {
    const component = shallow(<Bg />);
    expect(component.state('width')).toEqual(window.innerWidth);
    expect(component.state('height')).toEqual(
      window.document.body.clientHeight
    );
    expect(component.prop('width')).toEqual(`${window.innerWidth}px`);
    expect(component.prop('height')).toEqual(
      `${window.document.body.clientHeight}px`
    );
  });

  it('changes state & rerenders with new sizes on window.resize', () => {
    const component = shallow(<Bg />);
    const sizeForTest = 100;
    expect(component.state('width')).not.toEqual(sizeForTest);
    expect(component.state('height')).not.toEqual(sizeForTest);
    expect(component.prop('width')).not.toEqual(`${sizeForTest}px`);
    expect(component.prop('height')).not.toEqual(`${sizeForTest}px`);
    window.resizeTo(sizeForTest, sizeForTest);
    expect(component.state('width')).toEqual(sizeForTest);
    expect(component.state('height')).toEqual(sizeForTest);
    expect(component.prop('width')).toEqual(`${sizeForTest}px`);
    expect(component.prop('height')).toEqual(`${sizeForTest}px`);
  });

  it('calls componentDidMount', () => {
    const spyCDM = jest.spyOn(Bg.prototype, 'componentDidMount');
    shallow(<Bg />);
    expect(spyCDM).toHaveBeenCalled();
  });

  it('calls draw on mount', () => {
    const spyDraw = jest.spyOn(Bg.prototype, 'draw');
    shallow(<Bg />);
    expect(spyDraw).toHaveBeenCalled();
  });

  it('has onResize handler', () => {
    const component = shallow(<Bg />).instance() as Bg;
    const spyOnResize = jest.spyOn(component, 'onResize');
    component.onResize();
    expect(spyOnResize).toHaveBeenCalled();
  });

  it('calls draw in onResize with debounce', () => {
    const spyDraw = jest.spyOn(Bg.prototype, 'draw');
    expect(debounce).not.toHaveBeenCalled();
    const component = shallow(<Bg />).instance() as Bg;
    expect(debounce).toHaveBeenCalledTimes(1);
    expect(debouncedMock).not.toHaveBeenCalled();
    spyDraw.mockClear();
    component.onResize();
    expect(debouncedMock).toHaveBeenCalledTimes(1);
    expect(spyDraw).toHaveBeenCalledTimes(1);
  });

  it('calls onResize on window.resize', () => {
    const component = shallow(<Bg />).instance() as Bg;
    const spyOnResize = jest.spyOn(component, 'onResize');
    expect(spyOnResize).not.toHaveBeenCalled();
    window.resizeTo(100, 100);
    expect(spyOnResize).toHaveBeenCalledTimes(1);
  });

  it('removes resize handler on mount', () => {
    window.removeEventListener = jest.fn();
    const component = shallow(<Bg />);
    expect(window.removeEventListener).not.toHaveBeenCalled();
    component.unmount();
    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
