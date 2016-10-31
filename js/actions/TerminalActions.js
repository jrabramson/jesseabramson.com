import {LINE_ENTERED} from '../constants/ActionTypes';
import {DIR_CHANGED} from '../constants/ActionTypes';

export function enterLine(text) {
  return {
    type: LINE_ENTERED,
    text
  }
}

export function changeDir(text) {
  return {
    type: DIR_CHANGED,
    text
  }
}
