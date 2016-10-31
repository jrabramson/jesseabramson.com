import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from '../../css/app.css';
import {showDir} from './dirMap';
import {getFile} from './fileMap';
import flatten from 'lodash/array/flatten'
import Error from './Error.js';

class View extends Component {
  render() {
    const {dir, line, params} = this.props;
    return (
      <li>
      	{this._getContents(dir[dir.length -1], params)}
      </li>
    )
  }
  _getContents(current, params) {
  	const available = flatten(showDir(current).map(dir => {
      var file = dir.join('.') == params[0] ? params[0] : null; 
      if (file) {
      	return getFile(file);
      }
    }).filter(d => {
  		return d != undefined;
  	}));
    if (available.length == 0) return <Error method='view' params={['file not found or not viewable']} />
      const terminal = document.getElementById(styles.terminal);
      setTimeout(() => { terminal.scrollTop = terminal.scrollHeight }, 400);
      switch (available[1]) {
        case 'com':
          return React.createElement('a', { href: available[0], target: '_blank', className: styles.link }, params[0]);
        case 'txt':
          return React.createElement('pre', { className: styles.pre }, available[0]);
        default:
          return React.createElement('img', { src: available[0], className: styles.view });
      }
  }
}

export default connect(state => state.Terminal)(View)
