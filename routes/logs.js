// SPD


var verify = require('../validation/logValidator.js');
var db = require('../routes/collections.js').db();
var logs = db.collection('logs');
var ObjectId = db.ObjectId;

/* Routes */

// GRAB ALL
exports.findAll = function(req, res) {

	db.logs.find(function(err, docs) {

		if(err) {
			res.send("error finding all: " + err);
			return;
		}

		//res.send("num of logs " + docs.length + " " + JSON.stringify(docs, null, "    "));
		res.send(docs);
    });
};

// FIND SPECIFIC
exports.findById = function(req, res) {

	var idToFind = req.params.id;

	if(verify.isValidObjectId(idToFind) == false) {
		res.send("No document with id: " + idToFind);
		return;
	}

	db.logs.find({ _id : ObjectId(idToFind) }, function(err, doc) {

		if(err) {
			res.send("No document with id: " + idToFind);
			return;
		}

		res.send(doc);
	});
};

// FIND ENTIRE LOG FOR SFID
exports.findLogForSFID = function(req, res) {

        var sfidToFind = req.params.sfid;

        db.logs.find({ "sfid" : sfidToFind }, function(err, doc) {

                if(err || !doc || !doc.length) {
                        res.send("No logs with name: " + sfidToFind);
                        return;
                }

                res.send(doc);
        });
};


// INSERT FROM UPLOADED FILE
// Note: only using files here based on current limitations of NSURLSession
exports.addLog = function(req, res) {

	var data = '';

    req.on('data', function(chunk) { 
       data += chunk;
    });

    req.on('end', function() {

        var anItem = JSON.parse(data);
        
        console.log("got json " + data);

        db.logs.insert(anItem, {safe:true}, function(err, result) {
        	
			if(err) {
				console.log("Error inserting "+ err);
				res.send(404); 
			} else {
				console.log("success");
				res.send(201); 
			}
		});

    });
    
    req.on('error', function(e) {
        console.log("ERROR: " + e.message);
    });
};


// INSERT
exports.addItem = function(req, res) {

	var anItem = req.body;

	if (verify.valid_item(anItem) == false) {
		res.send("bad insert");
		return;
	}

	console.log("adding item: " + JSON.stringify(anItem));

	db.logs.insert(anItem, {safe:true}, function(err, result) {

		if(err) 
			res.send("Error inserting "+ err);
		else 
			res.send(anItem); 
	});
};







