'use strict';

/**
 * Is launched for each list items
 * @callback onUpdateCallback
 * @param {string} searchValue
 * @param {HTMLElement} listItem
 * @param {boolean} isMatching
 * @return boolean
 *
 * Is launched before finish
 * @callback onAfterSearchCallback
 * @param {string} searchValue
 * @param {HTMLElement[]} foundElements
 */

/**
 * @constructor
 */
function ListFilter () {

	/**
	 * @param {HTMLElement} trigger
	 * @param {HTMLElement} list
	 * @param {object} options
	 * @param {boolean} options.caseSensitive
	 * @param {Number} options.keyupDelay
	 * @param {boolean} options.searchInHtml
	 * @param {onUpdateCallback} options.onSearch
	 * @param {onAfterSearchCallback} options.onAfterSearch
	 */
	this.init = (trigger, list, options) => {
		//let me = this;
		let timeoutOnGoing;

		// options
		let defaults = {
			caseSensitive: false,
			keyupDelay: 200,
			onAfterSearchCallback: false,
			onUpdateCallback: false,
			searchInHtml: false
		};
		options = Object.assign(defaults, options);

		// event
		trigger.onkeyup = function () {
			clearTimeout(timeoutOnGoing);
			setTimeout(function () {
				// todo caseSensitive
				let regex = new RegExp( `.*${ trigger.value.toLowerCase().trim() }.*`);
				let listItems = list.getElementsByTagName('li');
				for(let li of listItems){
					// todo searchIHtml
					// todo caseSensitive
					let match = regex.test(li.innerHTML.toLowerCase());
					// todo onSearch
					if(match){
						li.style.display = '';
					}else{
						li.style.display = 'none';
					}
				}
				// todo onAfterSearch
			}, options.keyupDelay);
		};
	};
}

const oListFilter = new ListFilter();
module.exports = oListFilter;
if (typeof window !== 'undefined') {
	window.ListFilter = oListFilter;
}
