
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

MongoClient.connect('mongodb://localhost:27017/euros',function(err,db) {

	app.set('port',process.env.PORT || 3000);

	app.use(bodyParser.urlencoded({'extended':'false'}));
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname,'builds')));

	compiler.watch(compilerOptions,compilerFunction);

	app.get('/', function(req,res) { 
		console.log('new6');
		if(req.cookies.user) {
			console.log(req.cookies);
			res.sendFile(path.join(__dirname + '/builds/templates/index.html'));
		} else {
			console.log(req.cookies);
			res.sendFile(path.join(__dirname + '/builds/templates/login.html'));
		}
	});
	
	app.post('/signup', function(req,res) {
		console.log('signup req');
	});
	
	app.post('/login', function(req,res) {
		res.cookie('user','paul',{expires: new Date(Date.now() + 900000),httpOnly:false,domain:'superdomain.com'}).send();
	});

	app.listen(app.get('port'), function() {
		console.log("Node app is running at localhost:" + app.get('port'));
	});
	
});