//
//  LocationService.js
//  Scarf API
//
//  Copyright (c) 2014 coffee.beans. All rights reserved.
//
	
var LocationService = function(lat, long) {
    this.errors = [];
	this.latitude = this.setLatitude(lat);
	this.longitude = this.setLongitude(long);
	this.baseUrl = 'api.wunderground.com';
	this.apiKey = 'ab1bd54f3fb269da';
	this.endPoint = 'conditions';
	this.path = this.setPath();
	this.scarf = {
		success: false,
        data: {
            should_wear_scarf : null,
            average_wind_speed : {
               mph: null,
               kph: null
            },
            location : null 
        }
	};
	
};
LocationService.prototype.setLatitude = function(latitude){
	try{
        if(latitude > -90 && latitude < 90){
            return latitude;
        }else {
            throw new Error('invalid latitude');
        }
    } catch(err){
        this.setError('Invalid Latitude');       
    }
};

LocationService.prototype.setLongitude = function(longitude){
    try {
        if(longitude > -180 && longitude < 180){
            return longitude;
        }else {
            throw new Error('invalid longitude');
        }	
    }catch(err) {
        this.setError(err.message);
    }
};

LocationService.prototype.getLongitude = function(){
	return this.longitude;
};

LocationService.prototype.getLatitude = function(){
	return this.latitude;
};

LocationService.prototype.getBaseUrl = function(){
	return this.baseUrl;
};

LocationService.prototype.getApiKey = function(){
	return this.apiKey;
};

LocationService.prototype.getPath = function(){
	return this.path;
};

LocationService.prototype.setPath = function(){
	return '/' + ['api', this.apiKey,this.endPoint, 'q'].join('/') +'/'+[this.latitude, this.longitude].join(',')+'.json';
};

LocationService.prototype.httpRequest = function(cb) {
	var that = this,
	    http = require('http'),
	    options = {
		host: this.baseUrl,
		path: this.path
	    },
	    callback = function(response) {
		var str = '',
		    json = '';
		response.on('data', function(chunk){
			str += chunk;
		});
		response.on('end', function(){
			json = JSON.parse(str);
			cb(json, that);
		});
	    };
	
	http.request(options, callback).end();
};

LocationService.prototype.setError = function(msg){
    this.errors.push(msg);
};
LocationService.prototype.getError = function(){
    return this.errors;
};  
LocationService.prototype.setScarf = function(res, that) {
    var obj = !!that ? that : this;

    if(obj.errors.length > 0){
        obj.scarf.error_message = {};
        for( i = 1; i < obj.errors.length; i++ ){
            obj.scarf.error_message["error"+i] = obj.errors[i];
        }
    }else {
        obj.setShouldWearScarf(res);
        obj.setDisplayLocation(res);
        obj.setAvgWindMph(res);
        obj.setAvgWindKph(res);
        obj.scarf.success = true;
    }
};

LocationService.prototype.getScarf = function(){
	return this.scarf;
};

LocationService.prototype.setShouldWearScarf = function(response){
	var wind_min = response.current_observation.wind_mph,
	    wind_max = response.current_observation.wind_gust_mph;
	this.scarf.data.should_wear_scarf = (wind_min + wind_max)/2 > 15 ? true : false;
};
LocationService.prototype.getShouldWearScarf = function() {
	return this.scarf.data.should_wear_scarf;
};

LocationService.prototype.setDisplayLocation = function(response) {
      this.scarf.data.location = response.current_observation.display_location.full;
};

LocationService.prototype.getDisplayLocation = function(){
	return this.scarf.data.location;
};

LocationService.prototype.setAvgWindMph = function(response){
	var wind_min = response.current_observation.wind_mph,
        wind_max = response.current_observation.wind_gust_mph;	  
	this.scarf.data.average_wind_speed.mph = (wind_min + wind_max)/2;
};

LocationService.prototype.getAvgWindMph = function() {
    return this.scarf.data.average_wind_speed.mph;
};

LocationService.prototype.setAvgWindKph = function(response){
	var wind_min = response.current_observation.wind_kph,
        wind_max = response.current_observation.wind_gust_kph;
    this.scarf.data.average_wind_speed.kph =  (wind_min + wind_max)/2;
};

LocationService.prototype.getAvgWindKph = function(){
    return this.scarf.data.average_wind_speed.kph;
};  

module.exports.LocationService = LocationService;
