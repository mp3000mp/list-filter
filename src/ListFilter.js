'use strict';

/**
 * @constructor
 */
function Listfilter () {

	/**
	 * Finds all tr[data-href] and wrap <td> contents in a <a> tag
	 * Possibility to set data-target with a valid target attribute value
	 * @param DOMElement
	 */
	this.init = (DOMElement) => {
		const triggers = DOMElement || document.querySelectorAll('input[data-list]');
		triggers.forEach(function (trigger) {
			console.log(trigger);
		});
	};
}

const oListFilter = new Listfilter();
module.exports = oListFilter;
if (typeof window !== 'undefined') {
	window.ListFilter = oListFilter;
}
