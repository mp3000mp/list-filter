'use strict';

require('jsdom-global')();
const assert = require('assert');
const cheerio = require('cheerio');
const fs = require('fs');
//require('ignore-styles');
const path = require('path');
const ListFilter = require('../src/ListFilter');

describe('ListFilter', function () {
	const $ = cheerio.load(fs.readFileSync(path.resolve(__dirname, 'html/basic.html')));
	window.document.body.innerHTML = $.html();
	let trigger = window.document.getElementById('trigger');
	let list = window.document.getElementById('my-list');
	let listElements = list.getElementsByTagName('li');
	describe('#refresh()', function () {
		// caseSensitive false
		it('should hide only second element', function () {
			let oListFilter = new ListFilter(trigger, list, {
				caseSensitive: false
			});
			trigger.value = 'a';
			console.log(listElements[0].style.display + '-' + listElements[1].style.display);
			oListFilter.refresh();
			console.log(listElements[0].style.display + '-' + listElements[1].style.display);
			assert.deepStrictEqual(listElements[0].style.display,'');
			assert.deepStrictEqual(listElements[1].style.display,'none');
		});
		// caseSensitive true
		it('should hide all', function () {
			let oListFilter = new ListFilter(trigger, list, {
				caseSensitive: true
			});
			trigger.value = 'a';
			oListFilter.refresh();
			assert.deepStrictEqual(listElements[0].style.display,'none');
			assert.deepStrictEqual(listElements[1].style.display,'none');
		});
	});
});
