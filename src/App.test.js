// Theodore Sawyer, FEND - Project 07: 'Neighborhood Map (React)' / App.test.js / 10.20.18

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
