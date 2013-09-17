
/**
 * Which ones of these do I need?
 */

var uri       = process.env.MONGOLAB_URI;
var mongojs   = require('mongojs');
var conString = process.env.MONGOLAB_URI || "localhost/api_keys";
var db        = mongojs(conString, ['api_keys']);
var api_keys  = db.collection('api_keys');
var fs        = require('fs');
var ObjectId  = db.ObjectId;

var generateRandomString = function() {

  var text     = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 25; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

// GRAB ALL
exports.findAll = function(req, res) {

  db.api_keys.find(function(err, docs) {

    if (err) {
      
      res.send("error finding all: " + err);
      
      return;
    }

    res.send(JSON.stringify(docs, null, "    "));
  });
};

// INSERT
exports.addAPIKey = function(req, res) {

  /**
   * Delete existing and then recreate. Yes there is a better way to do this.
   */
  
  db.api_keys.remove();

  db.api_keys.insert({'api_key' : generateRandomString()}, {safe:true}, function(err, result) {

    if (err) 
      res.send("Error inserting "+ err);
    else 
      res.send(result); 
  });
};
