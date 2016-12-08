import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../app.scss';
import { showDir } from './dirMap';
import { getFile } from './fileMap';
import { map } from 'lodash';
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
    var file = map(showDir(current), (contents, dir) => {
      if (typeof(contents) == 'string') {
        return `${dir}.${contents}`;
      }
    }).filter(d => {
      return d == params[0];
    });

    file = getFile(file[0]);

    if (file.length == 0) return <Error method='view' params={['file not found or not viewable']} />
      const terminal = document.getElementById(styles.terminal);
      setTimeout(() => { terminal.scrollTop = terminal.scrollHeight }, 400);

      switch (file[1]) {
        case 'repo':
          return React.createElement('a', { href: file[0], target: '_blank', className: styles.link }, params[0]);
        case 'txt':
          return React.createElement('pre', { className: styles.pre }, file[0]);
        default:
          return React.createElement('img', { src: file[0], className: styles.view });
      }
  }
}

export default connect(state => state.Terminal)(View)
