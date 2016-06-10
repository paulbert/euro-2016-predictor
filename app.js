
var webpack = require('webpack'),
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	path = require('path'),
	MongoClient = require('mongodb'),
	compilerOptions = {
		aggregateTimeout:300,
		poll:true
	},
	compilerFunction = function(err,stats) {
		console.log(err);
		console.log(stats.toJSON);
	};
	
var compiler = webpack({
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
});

var db_name = 'euros';

var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;

var routes = require('./routes/index.js');

if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

MongoClient.connect(mongodb_connection_string,function(err,db) {

	app.set('port',process.env.OPENSHIFT_NODEJS_PORT || 3000);
	app.set('ip',process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({'extended':'true'}));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname,'builds')));

	compiler.watch(compilerOptions,compilerFunction);
	
	routes(app,db);

	app.listen(app.get('port'),app.get('ip'), function() {
		console.log("Node app is running at " + app.get('ip') + ":" + app.get('port'));
	});
	
});