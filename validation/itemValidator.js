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
