import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TerminalActions from '../actions/TerminalActions';
import { getCommand, completion } from './commandMap';
import styles from '../app.scss';
import Comment from './Comment.js';
import Error from './Error.js';
import HistoryItem from './HistoryItem.js';

var lore = 0;

@connect(state => ({
  state: state.Terminal
}))

class Terminal extends React.Component {
  componentDidMount() {
      this.refs.terminalInput.focus();
      this._keepScroll();
      this._boot();
  }
  componentDidUpdate() {
      this._keepScroll();
  }
  render() {
    const { lines, dir, dispatch } = this.props;
    const actions = bindActionCreators(TerminalActions, dispatch);
    return (
      <div id={styles.terminalwrap}>
        <div id={styles.terminal} ref='terminal' onClick={e => this._terminalFocus()}>
          <ul className={styles.feed}>
            {this._history(lines, dir)}
          </ul>
          <div className={styles.location} ref='location'>
            {dir[dir.length - 1]}>
          </div>
          <div className={styles.input} ref='input'>
            <input type='text' maxLength='60' onKeyDown={e => this._enterLine(actions, e, lines)} ref='terminalInput' />
          </div>
          <div className={styles.overlay}></div>
        </div>
      </div>
    );
  }
  _terminalFocus() {
    this.refs.terminalInput.focus();
  }
  _enterLine(actions, event, lines) {
    const terminalInput = this.refs.terminalInput;
    if (event.keyCode === 13) {
        lore = 0;
        actions.enterLine(event.target.value, false);
        terminalInput.value = '';
        terminalInput.focus;
    } else if (event.keyCode === 38) {
        lore < lines.length ? lore++ : null;
        terminalInput.value = lines[lines.length - lore].line;
    } else if (event.keyCode === 9) {
        event.preventDefault();
        terminalInput.value = completion(event.target.value, this.props.dir[this.props.dir.length - 1]);
        terminalInput.focus;
    }
  }
  _history(lines, dir) {
    const hist = lines.map((line, index) => {
      const currDir = dir[index];
      const command = getCommand(line.method, line.params);
      return (
        <HistoryItem line={line.line} loc={currDir} key={index} system={line.system}>
          {command || <Error method={line.method} params={['command not found, type `help` for available commands']} />}
        </HistoryItem>
      )
    });
    return hist;
  }
  _keepScroll() {
    const terminal = this.refs.terminal;
    terminal.scrollTop = terminal.scrollHeight;
  }
  _boot() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(TerminalActions, dispatch);

    setTimeout(() => {
      actions.enterLine('comment JesseOS 1.2', true);
    }, 3500);

    setTimeout(() => {
      actions.enterLine('comment Last Login ' + new Date(), true);
    }, 4000);

    setTimeout(() => {
      actions.enterLine('comment Type <span style="color: orange">help</span> for a list of available commands', true);
    }, 4500);

    setTimeout(() => {
      this.refs.location.style.setProperty('display', 'block')
      this.refs.input.style.setProperty('display', 'block')
      this.refs.terminalInput.focus();
    }, 5000);
  }
}

export default Terminal;
