import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from '../../css/app.css';

class HistoryItem extends Component {
  render() {
    const {children, loc, key, line} = this.props;
    return (
      <div>
      	<li className={styles.line}>{loc}> {line}</li>
      	{children}
      </div>
    )
  }
}

export default connect(state => state.Terminal)(HistoryItem)
