 $(document).ready(function(){
   map = new GMaps({
     div: '#map',
     lat: -12.043333,
     lng: -77.028333
   });
   $('#geocoding_form').submit(function(e){
     e.preventDefault();
     GMaps.geocode({
       address: $('#address').val().trim(),
       callback: function(results, status){
         if(status=='OK'){
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
 });