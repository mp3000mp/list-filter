'use strict';

require('jsdom-global')();
const assert = require('assert');
const cheerio = require('cheerio');
const fs = require('fs');
require('ignore-styles');
const path = require('path');
const ListFilter = require('../src/ListFilter');

describe('ListFilter', function () {
  const $ = cheerio.load(fs.readFileSync(path.resolve(__dirname, 'html/basic.html')));
  describe('#init()', function () {
	it('todo', function () {
	  window.document.body.innerHTML = $.html();
	  ListFilter.init();
	});
  });
});
