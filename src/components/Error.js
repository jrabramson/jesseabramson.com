import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../app.scss';

class Error extends Component {
  render() {
    const { method, params = [] } = this.props;
    const content = method.length == 0 ? '' : `${method}: ${params.join(" ")}`;
    return (
      <li className={styles.error}>{content}</li>
    )
  }
}

export default connect(state => state.Terminal)(Error)
