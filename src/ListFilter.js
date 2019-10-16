'use strict';

/**
 * Is launched for each list items
 * @callback onUpdateCallback
 * @param {string} searchPattern
 * @param {HTMLElement} element
 * @param {boolean} isMatching
 * @return boolean
 *
 * Is launched before finish
 * @callback onAfterSearchCallback
 * @param {string} searchPattern
 * @param {HTMLElement[]} foundElements
 */



/**
 * init events for binding the list with trigger
 * @param {HTMLElement} trigger
 * @param {HTMLElement} list
 * @param {object} [options]
 * @param {boolean} options.caseSensitive
 * @param {Number} options.keyupDelay
 * @param {boolean|String} options.searchInAttribute
 * @param {boolean|onUpdateCallback} options.onSearch
 * @param {boolean|onAfterSearchCallback} options.onAfterSearch
 * @constructor
 */
let ListFilter = function (trigger, list, options) {

	let me = this;
	let listItems = list.getElementsByTagName('li');
	let isMatching, matchingLiElements, searchPattern, timeoutOnGoing;

	// options
	let defaults = {
		caseSensitive: false,
		keyupDelay: 50,
		onAfterSearch: false,
		onSearch: false,
		searchInAttribute: false
	};
	options = Object.assign(defaults, options);

	/**
	 * @param {String} triggerValue
	 * @returns {string}
	 */
	function getSearchPattern(triggerValue)
	{
		if(!options.caseSensitive){
			return triggerValue.toLowerCase();
		}else{
			return triggerValue;
		}
	}

	/**
	 * @param {HTMLElement} li
	 * @returns {string}
	 */
	function getLiValue(li)
	{
		let str;
		if(options.searchInAttribute === false){
			str = li.innerHTML;
		}else{
			str = li.getAttribute(options.searchInAttribute);
		}
		if(!options.caseSensitive){
			return str.toLowerCase();
		}else{
			return str;
		}
	}

	/**
	 * @param {String} sPattern
	 * @param {HTMLElement} li
	 */
	function testMatch(sPattern, li)
	{
		let isMatching;
		let sValue = getLiValue(li);
		isMatching = sValue.indexOf(sPattern) >= 0;
		if(typeof(options.onSearch) === 'function'){
			isMatching = options.onSearch(sPattern, li, isMatching);
		}
		return isMatching;
	}

	/**
	 * @param {HTMLElement} li
	 * @param {boolean} isMatching
	 */
	function updateDisplay(li, isMatching)
	{
		if(isMatching){
			li.style.display = '';
		}else{
			li.style.display = 'none';
		}
	}

	/**
	 * refresh DOM
	 */
	this.refresh = function(){
		clearTimeout(timeoutOnGoing);
		setTimeout(function () {

			matchingLiElements = [];
			searchPattern = getSearchPattern(trigger.value);
			console.log(searchPattern);

			for(let liElement of listItems){
				console.log(liElement.innerHTML);
				isMatching = testMatch(searchPattern, liElement);

				if(isMatching){
					matchingLiElements.push(liElement);
				}

				updateDisplay(liElement, isMatching);
				console.log(liElement.style.display);
			}

			if(typeof(options.onAfterSearch) === 'function'){
				options.onAfterSearch(searchPattern, matchingLiElements);
			}
		}, options.keyupDelay);
	};

	// event
	trigger.onkeyup = function(){
		me.refresh();
	};

};

module.exports = ListFilter;
if (typeof window !== 'undefined') {
	window.ListFilter = ListFilter;
}
