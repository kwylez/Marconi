// SPD

var express = require('express');
var app = express();
var port = process.env.PORT;
var itemFetcher = require('./routes/items');

// Config

app.configure(function () {
    app.use(express.logger());
    app.use(express.bodyParser());
});


// Routes

app.get('/items', itemFetcher.findAll);
app.get('/items/:id', itemFetcher.findById);
app.get('/items/log/:sfid', itemFetcher.findLogForSFID);
app.delete('/items/:id',itemFetcher.deleteById);
app.post('/items',itemFetcher.addItem);
app.put('/items/:id',itemFetcher.updateItem);


app.listen(port, function() {
	console.log("listing on port: " + port);
});

