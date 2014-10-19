//
//  LocationService.js
//  Scarf API
//
//  Copyright (c) 2014 coffee.beans. All rights reserved.
//
var logger = require('./logger');
logger.debugLevel = 'info';

var LocationService = function(lat, long) {
    logger.log('info', 'Location Service - Instantiating locationService');
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
    
    logger.log('info', 'Location Service - locationService instantiated');
	
};
LocationService.prototype.setLatitude = function(latitude){
    var errorMessage = 'Location Service - Attempt to set invalid latitude',
        successMessage = 'Location Service - Set proper latitude';
	try{
        if(latitude > -90 && latitude < 90){
            logger.log('info', successMessage + ' ' + latitude);
            return latitude;
        }else {
            throw new Error(errorMessage);
        }
    } catch(err){
        logger.log('error', errorMessage);
        this.setError(err.message);
    }
};

LocationService.prototype.setLongitude = function(longitude){
    var errorMessage = 'Location Service - Attempt to set invalid longitude',
        successMessage = 'Location Service - Set proper longitude';
    try {
        if(longitude > -180 && longitude < 180){
            logger.log('info', successMessage + ' ' + longitude);
            return longitude;
        }else {
            throw new Error(errorMessage);
        }	
    }catch(err) {
        logger.log('error', errorMessage);
        this.setError(err.message);
    }
};

LocationService.prototype.getLongitude = function(){
    logger.log('info', 'Location Service - Retrieving longitude ' + this.longitude);
	return this.longitude;
};

LocationService.prototype.getLatitude = function(){
    logger.log('info', 'Location Service - Retrieving latitude ' + this.latitude );
	return this.latitude;
};

LocationService.prototype.getBaseUrl = function(){
    logger.log('info', 'Location Service - Retrieving third party base url');
	return this.baseUrl;
};

LocationService.prototype.getApiKey = function(){
    logger.log('info', 'Location Service - Retrieving third party api key');
	return this.apiKey;
};

LocationService.prototype.getPath = function(){
    logger.log('info', 'Location Service - Retrieving third party api url path');
	return this.path;
};

LocationService.prototype.setPath = function(){
    logger.log('info', 'Location Service - Building third party url path');
	return '/' + ['api', this.apiKey,this.endPoint, 'q'].join('/') +'/'+[this.latitude, this.longitude].join(',')+'.json';
};

LocationService.prototype.httpRequest = function( cb ) {
    logger.log('info', 'Location Service - Making HTTP request to third party');
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
                logger.log('info', 'Location Service - HTTP request complete');
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
    logger.log('info', 'Location Service - Building Scarf Object');
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
    logger.log('info', 'Location Service - Retrieving Scarf Object');  
	return this.scarf;
};

LocationService.prototype.setShouldWearScarf = function(response){
	var wind_min = response.current_observation.wind_mph,
	    wind_max = response.current_observation.wind_gust_mph;
	this.scarf.data.should_wear_scarf = (wind_min + wind_max)/2 > 15 ? true : false;
    logger.log('info', 'Location Service - Setting shouldWearScarf');
};
LocationService.prototype.getShouldWearScarf = function() {
    logger.log('info', 'Location Service - Retrieving shouldWearScarf');
	return this.scarf.data.should_wear_scarf;
};

LocationService.prototype.setDisplayLocation = function(response) {
    this.scarf.data.location = response.current_observation.display_location.full;
    logger.log('info', 'Location Service - Setting displayLocation');
};

LocationService.prototype.getDisplayLocation = function(){
    logger.log('info', 'Location Service - Retrieving displayLocation');
	return this.scarf.data.location;
};

LocationService.prototype.setAvgWindMph = function(response){
	var wind_min = response.current_observation.wind_mph,
        wind_max = response.current_observation.wind_gust_mph;	  
	this.scarf.data.average_wind_speed.mph = (wind_min + wind_max)/2;
    logger.log('info', 'Location Service - Setting avgWindMph');
};

LocationService.prototype.getAvgWindMph = function() {
    logger.log('info', 'Location Service - Retrieving avgWindMph');
    return this.scarf.data.average_wind_speed.mph;
};

LocationService.prototype.setAvgWindKph = function(response){
	var wind_min = response.current_observation.wind_kph,
        wind_max = response.current_observation.wind_gust_kph;
    this.scarf.data.average_wind_speed.kph =  (wind_min + wind_max)/2;
    logger.log('info', 'Location Service - Setting avgWindKph');
};

LocationService.prototype.getAvgWindKph = function(){
    logger.log('info', 'Location Service - Retrieving avgWindKph');
    return this.scarf.data.average_wind_speed.kph;
};  

module.exports.LocationService = LocationService;
