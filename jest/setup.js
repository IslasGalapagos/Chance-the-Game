import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom';

configure({adapter: new Adapter()});

const {JSDOM} = jsdom;
const dom = new JSDOM(
  '<!DOCTYPE html><html><body><div id="root"></div></body></html>'
);

window.eval(`
  Object.defineProperty(window.document.body, 'clientHeight', {
    get() {
      return window.innerHeight;
    }
  });
`);

global.window = window;
global.document = window.document;

global.window.resizeTo = (width, height) => {
  global.window.innerWidth = width || global.window.innerWidth;
  global.window.innerHeight = width || global.window.innerHeight;
  global.window.dispatchEvent(new Event('resize'));
};
