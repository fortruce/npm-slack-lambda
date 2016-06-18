'use strict';

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const environment = require(path.resolve(__dirname, 'project.json')).environment;
let dependencies = require(path.resolve(process.cwd(), 'package.json')).dependencies;
dependencies = Object.keys(dependencies).reduce(function(acc, dep) {
	acc[dep] = dep;
	return acc;
}, {});

module.exports = {
	entry: path.resolve(__dirname, 'test.js'),
	target: 'node',
	output: {
		path: './build',
		filename: 'test.js',
		libraryTarget: 'commonjs2'
	},
	externals: [ dependencies ],
	resolve: {
		root: [ __dirname ]
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin(Object.keys(environment).reduce(function(acc, key) {
			acc[`process.env.${key}`] = `"${environment[key]}"`;
			return acc;
		}, {})),
		new webpack.ProvidePlugin({
			Lambda: path.resolve(process.cwd(), 'index')
		})
	]
};
