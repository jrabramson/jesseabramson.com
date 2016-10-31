import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from '../../css/app.css';
import {listCommands, commandTip} from './commandMap';

class Help extends Component {
  render() {
    const {method, params = []} = this.props;
    return (
      <div className={styles.help}>{this._commands(method, params)}</div>
    )
  }
  _commands(method, params) {
    if (params.length > 0) {
      return (
        <li key={method}>{params} {commandTip(params)}</li>
      )
    }
  	return listCommands().map(command => {
  		return (
  			<li key={command}>{command}</li>
  		)
  	});
  }
}

export default connect(state => state.Terminal)(Help)