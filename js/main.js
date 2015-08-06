// global variables




// once the document loads...
$(document).ready(function() {


}); // end $(document).ready()


function renderMap(myLon, myLat) {

    map = new GMaps({
        div: '#map',
        lat: myLat,
        lng: myLon
    });


    $('#geocoding_form').submit(function(e) {
        e.preventDefault();
        GMaps.geocode({
            address: $('#address').val().trim(),
            callback: function(results, status) {
                if (status == 'OK') {
                    var latlng = results[0].geometry.location;
                    map.setCenter(latlng.lat(), latlng.lng());
                    map.addMarker({
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    });
                }
            }
        });
    });

    
}

