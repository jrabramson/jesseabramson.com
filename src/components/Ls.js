import React, { Component, createFragment } from 'react';
import { connect } from 'react-redux';
import styles from '../app.scss';
import { showDir } from './dirMap';
import { map } from 'lodash';

class Ls extends Component {
  render() {
    const {method, dir, params = []} = this.props;
    return (
      <div className={styles.help}>{this._dir(dir[dir.length - 1])}</div>
    )
  }
  _dir(current) {
  	const available = map(showDir(current), (contents, dir) => {
      return (
        <li key={dir}>{this._pathing(contents, dir)}</li>
      )
    });
   return available;
  }
  _pathing(contents, dir) {
    switch (typeof contents) {
      case 'string':
        return <span className={styles.file}>{`${dir}.${contents}`}</span>
      case 'object':
        return <span className={styles.contents}>{dir}</span>
    }
  }
}

export default connect(state => state.Terminal)(Ls)