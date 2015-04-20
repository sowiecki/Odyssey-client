var React = require('react/addons')
    , ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
    , RouteControl = require('../application.jsx').controller

var RoutesInfoContainer = React.createClass({
  render: function() {
    var routeNodes = this.props.tripsInfo.map(function (data) {
      return (
          <RouteInfoBox key={data.tripId} data={data} />
        )
    }.bind(this))

    // Hacky fix for the routes display container occasionally bugging out with extra tables.
    if (routeNodes.length > 10) {
      React.render(<span />, document.getElementById('routes-display-container'))
    }

    return (
      <div>
        <ReactCSSTransitionGroup transitionName="routeInfoBox" component="div">
          {routeNodes}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})

var RouteInfoBox = React.createClass({
  onClick: function() {
    var location = new google.maps.LatLng(this.props.data.latitude, this.props.data.longitude)
    map.panTo(location)
    RouteControl.fixate(location)
  },
  render: function() {
    return (
      <div key={this.props.data.tripId} className="trip-box">
        <a href="#" onClick={this.onClick}>
          <p><b>Origin:</b> {this.props.data.startLocation}</p>
          <span className="extended-info">
            <p className="indent">at {this.props.data.startTime}</p>
            <p><b>Destination:</b> {this.props.data.stopLocation}</p>
            <p className="indent">at {this.props.data.stopTime}</p>
            <p><b>Duration:</b> {this.props.data.duration}</p>
            <p className="trip-id">Trip ID: {this.props.data.tripId}</p> 
          </span>        
        </a>
      </div>
    )
  }
})

module.exports = RoutesInfoContainer