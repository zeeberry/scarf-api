//
//  LocationServiceSpec.js
//  Scarf
//
//  Spec for a location service that returns required data
//  from selected weather api
//
//  Copyright (c) 2014 coffee.beans. All rights reserved.
//

var module  = require('../locationService'),
    weatherFixture = require('./fixtures/wu-ny-location-data');
    //scarfFixture = require('./fixtures/scarf-format');

describe('A locationService', function(){

	it('should have a valid latitude', function(){
		var service = new module.LocationService(40.685517, -73.947554),
		    latitude = service.getLatitude();
		expect(latitude).toBe(40.685517);
	});

	it('should have a valid longitude', function(){
		var service = new module.LocationService(40.685517, -73.947554),
		    longitude = service.getLongitude();
		expect(longitude).toBe(-73.947554);
	});

	it('should set an error if invalid latitude', function(){
		var service = new module.LocationService(94.685517, -73.947554),
            error = service.getError().length;
		expect(error).toBeGreaterThan(0);
	});

	it('should set an error if invalid longitude', function(){
		var service = new module.LocationService(40.685517, -183.94755),
            error = service.getError().length;
		expect(error).toBeGreaterThan(0);
	});

	it('should have a base url', function(){
		var service = new module.LocationService(40.685517, -73.947554),
		    baseUrl = service.getBaseUrl();
		expect(baseUrl).toBeDefined();
	});
	
	it('should have an api key', function(){
		var service = new module.LocationService(40.685517, -73.947554),
		    apiKey = service.getApiKey();
		expect(apiKey).toBeDefined();
	});
	
	it('should have a path url', function(){
		var service = new module.LocationService(40.685517, -73.947554),
		    pathUrl = service.getPath();
		expect(pathUrl).toBeDefined();
	});
	
	it('should have a valid path url', function(){
		var service = new module.LocationService(40.685517, -73.947554),
		    pathUrl = service.getPath();
		expect(pathUrl).toBe('/api/ab1bd54f3fb269da/conditions/q/40.685517,-73.947554.json');
	});
	
	it('should have a scraf obj defined', function(){
		var service = new module.LocationService(40.685517, -73.947554),
		    scarf = service.getScarf();
		expect(scarf).toBeDefined();
	});

	describe('makes a request to the api', function(){

		describe('and receives a valid response', function(){

			it('should properly set should wear scarf', function(){
				var service = new module.LocationService(40.685517, -73.947554),
				    shouldWearScarf;
				service.setShouldWearScarf(weatherFixture.weatherFixture);
                shouldWearScarf = service.getShouldWearScarf();
				expect(shouldWearScarf).toBe(false);
			});

			it('should properly set display location', function(){
				var service = new module.LocationService(40.685517, -73.947554),
                    displayLocation;
                service.setDisplayLocation(weatherFixture.weatherFixture);
                displayLocation = service.getDisplayLocation(weatherFixture.weatherFixture);
				expect(displayLocation).toBe('Brooklyn, NY');
			});
			
			it('should properly set average speed in mph', function(){
				var service = new module.LocationService(40.685517, -73.947554),
				    avgWindSpeedMph;
                service.setAvgWindMph(weatherFixture.weatherFixture);
                avgWindSpeedMph = service.getAvgWindMph();
				expect(avgWindSpeedMph).toBe(3.0);
			});
		
			it('should properly set average speed in kph', function(){
				var service = new module.LocationService(40.685517, -73.947554),
                    avgWindSpeedKph;
                service.setAvgWindKph(weatherFixture.weatherFixture);
                avgWindSpeedKph = service.getAvgWindKph();
                expect(avgWindSpeedKph).toBe(4.8);
			});
            
            it('should properly set the scarf obj with data', function(){
                var service = new module.LocationService(40.685517, -73.947554),
                    mockScarf = {
                        success: true,
                        data: {
                            should_wear_scarf : false ,
                            average_wind_speed : {
                               mph: 3.0,
                               kph: 4.8
                            },
                            location : "Brooklyn, NY"
                        }
                    },
                    scarf;
                service.setScarf(weatherFixture.weatherFixture);
                scarf = service.getScarf();
                scarf = JSON.stringify(scarf);
                mockScarf = JSON.stringify(mockScarf);
                expect(scarf).toBe(mockScarf);
            });
		});
		describe('and receives an invalid response', function(){

			it('should return an error message', function(){

			});
		});

	});
});
