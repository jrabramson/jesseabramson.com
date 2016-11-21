import React, { Component, createFragment } from 'react';
import { connect } from 'react-redux';
import styles from '../app.scss';
import { showDir } from './dirMap';
import { keys } from 'lodash';
import { map } from 'lodash';

class Ls extends Component {
  render() {
    const {method, dir, params = []} = this.props;
    return (
      <div className={styles.help}>{this._dir(dir[dir.length - 1])}</div>
    )
  }
  _dir(current) {
  	const available = showDir(current).map(dir => {
      return (
        <li key={dir[0]}>{this._pathing(dir)}</li>
      )
    });
   return available;
  }
  _pathing(dir) {
    switch (typeof dir[1]) {
      case 'string':
        return <span className={styles.file}>{`${dir[0]}.${dir[1]}`}</span>
      case 'object':
        return <span className={styles.dir}>{dir[0]}</span>
    }
  }
}

export default connect(state => state.Terminal)(Ls)