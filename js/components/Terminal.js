import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as TerminalActions from '../actions/TerminalActions';
import styles from '../../css/app.css';
import Comment from './Comment.js';
import Error from './Error.js';
import HistoryItem from './HistoryItem.js';
import {getCommand, completion} from './commandMap';

const login = new Date();
var history = 0;

@connect( state => {return state} )
class Terminal extends Component {
  componentDidMount() {
      this.refs.terminalInput.getDOMNode().focus();
      this._keepScroll();
  }
  componentDidUpdate() {
      this._keepScroll();
  }
  render() {
    const {lines, dir, dispatch} = this.props;
    const actions = bindActionCreators(TerminalActions, dispatch);
    return (
      <main id={styles.terminal} ref='terminal' onClick={e => this._terminalFocus()}>
        <ul className={styles.feed}>
          <Comment method='comment' params={['Redux/React Shell by Jesse Abramson']} />
          <Comment method='comment' params={['System Version 0.7']} />
          <Comment method='comment' params={['Last Login', login]} />
          <Comment method='comment' params={['Type help for a list of available commands']} />
          {this._history(lines, dir)}
        </ul>
        <div className={styles.location}>
          {dir[dir.length - 1]}> 
        </div>
        <div className={styles.input}>
          <input type='text' onKeyDown={e => this._enterLine(actions, e, lines)} ref='terminalInput' id='terminal' />
        </div>
      </main>
    );
  }
  _terminalFocus() {
    this.refs.terminalInput.getDOMNode().focus();
  }
  _enterLine(actions, event, lines) {
    const terminalInput = this.refs.terminalInput.getDOMNode();
    if (event.keyCode === 13) {
        history = 0;
        actions.enterLine(event.target.value);
        terminalInput.value = '';
        terminalInput.focus;
    } else if (event.keyCode === 38) {
        history < lines.length ? history++ : null;
        terminalInput.value = lines[lines.length - history].line;
    } else if (event.keyCode === 9) {
        event.preventDefault();
        terminalInput.value = completion(event.target.value, this.props.dir[this.props.dir.length - 1]);
        terminalInput.focus;
    }
  }
  _history(lines, dir) {
    const history = lines.map((line, index) => {
      const command = getCommand(line.method, line.params);
      const currDir = dir[index];
      return (
        <HistoryItem line={line.line} loc={currDir} key={index}>
          {command || <Error method={line.method} params={['command not found']} />}
        </HistoryItem>
      )
    });
    return history;
  }
  _keepScroll() {
    const terminal = this.refs.terminal.getDOMNode();
    terminal.scrollTop = terminal.scrollHeight;
  }
}

export default connect(state => state.Terminal)(Terminal)
