function load(){
  var alert = getParameterByName('alert');
  if (alert == "404"){
    var html = '<div class="alert alert-danger" role="alert">\
              Not found\
            </div>';
    document.getElementById('alerts').innerHTML = html;
    setTimeout(function() {document.getElementById('alerts').innerHTML = ""}, 2000);
  }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
