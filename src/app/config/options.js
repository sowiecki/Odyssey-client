var Chicago = new google.maps.LatLng(41.866867, -87.607076)
    , app = require('../application.jsx')

mapStyle = [
    {
      "featureType":"administrative",
      "elementType":"labels.text.fill",
      "stylers":[{"color":"#444444"}]
    },
    {
      "featureType":"landscape",
      "elementType":"all",
      "stylers":[{"color":"#f2f2f2"}]
    },
    {
      "featureType":"poi",
      "elementType":"all",
      "stylers":[{"visibility":"off"}]
    },
    {
      "featureType":"road",
      "elementType":"all",
      "stylers":[{"saturation":-100},{"lightness":55}]
    },
    {
      "featureType":"road.highway",
      "elementType":"all","stylers":[{"visibility":"simplified"}]
    },
    {
      "featureType":"road.arterial",
      "elementType":"labels.icon",
      "stylers":[{"visibility":"off"}]
    },
    {
      "featureType":"transit",
      "elementType":"all",
      "stylers":[{"visibility":"off"}]
    },
    {
      "featureType":"water",
      "elementType":"all",
      "stylers":[{"color":"#46bcec"},{"visibility":"on"}]
    }
  ]

var mapOptions = {
    zoom: 12,
    panControl: false,
    tilt: 0,
    // disableAutoPan: true,
    mapTypeControl: false,
    styles: mapStyle,
    zoomControl: false,
    center: Chicago,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    }
  }

var streetViewOptions = {
    position: Chicago,
    pov: {
      heading: 320,
      pitch: 1
    },
    addressControl: false,
    zoomControl: false,
    panControl: false
  }

var markerOptions = {
    icon: "assets/images/marker_green.png",
    zIndex: 50
  }

var rendererOptions = {
    map: map.app
    , markerOptions: markerOptions
    , suppressBicyclingLayer: true
    , polylineOptions: {
      strokeColor: "#00a9ff"
      , strokeOpacity: 0
    }
    , preserveViewport: true
  }

module.exports = {
  map: mapOptions
  , Chicago: Chicago
  , streetView: streetViewOptions
  , render: rendererOptions 
}
