import React, { Component } from 'react';
import { connect } from 'react-redux';
import { keys } from 'lodash';

let files = {
  'love.jpg': require('./assets/love.jpg'),
  'kitty.jpg': require('./assets/kitty.jpg'),
  'jesse.jpg': require('./assets/jesse.jpg'),
  'party.gif': require('./assets/party.gif'),
  'banana.gif': require('./assets/banana.gif'),
  'unicorn.gif': require('./assets/unicorn.gif'),
  'dickbutt.png': require('./assets/dickbutt.png'),
  'hello.txt': require('./assets/hello.txt'),
  'skills.txt': require('./assets/skills.txt'),
  'passion.txt': require('./assets/passion.txt'),
  'art.txt': require('./assets/art.txt'),
  'prdio.com': 'http://www.prdio.com',
  'twitter.com': 'https://twitter.com/_jesseAbramson',
};

export function getFile(name) {
	const type = name.split('.', 2)[1];
	return [files[name], type];
};