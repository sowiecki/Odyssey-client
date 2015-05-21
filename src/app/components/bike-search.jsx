var React = require('react/addons')
    , https = require('https')
    , ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

function BikeResult() {
  this.id = null;
  this.display = function() {
    document.getElementById('bike-id-input').value = this.id;
  }
}
bikeResult = new BikeResult();

var Bike = React.createClass({
	getInitialState: function() {
    return {
      mounted: false
      , clicked: false
    }
  }
  , componentDidMount: function() {
    this.setState({
      mounted: true
    })
  }
  , handleClick: function() {
  	this.setState({clicked: !this.state.clicked})
  }
  , handleSearch: function() {
    var bikeId = null
    tripId = document.getElementById('trip-id-input').value
    https.get('https://odyssey-api.herokuapp.com/bike_for/' + tripId, function(response) {
      response.on('data', function(data) {
        response = JSON.parse(data)
        bikeResult.id = response
        bikeResult.display()
      })
    }).on('error', function(error) {
      console.error(error)
    })
    this.setState({clicked: !this.state.clicked, searched: !this.state.searched})
  }
  , handleResult: function(result) {
    console.log(result)
  }
  , render: function() {
    var bikeSearch =
      <div key="bike-popup" id="bike-popup">
        <p id="close"><a href="#" onClick={this.handleClick}>X</a></p>
        <input id="trip-id-input" className="nav-control text-field" type="text" autofocus="true" autoComplete="off" placeholder="Trip ID" />
        <input id="trip-id-submit" className="nav-control button-gray"  onClick={this.handleSearch} type="submit" value="Search" />
      </div>

    if (this.state.clicked) {
  		text = [bikeSearch]
    } else {
      text = []
    }
    		
    var key = 0
    text.map(function (text) {
      return (
        <BikeContainer key={key++} data={text} />
      )
    })
    return (
      <nav>
      	<a key="bike-link" href="#" onClick={this.handleClick}>Find bike</a>
        <ReactCSSTransitionGroup transitionName="bike">
          {text}
        </ReactCSSTransitionGroup>
      </nav>
    )
  }
})
var BikeContainer = React.createClass({
  getInitialState: function() {
    return {
      mounted: false
    }
  }
  , render: function() {
    return (
      <div>{this.props.data}</div>
    )
  }
})

module.exports = Bike