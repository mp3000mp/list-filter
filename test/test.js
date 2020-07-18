'use strict';

require('jsdom-global')();
const assert = require('assert');
const cheerio = require('cheerio');
const fs = require('fs');
//require('ignore-styles');
const path = require('path');
const ListFilter = require('../src/ListFilter');

const lists = ['my-list', 'my-table'];
const elementsTag = ['li', 'tr'];

for(let z=0; z<lists.length; z++){
	describe(`ListFilter on #${lists[z]}`, function () {
		const $ = cheerio.load(fs.readFileSync(path.resolve(__dirname, 'html/basic.html')));
		window.document.body.innerHTML = $.html();
		let trigger = window.document.getElementById('trigger');
		let list = window.document.getElementById(lists[z]);
		let listElements = list.getElementsByTagName(elementsTag[z]);

		describe('#refresh()', function () {
			// caseSensitive false
			it('should hide only second element', function () {
				let oListFilter = new ListFilter(trigger, list, {
					caseSensitive: false,
				});
				trigger.value = 'a';
				oListFilter.refresh();
				assert.deepStrictEqual(listElements[0].style.display,'');
				assert.deepStrictEqual(listElements[1].style.display,'none');
			});
			// caseSensitive true
			it('should hide all', function () {
				let oListFilter = new ListFilter(trigger, list, {
					caseSensitive: true,
				});
				trigger.value = 'a';
				oListFilter.refresh();
				assert.deepStrictEqual(listElements[0].style.display,'none');
				assert.deepStrictEqual(listElements[1].style.display,'none');
			});
			// search in attribute
			it('should hide only first element', function () {
				let oListFilter = new ListFilter(trigger, list, {
					caseSensitive: false,
					searchInAttribute: 'data-value',
				});
				trigger.value = 'a';
				oListFilter.refresh();
				assert.deepStrictEqual(listElements[0].style.display,'none');
				assert.deepStrictEqual(listElements[1].style.display,'');
			});
			// onSearch
			it('should hide all', function () {
				let i = 0;
				let oListFilter = new ListFilter(trigger, list, {
					onSearch: function(searchPattern, element, isMatching){
						i++;
						return false;
					}
				});
				trigger.value = 'a';
				oListFilter.refresh();
				assert.deepStrictEqual(i, 2);
				assert.deepStrictEqual(listElements[0].style.display,'none');
				assert.deepStrictEqual(listElements[1].style.display,'none');
			});
			// onAfterSearch
			it('should return one item', function () {
				let oListFilter = new ListFilter(trigger, list, {
					onAfterSearch: function(searchPattern, foundElements){
						assert.deepStrictEqual(foundElements.length,1);
					}
				});
				trigger.value = 'a';
				oListFilter.refresh();
			});
			// delay
			it('should wait before hide all', function () {
				let oListFilter = new ListFilter(trigger, list, {
					keyupDelay: 100,
				});
				trigger.value = '';
				oListFilter.refresh();
				trigger.value = 'c';
				trigger.dispatchEvent(new KeyboardEvent('keyup',{'key':'c'}));
				//oListFilter.refresh(true);
				assert.deepStrictEqual(listElements[0].style.display,'');
				assert.deepStrictEqual(listElements[1].style.display,'');
				setTimeout(function(){
					assert.deepStrictEqual(listElements[0].style.display,'none');
					assert.deepStrictEqual(listElements[1].style.display,'none');
				},200);
			});
		});
	});
}
