# list-filter
Simple library with no dependencies that help you to hide html list items that do not match a pattern

[![Build Status](https://travis-ci.com/mp3000mp/list-filter.svg?branch=master)](https://travis-ci.com/mp3000mp/list-filter)
[![Coverage Status](https://coveralls.io/repos/github/mp3000mp/list-filter/badge.svg?branch=master)](https://coveralls.io/github/mp3000mp/list-filter?branch=master)
[![npm version](https://badge.fury.io/js/list-filter.svg)](https://badge.fury.io/js/list-filter)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
 
Table of Contents
-----------------

 - [Demo](#demo)
 - [Installation](#installation)
 - [Usage](#usage)
 - [Examples](#examples)


Demo
----

[Try it on JSFiddle](https://jsfiddle.net/)


Installation
------------

```sh
npm install --save list-filter
```


Usage
-----

```js
// This will create window.TableTrHref
const ListFilter = require('list-filter')
```


Examples
--------

You can force rendering a DOMElement:
```js
// on document ready
document.addEventListener('DOMContentLoaded', function(){
    // This will look for input[data-list] in document
    ListFilter.init();
    // This will look force initialize on #my-input
    ListFilter.init(document.getElementById('my-input'));
});
```
