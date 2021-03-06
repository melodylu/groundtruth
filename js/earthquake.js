// Check to see if you can get a navigator.geolocation object
// 		display error if not
// 	if so:
// 	getCurrentLocation(success, error, parameters)
// 		success:
// 			update html #geolocation div
//			return a geojson object with all this info			
// 			set a watchPosition(Wsuccess, Werror, Wparameters)
// 				success: 
//					update the global geojson object
//					is the coordinates accuracy the same as current?
//			 			if yes, end the watchPosition timer.



// _____ global variables ______
var userLoc = {};  // <-- once the user is located, you guys should use this variable to do stuff


// once the document loads...
$(document).ready(function() {

    // buildMain();
    startLocating();

}); // end $(document).ready()




// _____ geolocating the user ______


function startLocating() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

    } else {
        console.warn('Your browser can\'t do this.');
    }
}


// currently this function returns a geojson object AND updates the #georesults div
function geoSuccess(position) {
    // set global userLoc var to a geojson object everyone can use
    userLoc = geojsonThis(position);

    var geoResultsText = '' + ' \nLatitude: ' + position.coords.latitude.toFixed(2) + ' \nLongitude: ' + position.coords.longitude.toFixed(2) + ' \nAccuracy: more or less ' + position.coords.accuracy + " meters";

    // $('#geoResults').text(geoResultsText);

    console.log(geoResultsText);
    console.log('global var userLoc is now:  (a geojson object)');
    console.log(userLoc);

    return geojsonThis(position);
}


function geoError(positionError) {
    // $('#geoResults').text('Error(' + positionError.code + '): ' + positionError.message);
    console.warn('Error(' + positionError.code + '): ' + positionError.message);
}



var geoOptions = {
    enableHighAccuracy: false, // If true and if the device is able to provide a more accurate position, it will do so. Note that this can result in slower response times or increased power consumption (with a GPS chip on a mobile device for example). On the other hand, if false, the device can take the liberty to save resources by responding more quickly and/or using less power. Default: false.
    timeout: 9000, // Is a positive long value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. The default value is Infinity, meaning that getCurrentPosition() won't return until the position is available.
    maximumAge: 0 // If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. 

    //https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
};





// _____ helper functions ______
// takes a position thing and returns it as a geojson object, used twice for getCurrentLocation() and watchPosition()
function geojsonThis(thing) {
    var lat = Number(thing.coords.latitude);
    var lon = Number(thing.coords.longitude);
    return {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [lon, lat] //Point coordinates are in x, y order (longitude, latitude)
        },
        "properties": {
            "name": "user location"
        }
    };
}


// more documentation:
// http://geojson.org/geojson-spec.html
// https://developer.mozilla.org/en-US/docs/Web/API/Position
// https://developer.mozilla.org/en-US/docs/Web/API/Coordinates/accuracy
// https://developer.mozilla.org/en-US/docs/Web/API/Coordinates
