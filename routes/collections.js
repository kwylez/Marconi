var mongojs   = require('mongojs');
var conString = process.env.MONGOLAB_URI || "logger_db";
var db        = mongojs(conString, ['logs','api_keys']);

exports.db = function() {
	return db;
}