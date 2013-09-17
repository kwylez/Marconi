// SPD

var db = require('../routes/collections.js').db();
var keys = db.collection('api_keys');

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

	keys.find(function(err, docs) {
	    if (err) {
			console.log('Error accessing api keys '+ err);
        	res.send(404);
        	return;
	    }

	    console.log('comparing stored key: ' + JSON.stringify(docs, null, "    ") + ' with sent key: ' + apiKey);
	    
	    if(docs == null || docs.length == 0) {
	    	console.log('No Stored key!');
        	res.send(404);
        	return;
	    }

		var storedKey = docs[0]['api_key'];

		if (storedKey == "" || storedKey == null) {
			console.log('Bad Stored Key');
        	res.send(404);
        } else if (storedKey == apiKey) {
	    	next();
        } else {
			console.log('Permission Denied');
        	res.send(404);
        }
  	});
};

