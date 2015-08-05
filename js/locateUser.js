// once this script runs (and returns; remember there maybe a 2-4 second delay)
// you will have access to: 
// userLoc.geometry.coordinates[0]   <-- longitude, or y cord
// userLoc.geometry.coordinates[1]   <-- lattitude, r x cord
// what this locateUser.js file does:

// Check to see if you can get a navigator.geolocation object
// 		display error if not
// 	if so:
// 	getCurrentLocation(success, error, parameters)
// 		success:
// 			log to console
//			return a geojson userLoc object that the whole page can see and use


// optional, I tried to implement it and did not see much improvement. Commented out.
// 			set a watchPosition(Wsuccess, Werror, Wparameters)
// 				success: 
//					update the global geojson object
//					is the coordinates accuracy the same as current?
//			 			if yes, end the watchPosition timer, we've got the best location possible.
// 


// more documentation:
// http://geojson.org/geojson-spec.html
// https://developer.mozilla.org/en-US/docs/Web/API/Position
// https://developer.mozilla.org/en-US/docs/Web/API/Coordinates/accuracy
// https://developer.mozilla.org/en-US/docs/Web/API/Coordinates




// _____ global variables ______
var userLoc = {};  // <-- once the user is located, you guys should use this variable to do stuff
var refineLoc;	// this will be used to run a second location check to get better accuracy

$(document).ready(function() {
    startLocating();
}); 




// _____ geolocating the user ______
function startLocating() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

    } else {
        console.warn('Your browser can\'t do this.');
    }
}


// this function returns a geojson object and prints to console
function geoSuccess(position) {
    // set global userLoc var to a geojson object everyone can use
    userLoc = geojsonThis(position);

    var geoResultsText = '' + ' \nLatitude: ' + position.coords.latitude.toFixed(2) + ' \nLongitude: ' + position.coords.longitude.toFixed(2) + ' \nAccuracy: more or less ' + position.coords.accuracy + " meters";

    console.log(geoResultsText);
    console.log('global var userLoc is now:  (a geojson object)');
    console.log(userLoc);

    // TODO: the line below with refineLoc doesn't seem to improve accuracy, and leads to timeout problems. 
    // Let's just make them wait and do the call once.
    // refineLoc = navigator.geolocation.watchPosition(refineLocSuccess, refineLocError, refineLocOptions);

    return geojsonThis(position);
}


function geoError(positionError) {
    console.warn('Error(' + positionError.code + '): ' + positionError.message);
}



var geoOptions = {
    enableHighAccuracy: true, // If true and if the device is able to provide a more accurate position, it will do so. Note that this can result in slower response times or increased power consumption (with a GPS chip on a mobile device for example). On the other hand, if false, the device can take the liberty to save resources by responding more quickly and/or using less power. Default: false.
    timeout: 9000, // Is a positive long value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. The default value is Infinity, meaning that getCurrentPosition() won't return until the position is available.
    maximumAge: 0 // If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. 

    //https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
};


// function refineLocSuccess(betterPostion){
// 	userLoc = geojsonThis(betterPosition);
//     console.log('global var userLoc is now:  (a geojson object)');
//     console.log(userLoc);
// }
// function refineLocError(positionError) {
//     console.warn('Error(' + positionError.code + '): ' + positionError.message);
// }
// var refineLocOptions = {
//     enableHighAccuracy: true,
//     timeout: 15000, 
//     maximumAge: 0 
// };



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
            "name": "user location",
            "timestamp": thing.timestamp, // when this info was aquired, in millisecond UTC
            "accuracy": thing.coords.accuracy, // in meters
            "originalGeopositionObj": thing // the original geoposition object, in case it someday has more you want to use
        }
    };
}

