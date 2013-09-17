// SPD

var express       = require('express');
var app           = express();
var port          = process.env.PORT;
var logFetcher    = require('./routes/logs');
var apiKeyFetcher = require('./routes/api_keys');
var authValidator = require('./validation/AuthValidator');
var logValidator = require('./validation/logValidator');

// Config

app.configure(function () {
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.cookieSession({secret: "SocialNet secret key"}));
    // wasnt working for me - mat
    app.use(express.static(__dirname + '/public'));
});

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

// Routes

app.get('/logs', logFetcher.findAll);
app.get('/logs/:id', logFetcher.findById);
app.get('/logs/log/:sfid', logFetcher.findLogForSFID);
app.get('/view', function(req,res){
	
	if (req.session.user_id == null || req.session == null) {
		console.log("Invalid session");
	 	res.send(403);
	 	return;
	}

	res.render('view.html');
}); 

// Primary upload route

app.post('/log', logValidator.checkLogRequest, logFetcher.addLog);

// Login form

app.get('/login_form', function(req, res){
  res.render('login_form.html');
});

app.post('/login', function(req, res) {
  
  console.log('login request');
  
  var username = req.param('username', null);
  var password = req.param('password', null);

  /**
   * For now we are defaulting to admin/admin with password
   * hardcoded
   */

  if (null == username || username.length < 1) {
    
    res.send(400);
    
    return;
  }

  if (username === 'admin' && password === 'admin') {

    console.log('login was successful');
    
    req.session.user_id = 'admin';
    
    res.redirect('/admin');

  } else {

    res.send(401);
    
    return;
  }
});

app.get('/logout', function(req, res) {
  
  console.log('logout request');

  req.session = null;
  
  res.redirect('/login_form');
});

app.get('/api_keys', authValidator.checkAuth, apiKeyFetcher.findAll);
app.post('/generate_key', authValidator.checkAuth, apiKeyFetcher.addAPIKey);

// static files

app.get('/admin', authValidator.checkAuth, function (req, res) {
    res.render('admin.html');
});

app.listen(port, function() {
	console.log("listing on port: " + port);
});

