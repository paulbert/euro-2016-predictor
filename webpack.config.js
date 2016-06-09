var webpack = require('webpack');

module.exports = {
	entry: {
		'index':'./src/index.js',
		'login':'./login-src/index.js'
	},
	output: {
		path: 'builds',
		filename: '[name].bundle.js',
		sourceMapFilename: 'bundle.map'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'main',
			children: true,
			minChunks: 2
		})
	],
	module: {
		loaders: [
			{ test: /\.json$/, loader: 'json' },
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query:{presets:['es2015','react','stage-0']} }
		]
	}	
};
