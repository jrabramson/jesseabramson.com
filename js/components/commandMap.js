import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fileCompletion} from './dirMap'
import keys from 'lodash/object/keys'
import values from 'lodash/object/values'
import zip from 'lodash/array/zip'


let commands = {
	comment: require('./Comment.js'),
	error: require('./Error.js'),
	help: require('./Help.js'),
	view: require('./View.js'),
	ls: require('./Ls.js'),
	cd: require('./Cd.js')
};

let tooltips = {
	comment: ' - display text formatted as a comment',
	error: ' - raise an error',
	help: ' - list all commands or help [command]',
	view: ' - show file contents, usage: view [file]',
	ls: ' - list all files and folders in current directory',
	cd: ' - change directory, usage: cd [dir] or cd .. to go up a level'
};

export function getCommand(type, params) {
	if (type == 'dickbutt') {
		const Command = commands.view;
		return <Command method='view' params={['dickbutt.png']} />;
	}
	const Command = commands[type] || false;
	return Command ? <Command method={type} params={params} /> : false;
};

export function listCommands() {
	return zip(keys(commands), values(tooltips));
};

export function commandTip(command) {
	return tooltips[command] || ' - no commands found';
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