// SPD 

var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;

ItemFetcher = function(uri, callback) {
	MongoClient.connect(uri, function(err, db) {
  		
  		if(!err) {
    		console.log("We are connected");
  		} else {
    		console.log("We are NOT connected");
  		}

  		callback(err,db);
	});
};


exports.ItemFetcher = ItemFetcher;
