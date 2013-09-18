
var db       = require('../routes/collections.js').db();
var api_keys = db.collection('api_keys');
var cache    = require('memory-cache');

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

  if (cache.get('api_key') !== null) {
    
    res.send(cache.get('api_key'));

  } else {

    db.api_keys.find(function(err, docs) {

      if (err) {
        
        res.send("error finding all: " + err);
        
        return;
      }
      
      cache.put('api_key', docs);
      
      res.send(JSON.stringify(docs, null, "    "));
    });
  }
};

// INSERT
exports.addAPIKey = function(req, res) {

  var api_key_string = '';

  /**
   * Delete existing and then recreate. Yes there is a better way to do this.
   */
  
  cache.del('api_key');

  db.api_keys.remove();

  api_key_string = generateRandomString();
  
  db.api_keys.insert({'api_key' : api_key_string}, {safe:true}, function(err, result) {

    if (err) {
     
      res.send("Error inserting "+ err);

    } else {
      
      cache.put('api_key', result);
      
      res.send(result); 
    }
  });
};
