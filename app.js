//
//  App.js
//  Scarf API
//
//  Copyright (c) 2014 coffee.beans. All rights reserved.
//

var express = require('express');
var serviceModule = require('./locationService');
var app = express();

app.get('/location/?lat,long', function(request, response){
	
    var service = new serviceModule.LocationService(request.query.lat, request.query.long);
    service.httpRequest(service.setScarf);
	//httpRequest(request.query.lat, request.query.long);
	response.type('text/json');
	response.send(service.getScarf());
});

app.listen(process.env.PORT || 4730);
