//优化1
process.env.NODE_ENV = 'production';
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
module.exports = {
	context: path.join(__dirname, "src"),
	devtool: debug ? "inline-sourcemap" : null,
	entry: "./js/main.js",
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
	 				presets: ['react', 'es2015', 'stage-0'],
	 				plugins: ['transform-decorators-legacy']	
				}
			}
		]
	},
	output: {
	path: __dirname + "/src/",
	filename: "main.min.js"
	},
	plugins: debug ? [] : [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],
};