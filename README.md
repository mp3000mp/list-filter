# list-filter
Simple library with no dependencies that help you to hide html list items or table rows that do not match a pattern

[![Build Status](https://travis-ci.com/mp3000mp/list-filter.svg?branch=master)](https://travis-ci.com/mp3000mp/list-filter)
[![Coverage Status](https://coveralls.io/repos/github/mp3000mp/list-filter/badge.svg?branch=master)](https://coveralls.io/github/mp3000mp/list-filter?branch=master)
[![npm version](https://badge.fury.io/js/%40mp3000mp%2Flist-filter.svg)](https://badge.fury.io/js/%40mp3000mp%2Flist-filter)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
 
Table of Contents
-----------------

 - [Demo](#demo)
 - [Installation](#installation)
 - [Usage](#usage)
 - [Configuration](#configuration)
 - [Examples](#examples)


Demo
----

[Try it on JSFiddle](https://jsfiddle.net/g9u6ybsp/)


Installation
------------

```sh
npm install --save @mp3000mp/list-filter
```


Usage
-----

```js
// This will create window.ListFilter
const ListFilter = require('list-filter')
```


Example
--------

You have to create a new instance for binding a list to an input trigger
```js
// on document ready
document.addEventListener('DOMContentLoaded', function(){
    let trigger = document.getelementById('my-trigger');
    let list = document.getelementById('my-list'); // works with table or ul element
    let options = {};

    let oListFilter = new ListFilter(trigger, list, options);
});
```


Configuration
--------

Here are the key you can use to configure your instance

| Key               | Type           | Default | Description                                                                                  |
|-------------------|----------------|---------|----------------------------------------------------------------------------------------------|
| caseSensitive     | boolean        | false   | Case sensitive search or not.                                                                |
| keyupDelay        | Number         | 50      | Time in millisecond before refreshing the DOM.                                               |
| searchInAttribute | boolean or string | false   | Data attribute used for comparison, innerHTML if false.                                      |
| onSearch          | Callback       | null    | Function to run after each comparison, return true to display the element, false to hide it. |
| onAfterSearch     | Callback       | null    | Function to run after DOM refresh.                                                           |
|                   |                |         |     
