// var https = require('https')
//     , React = require('react/addons')
//     , ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
//     , RouteSegments = require('./route-segments')
//     , routeSegments = new RouteSegments
//     , map = require('./application.jsx').map
//     , poly = require('./application.jsx').poly
//     , rideInterval = require('./application.jsx').rideInterval

// function RouteControl() {
//   var self = this
//   this.getTrip = function() {
//     routeSegments.offset += 1
//     https.get('https://odyssey-api.herokuapp.com/trip_for/' + routeSegments.bikeId + '/after/' + routeSegments.offset, function(response) {
//       response.on('data', function(data) {
//         data = JSON.parse(data)
//         if (data.status === 200) {
//           routeSegments.advanceRoute(data)
//         } else if (data.status === 510) {
//           self.stopTraverse()
//           React.render(<ErrorContainer data={[{message: "Bike not found, try another!", loadAnim: false}]} />, document.getElementById('error-container'))
//         } else if (data.status === 404) {
//           self.stopTraverse()
//           React.render(<ErrorContainer data={[{message: "That's every trip in the database!", loadAnim: false}]} />, document.getElementById('error-container'))
//         }
//       })
//     }).on('error', function(error) {
//       console.error(error)
//     })
//   },
//   this.stopTraverse = function() {
//     clearInterval(rideInterval)
//     intervalId = 0
//     directionsDisplay.set('directions', null)
//     map.panTo(options.Chicago)
//     streetView.setPosition(options.Chicago)
//     React.render(<span />, document.getElementById('routes-display-container'))
//     React.render(<span />, document.getElementById('error-container'))
//   },
//   this.drawPoly = function(result) {
//     var routesArray = result.routes[0].overview_path
//     poly.setMap(map)
//     poly.setPath(routesArray)
//   },
//   this.loading = function() {
//     React.render(<ErrorContainer data={[{message: "Loading trips for bike #" + routeSegments.bikeId, loadAnim: true}]} />, document.getElementById('error-container'))
//   },
//   this.fixate = function(location) {
//     map.panTo(location)
//     streetView.setPosition(location)
//     var heading = google.maps.geometry.spherical.computeHeading(streetView.location.latLng, location),
//         pov = streetView.getPov()
//     pov.heading = heading
//     streetView.setPov(pov)
//   },
//   this.animate = function() {
//     rideInterval = window.setInterval(function() { 
//       var location = poly.getPath().getAt(counter)
//       if (counter >= poly.getPath().length - 1) {
//         window.clearInterval(rideInterval)
//         self.getTrip()
//       } else {
//         interpolatePath = google.maps.geometry.spherical.interpolate(poly.getPath().getAt(counter),poly.getPath().getAt(counter + 1),counter/250)
//         self.fixate(interpolatePath)
//         self.fixate(location)
//         counter++
//       }
//     }, routeSegments.speedInterval)
//   },
//   this.initiate = function() {
//     React.render(<span />, document.getElementById('routes-display-container'))
//     routeSegments.offset = 0
//     this.getTrip()
//     map.setZoom(15)
//     this.loading()
//   }
// }

// module.exports = RouteControl