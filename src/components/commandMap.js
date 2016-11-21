import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fileCompletion } from './dirMap'
import { keys } from 'lodash';

import Comment from './Comment.js'
import Error from './Error.js'
import Help from './Help.js'
import View from './View.js'
import Ls from './Ls.js'
import Cd from './Cd.js'


let commands = {
	comment: Comment,
	error: Error,
	help: Help,
	view: View,
	ls: Ls,
	cd: Cd
};

export function getCommand(type, params) {
	const Command = commands[type] || false;

	if (Command) {
		return <Command method={type} params={params} />;
	}

	return false;
};

export function completion(partial, dir) {
	if (partial == '') return '';
	const input = partial.split(' ');
	if (input.length > 1) return `${input[0]} ${(fileCompletion(input[1], dir))}`;
	const commandKeys = keys(commands).filter(key => {
		return ~key.indexOf(partial);
	});
	return commandKeys.length == 0 ? partial : commandKeys;
};