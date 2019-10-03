'use strict';
const path = require('path');

module.exports = {
	entry: './src/TableTrHref.js',
	module: {
		rules: [{
			exclude: /node_modules/,
			loader: 'eslint-loader',
			options: {
				fix: false,
				format: 'stylish',
				outputReport: {
					filePath: 'eslint.html',
					formatter: 'html'
				}
			},
			test: /\.js$/
		}, {
			loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
			test: /\.scss$/
		}]
	},
	output: {
		filename: 'TableTrHref.min.js',
		path: path.resolve(__dirname, 'dist')
	}
};
