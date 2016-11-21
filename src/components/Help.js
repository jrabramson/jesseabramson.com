import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../app.scss';
import { keys, values, zip } from 'lodash';

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

function listCommands() {
  return zip(keys(tooltips), values(tooltips));
};

function commandTip(command) {
  return tooltips[command] || ' - no commands found';
};

let tooltips = {
  help: ' - list all commands or help [command]',
  view: ' - show file contents, usage: view [file]',
  ls: ' - list all files and folders in current directory',
  cd: ' - change directory, usage: cd [dir] or cd .. to go up a level'
};

export default connect(state => state.Terminal)(Help)