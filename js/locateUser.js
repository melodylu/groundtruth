// what this locateUser.js file does:
// userLoc.geometry.coordinates[0]   longitude
// userLoc.geometry.coordinates[1]   lattitude
// Check to see if you can get a navigator.geolocation object
//      display error if not
//  if so:
//  getCurrentLocation(success, error, parameters)
//      success:
//          log to console
//          return a geojson userLoc object that the whole page can see and use



// more documentation:
// http://geojson.org/geojson-spec.html
// https://developer.mozilla.org/en-US/docs/Web/API/Position
// https://developer.mozilla.org/en-US/docs/Web/API/Coordinates/accuracy
// https://developer.mozilla.org/en-US/docs/Web/API/Coordinates




// _____ global variables ______

// once the user is located, you guys should use this variable to do stuff
// these are default values
var userLoc = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [103.82, 1.312] //Point coordinates are in x, y order (longitude, latitude)
    },
    "properties": {
        "name": "user location",
        "timestamp": 1438889096231, // when this info was aquired, in millisecond UTC
        "accuracy": 21, // in meters
        "originalGeopositionObj": null // the original geoposition object, in case it someday has more you want to use
    }
};
var localQuakes ={};
var dist = 3000;



// _____ geolocating the user ______
function startLocating() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

    } else {
        console.warn('Your browser can\'t do this.');
    }
}


// this function returns a geojson object, prints to console, and starts up the renderMap function
function geoSuccess(position) {

    // set global userLoc var to a geojson object everyone can use
    userLoc = geojsonThis(position);

    var geoResultsText = 'userLoc.geometry.coordinates[0] Longitude: ' + position.coords.latitude.toFixed(2) + ' \nuserLoc.geometry.coordinates[1] Lattitude: ' + position.coords.longitude.toFixed(2) + ' \nAccuracy: more or less ' + position.coords.accuracy + " meters";

    console.log('global var userLoc is now:');
    console.log(geoResultsText);


    renderMap(userLoc.geometry.coordinates[0], userLoc.geometry.coordinates[1]);
    // just added 8/6/2015
    getQuakes(userLoc, dist);

    return geojsonThis(position);
}


function geoError(positionError) {
    console.warn('Error(' + positionError.code + '): ' + positionError.message);
}



var geoOptions = {
    enableHighAccuracy: true,
    timeout: 9000,
    maximumAge: 0
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
            "name": "user location",
            "timestamp": thing.timestamp, // when this info was aquired, in millisecond UTC
            "accuracy": thing.coords.accuracy, // in meters
            "originalGeopositionObj": thing // the original geoposition object, in case it someday has more you want to use
        }
    };
}
