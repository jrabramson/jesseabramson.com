import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from '../../css/app.css';

class Comment extends Component {
  render() {
    const {method, params = []} = this.props;
    const content = params.join(' ');
    return (
      <li className={styles.comment}>{content}</li>
    )
  }
}

export default connect(state => state.Terminal)(Comment)