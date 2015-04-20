// var React = require('react/addons')
//     , ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
//     , RouteControl = require('../route-controller.jsx')
//     , RouteSegments = require('../route-segments')
//     , routeControl = new RouteControl
//     , routeSegments = new RouteSegments
//     , map = require('../application.jsx').map

// var MapControlContainer = React.createClass({
//   getInitialState: function() {
//     return {
//       mounted: false,
//       traversing: false,
//       paused: false,
//       speedier: false
//     }
//   },
//   componentDidMount: function() {
//     this.setState({
//       mounted: true
//     })
//   },
//   startTraverse: function() {
//     routeSegments.bikeId = document.getElementById('bike-id-input').value
//     if (routeSegments.bikeId) {
//       this.setState({traversing: !this.state.traversing})
//       routeControl.initiate()
//     } else {
//       React.render(<ErrorContainer data={[{message: "Please enter a bike id", loadAnim: false}]} />, document.getElementById('error-container'))
//     }
//   },
//   startRandomTraverse: function() {
//     this.setState({traversing: !this.state.traversing})
//     routeSegments.bikeId = Math.floor(Math.random() * (3000-1) + 1)
//     routeControl.initiate()
//   },
//   stopTraverse: function() {
//     routeSegments = new RouteSegments
//     counter = 0
//     poly.setMap(null)
//     clearInterval(rideInterval)
//     this.setState({traversing: !this.state.traversing})
//     this.setState({paused: false, speedier: false})
//     routeControl.stopTraverse()
//     map.setZoom(12)
//   },
//   handleInterval: function() {
//     this.setState({paused: !this.state.paused})
//     if (!this.state.paused) {
//       clearInterval(rideInterval)
//       React.render(<span />, document.getElementById('error-container'))
//     } else {
//       routeControl.animate()
//     }
//   },
//   changeSpeed: function() {
//     if (!this.state.paused) {
//       this.setState({speedier: !this.state.speedier})

//       clearInterval(rideInterval)
//       if (this.state.speedier) {
//         routeSegments.speedInterval = 1400
//       } else {
//         routeSegments.speedInterval = 600
//       }
//       routeControl.animate()
//     }
//   },
//   render: function() {
//     var initiateButtons =
//         <div key="initial-buttons" id="initial-buttons">
//           <p className="click-through">{"Follow a bike"}</p>
//           <input id="bike-id-input" className="map-control text-field" type="text" autofocus="true" autoComplete="off" placeholder="Enter ID" />
//           <input id="start-traverse" className="map-control button-green" onClick={this.startTraverse} type="submit" target="remote" value="Begin" />
//           <p className="click-through">or</p>
//           <input id="start-traverse" className="map-control button-green" onClick={this.startRandomTraverse} type="submit" target="remote" value="Random" />
//         </div>,
//       continueButton =
//         <input key="continue-traverse" id="continue-traverse" className="map-control button-green" onClick={this.handleInterval} type="submit" target="remote" value="Continue" />,
//       pauseButton =
//         <input key="pause-traverse" id="pause-traverse" className="map-control button-blue" onClick={this.handleInterval} type="submit" target="remote" value="Pause" />,
//       stopButton =
//         <input key="stop-traverse" id="stop-traverse" className="map-control button-red" onClick={this.stopTraverse} type="submit" target="remote" value="Stop" />,
//       currentBike =
//         <div key="current-bike" id="info-left">Following bike #{routeSegments.bikeId} through 2014</div>,
//       speedUp =
//         <input key="speed-up" id="speed-up" className="map-control button-green" onClick={this.changeSpeed} type="submit" target="remote" value="Fast" />,
//       speedDown =
//         <input key="speed-down" id="speed-down" className="map-control button-blue" onClick={this.changeSpeed} type="submit" target="remote" value="Slow" />

//     var buttonArray
//     var key = 0

//     if (!this.state.traversing) {
//       buttonArray = [initiateButtons]
//     } else if (this.state.paused) {
//       buttonArray = [currentBike, stopButton, continueButton]
//     } else {
//       buttonArray = [currentBike, stopButton, pauseButton]
//     }

//     if (this.state.speedier && this.state.traversing) {
//       buttonArray.push(speedDown)
//     } else if (this.state.traversing) {
//       buttonArray.push(speedUp)
//     }

//     buttonArray.map(function (button) {
//       return (
//           <MapControl key={key++} data={button} />
//         )
//     }.bind(this))

//     return (
//       <div>
//         <ReactCSSTransitionGroup transitionName="buttons">
//           <MapControl key={key++} data={buttonArray} />
//         </ReactCSSTransitionGroup>
//       </div>
//     )
//   }
// })
// var MapControl = React.createClass({
//   getInitialState: function() {
//     return {
//       mounted: false
//     }
//   },
//   render: function() {
//     return (
//       <div id="hold-buttons">{this.props.data}</div>
//     )
//   }
// })

// module.exports = MapControlContainer