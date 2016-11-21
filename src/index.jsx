import React from 'react';
import { render } from 'react-dom';
import App from './components/app.jsx';

render( <App/>, document.getElementById("main"));

if (module.hot) {
  module.hot.accept('./components/app.jsx', () => {
    const App = require('./components/app.jsx').default;
    render(
      <App/>,
      document.getElementById("main")
    );
  });
}