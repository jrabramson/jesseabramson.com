import { LINE_ENTERED } from '../constants/ActionTypes';
import { DIR_CHANGED } from '../constants/ActionTypes';
import { SYSTEM_OUT } from '../constants/ActionTypes';

export function enterLine(text, system) {
  return {
    type: LINE_ENTERED,
    text,
    system
  }
}

export function changeDir(text) {
  return {
    type: DIR_CHANGED,
    text
  }
}

export function systemOut(text) {
  return {
    type: SYSTEM_OUT,
    text
  }
}
