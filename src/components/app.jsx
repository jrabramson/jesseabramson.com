import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Terminal from '../containers/terminal.jsx';
import styles from '../app.scss'

const store = configureStore();

export default React.createClass({
  render() {
    return (
      <Provider store={store}>
        <div className={styles.monitor}>
          <Terminal />
        </div>
      </Provider>
    );
  }
});
