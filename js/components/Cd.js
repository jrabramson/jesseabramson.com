import React, {Component, createFragment} from 'react';
import {connect} from 'react-redux';
import * as TerminalActions from '../actions/TerminalActions';
import styles from '../../css/app.css';
import {bindActionCreators} from 'redux';
import {changeDir} from './dirMap'
import Error from './Error.js'

let newDir = '';

class Cd extends Component {
  render() {
    const {method, dispatch, dir, params = []} = this.props;
    return (
      <div className={styles.dirChange}>{this._changeDir(params[0], dir)}</div>
    )
  }
  _changeDir(param, dir) {
  	newDir = changeDir(param, dir[dir.length - 1]);
  	return newDir == 'error' ? <Error method='cd' params={['Directory not found or insufficient privileges']} /> : '';
  }
  componentDidMount() {
  	const dispatch = this.props.dispatch;
  	const actions = bindActionCreators(TerminalActions, dispatch);
  	return newDir == 'error' ? '' : actions.changeDir(newDir);
  }
}

export default connect(state => state.Terminal)(Cd)