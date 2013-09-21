// SPD

var db = require('../routes/collections.js').db();
var keys = db.collection('api_keys');
var api_keys = require('../routes/api_keys.js')

// ObjectIDs

exports.isValidObjectId = function(id) {

	if(id == null || (id.length != 12 && id.length != 24)) {
		console.log('ID is invalid');
		return false;
	}
	console.log('ID is valid');
	return true;
};

// Insertion 

exports.valid_item = function(item) {

	if(item == null) {
		return false;
	}
	return true;
};

// Log insert request validation

exports.checkLogRequest = function(req, res, next) {

	var apiKey = req.header('api_key');

  var storedKey = null;

  api_keys.getAPIKey(function(apiKeyObj, error){

    if (error === null) {
      
      storedKey = apiKeyObj[0]['api_key'];

    } else {

      console.log("invalid API key: " + error);
    }
  });

  if (storedKey == "" || storedKey == null) {

    console.log('Bad Stored Key');

    res.send(400);

  } else if (storedKey == apiKey) {

      next();

  } else {

    console.log('Permission Denied' + storedKey);

    res.send(401);
  }
};

