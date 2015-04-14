module.exports = function (bike, offset) {
  var isIE8 = window.XDomainRequest ? true : false,
      invocation = createCrossDomainRequest(),
      url = 'http://localhost:9393/trip_for/' + bike + '/after/' + offset,
      response;

  function createCrossDomainRequest(url, handler) {
    var request;
    if (isIE8) {
        request = new window.XDomainRequest();
      } else {
        request = new XMLHttpRequest();
      }
    return request;
  }

  (function callOtherDomain() {
    if (isIE8) {
      invocation.onload = outputResult;
      invocation.open("GET", url, true);
      invocation.send();
    }
    else {
      invocation.open('GET', url, true);
      invocation.onreadystatechange = handler;
      invocation.send();
    }
  })();

  function handler(evtXHR) {
    if (invocation.readyState == 4) {
      if (invocation.status == 200) {
        outputResult();
      } else {
        return "Invocation Errors Occured";
      }
    }
  }

  function outputResult() {
    response = invocation.responseText;
    // console.log("From module: " + response);
    // return response;
  }
}