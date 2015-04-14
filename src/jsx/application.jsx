// Initialize dependencies
var React = require('react/addons'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// Load modules
var request = require('./request'),
    response;

// Needs to be async
function requestTrip(bike, offset) {
  response = request(2006, 0);

  setTimeout(function() {
    console.log("From app: " + response)
    return response;
  }, 600)
}

console.log(requestTrip(2006, 0))