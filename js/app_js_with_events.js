"use strict";

$(document).ready(function() {

    startLocating();
    renderMap(0, 0);
    quake.init();


});



var quake = {
    quake: ['Will', 'Steve'],
    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.render();
    },
    cacheDom: function() {
        this.$el = $('#quakeModule');
        this.$button = this.$el.find('button');
        this.$input = this.$el.find('input');
        this.$ul = this.$el.find('ul');
    },
    bindEvents: function() {
        this.$button.on('click', this.addQuake.bind(this));
        this.$ul.delegate('i.del', 'click', this.deleteQuake.bind(this));
    },
    render: function() {
        var data = {
            quake: this.quake,
        };
        this.$ul.empty();
        this.quake.forEach(function(e, i, arr) {
            // TODO: call isn't working to use this.$ul, and don't know why
            $('ul').append('<li><span>' + e + '</span></li><i class="del">X</i></div>');

        });

    },
    addQuake: function() {
        this.quake.push(this.$input.val());
        this.render();
        this.$input.val('');
    },
    deleteQuake: function(event) {
        var $remove = $(event.target).closest('li');
        var i = this.$ul.find('li').index($remove);

        this.quake.splice(i, 1);
        this.render();
    }

};



function distanceFrom(arr1, arr2, unit) {
        if (!unit) {
            unit = 'miles';
        }
        if (!arr2) {
            arr2 = userLoc.geometry.coordinates;
        }
        // complicated mess: http://www.movable-type.co.uk/scripts/latlong.html
        // This uses the ‘haversine’ formula to calculate the great-circle distance 
        // between two points – that is, the shortest distance over the earth’s surface
        /** Converts numeric degrees to radians */
        if (typeof(Number.prototype.toRadians) === "undefined") {
            Number.prototype.toRadians = function() {
                return this * Math.PI / 180;
            }
        }
        var lat1 = arr1[1];
        var lat2 = arr2[1];
        var lon1 = arr1[0];
        var lon2 = arr2[0];


        var R = 3959; //6371000 metres
        var φ1 = lat1.toRadians();
        var φ2 = lat2.toRadians();
        var Δφ = (lat2 - lat1).toRadians();
        var Δλ = (lon2 - lon1).toRadians();

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var d = R * c;

        // if (unit === 'miles'){
        //     return {}
        // }


        // mel simple mess
        // Math.sqrt(Math.pow((arr1[0] - arr2[0]), 2) + Math.pow((arr1[1] - arr2[1]), 2))

        // this is in miles. TODO: make KM option.
        return d;

    }



    function addMarker(coordinates, eventProp, type) {
        // add markers to map 


        if (type === 'quake') {
            //var size = Number(properties.mag)+ .05;
            map.addMarker({
                lat: coordinates[1],
                lng: coordinates[0],
                infoWindow: {
                    content: 'magnitude: ' + eventProp.mag.toString()
                },
                icon: {
                    //path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: 'rgb(' + (100 * eventProp.mag).toString() + ',0,0)',
                    fillOpacity: .2 * eventProp.mag,
                    scale: eventProp.mag * 10,
                    strokeColor: 'rgba(255,100,100,1)',
                    strokeWeight: .5
                }
            });
        } else {
            map.addMarker({
                lat: coordinates[1],
                lng: coordinates[0],
                infoWindow: {
                    content: 'Your Location'
                },
            });
        }
    }

    function addThing(quake) {
        var earthquakeString = "<p>Title: " + quake.properties.title + "</p>";

        $("#container").append(earthquakeString);
    }

    function getLocalQuakes(largeQuakeSet, dist) {
        // for each quake in largeQuakeSet, filter by dist < 200
        var localQuakes = _.filter(largeQuakeSet, closerThan);

        function closerThan(quake) {
            return distanceFrom(quake.geometry.coordinates) < dist;
        }


        renderMap(userLoc.geometry.coordinates[0], userLoc.geometry.coordinates[1]);
        addMarker(userLoc.geometry.coordinates);

        _.each(localQuakes, function(e, i, arr) {
            addMarker(e.geometry.coordinates, e.properties, 'quake');
        });

        _.each(localQuakes, function(e, i, arr) {
            addThing(e);
        });

        // return a feature set of localQuakes
        return localQuakes;
    }


    var getQuakes = function(userLoc, dist) {
        $.ajax({
            url: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
            //"http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
            // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson
            success: function(fetchedQuakes) {
                //console.log(fetchedQuakes);
                todayQuake = fetchedQuakes.features;
                console.log('todayQuake is...');
                console.log(todayQuake);
                localQuakes = getLocalQuakes(todayQuake, dist);
            }
        });
    };
    // when we locateUs.js, we run this:     
    // var localQuakes = getLocalQuakes(todayQuake.features, 3000);
