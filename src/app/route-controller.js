function RouteControl() {
    this.getTrip = function() {
      routeSegments.offset += 1
      $.ajax({
        url: "trip_for/" + routeSegments.bikeId + "/after/" + routeSegments.offset,
        method: "get",
        dataType: "json",
        success: function(data) {
          if (data.length) {
            routeSegments.advanceRoute(data[0]);
          } else {
            RouteControl.stopTraverse();
            React.render(<ErrorContainer data={[{message: "Bike not found, try another!", loadAnim: false}]} />, document.getElementById('error-container'));
          }
        }
      })
    },
    this.stopTraverse = function() {
      clearInterval(rideInterval);
      intervalId = 0;
      directionsDisplay.set('directions', null);
      map.panTo(Chicago);
      streetView.setPosition(Chicago);
      React.render(<span />, document.getElementById('routes-display-container'))
      React.render(<span />, document.getElementById('error-container'));
    },
    this.drawPoly = function(result) {
      var routesArray = result.routes[0].overview_path;
      poly.setMap(map);
      poly.setPath(routesArray);
    },
    this.loading = function() {
      React.render(<ErrorContainer data={[{message: "Loading trips for bike #" + routeSegments.bikeId, loadAnim: true}]} />, document.getElementById('error-container'));
    },
    this.fixate = function(location) {
      map.panTo(location);
      streetView.setPosition(location);
      var heading = google.maps.geometry.spherical.computeHeading(streetView.location.latLng, location),
          pov = streetView.getPov();
      pov.heading = heading;
      streetView.setPov(pov);
    },
    this.animate = function() {
      rideInterval = window.setInterval(function() { 
        var location = poly.getPath().getAt(counter);
        if (counter >= poly.getPath().length - 1) {
          window.clearInterval(rideInterval);
          RouteControl.getTrip();
        } else {
          interpolatePath = google.maps.geometry.spherical.interpolate(poly.getPath().getAt(counter),poly.getPath().getAt(counter + 1),counter/250);
          RouteControl.fixate(interpolatePath);
          RouteControl.fixate(location);
          counter++;
        }
      }, routeSegments.speedInterval);
    },
    this.initiate = function() {
      React.render(<span />, document.getElementById('routes-display-container'));
      routeSegments.offset = 0;
      RouteControl.getTrip();
      map.setZoom(15);
      this.loading();
    };
  }