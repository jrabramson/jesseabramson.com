import React, { Component } from 'react';
import * as ActionTypes from '../constants/ActionTypes';

let defaultState = {
  lines: [],
  dir: ['/jesse/']
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.LINE_ENTERED:
      if (state.dir.length == state.lines.length) {
        state.dir.push(state.dir[state.dir.length - 1])
      }
      state.lines.push(parse(action));
      return {
          ...state,
          lines: state.lines,
          dir: state.dir
      };
    case ActionTypes.DIR_CHANGED:
      state.dir.push(action.text);
      return {
          ...state,
          dir: state.dir
      };
    default:
      return state;
  }
}

function parse(action) {
  const line = action.text;
  const params = line.split(' ');
  const method = params.shift();

  return {
    line: line,
    method: method,
    params: params,
    system: action.system
  };
}