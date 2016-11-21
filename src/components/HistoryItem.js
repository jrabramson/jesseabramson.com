import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../app.scss';

class HistoryItem extends Component {
  render() {
    const { children, system } = this.props;

    return (
      <div>
      	{ system ? null : this._lineItem() }
        { children }
      </div>
    )
  }
  _lineItem() {
    const { loc, line } = this.props;

    return <li className={styles.line}>
      { loc }> { line }
    </li>
  }
}

export default connect(state => state.Terminal)(HistoryItem);
