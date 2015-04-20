var React = require('react/addons')
    , ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

var ErrorContainer = React.createClass({
  render: function() {
    var key = 0
    var errors = this.props.data.map(function (error) {
      return (
        <ErrorMessage key={key++} data={error} loadAnim={error.loadAnim} />
      )
    })
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="error">
          {errors}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})
var ErrorMessage = React.createClass({
  getInitialState: function() {
    return {dashFlash: " "}
  },
  flash: function() {
    if (this.state.dashFlash.length > 10) {
      this.setState({dashFlash: ""})
    } else {
      this.setState({dashFlash: this.state.dashFlash + "-"})
    }
  },
  componentDidMount: function() {
    if (this.props.data.loadAnim) {
      this.interval = setInterval(this.flash, 100)
    } else {
      this.interval = null
    }
  },
  componentWillUnmount: function() {
    clearInterval(this.interval)
  },
  render: function() {
    var flash = this.props.data.loadAnim ? this.state.dashFlash : null
    return (
      <div id="error-container">{flash} {this.props.data.message} {flash}</div>
    )
  }
})

module.exports = ErrorContainer