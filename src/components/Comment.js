import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../app.scss';
import Typist from 'react-typist';
import ReactHtmlParser from 'react-html-parser';

class Comment extends Component {
  render() {
    const { method, params = [] } = this.props;
    const content = params.join(' ');
    const message = this._content();
    return (
      <Typist cursor={{ show: false }}>
        <li className={styles.comment}>{ ReactHtmlParser(content) }</li>
      </Typist>
    )
  }
  _content() {
    const { params = [] } = this.props;
    const content = params.join(' ');

    return <span dangerouslySetInnerHTML={{__html: content}}></span>;
  }
}

export default connect(state => state.Terminal)(Comment)