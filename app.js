//
//  App.js
//  Scarf API
//
//  Copyright (c) 2014 coffee.beans. All rights reserved.
//

var express = require('express'),
    serviceModule = require('./locationService'),
    logger = require('./logger'),
    app = express();

logger.debugLevel = 'info';

app.get('/location/', function(request, response){
	logger.log('info', 'Scarf API - request to location service initiated');
    var service = new serviceModule.LocationService(request.param('lat'), request.param('long'));
    service.httpRequest(service.setScarf);
	response.type('text/json');
	response.send(service.getScarf());
});

app.get('/', function(request, response){
    response.type('text/json');
    response.send('Hello, this is scarf.js')
});

app.listen(process.env.PORT || 4730);
