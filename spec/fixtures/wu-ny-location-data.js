var json  = {
	"response": {
		"version": 0.1,
		"termsofService": "http://www.wunderground.com/weather/api/d/terms.html",
		"features": {
			"conditions": 1
		}
	},
	"current_observation": {
		"image": {
			"url": "http://icons-ak.wxug.com/graphics/wu2/logo_130x80.png",
			"title": "Weather Underground",
			"link": "http://www.wunderground.com"
		},
		"display_location": {
			"full": "Brooklyn, NY",
			"city": "Brooklyn",
			"state": "NY",
			"state_name": "New York",
			"country": "US",
			"country_iso3166": "US",
			"zip": "11216",
			"magic": 1,
			"wmo": 99999,
			"latitude": 40.680000,
			"longitude": -73.940000,
			"elevation": 19.00000000
		},
		"observation_location": {
			"full": "Bedford-Stuyvesant, Brooklyn, New York",
			"city": "Bedford-Stuyvesant, Brooklyn",
			"state": "New York",
			"country": "US",
			"country_iso3166": "US",
			"latitude": 40.683052,
			"longitude": -73.934715,
			"elevation":"69 ft"
		},
		"estimated": { },
		"station_id": "KNYBROOK50",
		"observation_time": "Last Updated on January 12, 9:45 PM EST",
		"observation_time_rfc822": "Sun, 12 Jan 2014 21:45:34 -0500",
		"observation_epoch": "1389581134",
		"local_time_rfc822": "Sun, 12 Jan 2014 21:48:53 -0500",
		"local_epoch": "1389581333",
		"local_tz_short": "EST",
		"local_tz_long": "America/New_York",
		"local_tz_offset": "-0500",
		"weather": "Clear",
		"temperature_string": "39.4 F (4.1 C)",
		"temp_f": 39.4,
		"temp_c": 4.1,
		"relative_humidity": "67%",
		"wind_string": "From the NW at 1.0 MPH Gusting to 5.0 MPH",
		"wind_dir": "NW",
		"wind_degrees": 305,
		"wind_mph": 1,
		"wind_gust_mph": 5.0,
		"wind_kph": 1.6,
		"wind_gust_kph": 8.0,
		"pressure_mb": 1017,
		"pressure_in": 30.03,
		"pressure_trend": "+",
		"dewpoint_string": "29 F (-2 C)",
		"dewpoint_f": 29,
		"dewpoint_c": -2,
		"heat_index_string": "NA",
		"heat_index_f": "NA",
		"heat_index_c": "NA",
		"windchill_string": "39 F (4 C)",
		"windchill_f": 39,
		"windchill_c": 4,
		"feelslike_string": "39 F (4 C)",
		"feelslike_f": 39,
		"feelslike_c": 4,
		"visibility_mi": 10.0,
		"visibility_km": 16.1,
		"solarradiation": "--",
		"UV": 0,
		"precip_1hr_string": "0.00 in ( 0 mm)",
		"precip_1hr_in": 0.00,
		"precip_1hr_metric": 0,
		"precip_today_string": "0.01 in (0 mm)",
		"precip_today_in": 0.01,
		"precip_today_metric": 0,
		"icon": "clear",
		"icon_url": "http://icons-ak.wxug.com/i/c/k/nt_clear.gif",
		"forecast_url": "http://www.wunderground.com/US/NY/Brooklyn.html",
		"history_url": "http://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=KNYBROOK50",
		"ob_url": "http://www.wunderground.com/cgi-bin/findweather/getForecast?query=40.683052,-73.934715"
	}
};
	
module.exports.weatherFixture = json;
	

