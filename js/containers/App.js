import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Terminal from '../components/Terminal';
import {renderDevTools} from '../utils/devTools';

const store = configureStore();

export default React.createClass({
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <Terminal /> }
        </Provider>
      </div>
    );
  }
});
