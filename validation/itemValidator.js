// SPD


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

exports.valid_logReqest = function(req) {

	var apiKey = req.header('api_key');

	//TODO: more validation... 
	if(req == null) {
		return false;
	} else if (apiKey == null || apiKey.length == 0)  {
		return false;
	}

	return true;
};