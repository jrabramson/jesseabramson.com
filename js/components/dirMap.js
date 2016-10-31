import React, {Component} from 'react';
import {connect} from 'react-redux';
import keys from 'lodash/object/keys'
import values from 'lodash/object/values'
import zip from 'lodash/array/zip'

let structure = require('../../api/structure.json')

export function showDir(current) {
	const dir = breakdown(current);
	return zip(keys(fetch(dir)), values(fetch(dir)));
};

export function changeDir(param, current) {
	const dir = breakdown(current);
	const options = fetch(dir);

	if (options[param] && (typeof(options[param]) === 'object')) {
		dir.push(param);
		dir.shift();
 		return `/${dir.join('/')}/`
 	}
 	else if ((param == '..')) {
		dir.shift();
		return dir.length === 1 ? 'error' : `/${(dir.slice(0, -1)).join("/")}/`
 	} 
 	else {
 		return 'error';
 	}
};

export function fileCompletion(partial, current) {
	const dir = breakdown(current);
	const fileKeys = keys(fetch(dir)).filter((key, val) => {
		return ~key.indexOf(partial);
	});
	if (fileKeys.length == 0) {
		return partial;
	} else {
		if (typeof(fetch(dir)[fileKeys[0]]) === 'object') {
			return fileKeys[0]
		} else {
			return [fileKeys[0], fetch(dir)[fileKeys[0]]].join('.');
		}
	} 
};

function breakdown(current) {
	const breakdown = current.split('/').filter(d => {
		return d != '';
	});
	breakdown.unshift('structure');
	return breakdown;
};

function fetch(dir) {
	return eval(dir.join('.'));
}