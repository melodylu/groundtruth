# GroundTruth
an app letting you know if there are earthquakes or dangerous weather near you, and what you can do about it

##User flow:
* user lands on page. Are their earthquakes or dangerous weather nearby? (200miles)
* user can now enter a new location, if they want to see what dangerous weather is nearby.
* if there's nothing dangerous nearby, display a carasoul of dangerous weather survival tips



##Based on user’s lat/long:
* what earthquakes are closest?
 * http://earthquake.usgs.gov/fdsnws/event/1/
 * http://earthquake.usgs.gov/earthquakes/dyfi/

* any dangerous weather bulletins?
 * http://forecast.io/
 * http://graphical.weather.gov/xml/
 * http://www.wunderground.com/?MR=1

##Users can contribute crowd-source data on shelters / supplies nearby
* https://parse.com/products/core


Break up project into parts?
* design
* functions that do the queries to apies

Project Components
* Page design
* Front-end jQuery event handling
* Getting bootstrap to work
* Polling API for weather information
* Polling API for user location
* Push notifications?
*

**What the design should accomplish:**
* Where they are
* Display useful stuff nearby
* Peripheral weather / earthquake data
* Static but situationally dependent box that loads other stuff if there's no information to field; educational content for disaster preparedness tips on a randomized

**Monday's Plan**
* Mel - get user's location and earthquake data
* Ethan - get us a pretty map + weather data :)
* Rachel - work on SPA design and bootstrap
