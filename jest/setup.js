const React = require('react');
const {configure} = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

global.React = React;

configure({adapter: new Adapter()});
