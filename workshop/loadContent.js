function load(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     render(createJSON(this.response));
   } else if (this.readyState == 4 && this.status == 404) {
     window.location = "/?alert=404"
   }
  };
  xhttp.open("GET", "/content/" + getParameterByName('code') + ".csv", true);
  xhttp.send();
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function createJSON(csv){
  var lines=csv.split("<->");
  var json = [];
  var headers=lines[0].split(",");
  for(var i = 1; i < lines.length; i++){
	  var block = {};
	  var csvBlock = lines[i].split(",");
	  for(var j = 0; j < headers.length; j++){
      if (csvBlock[j]){
        block[headers[j]] = csvBlock[j].replace(/\n/g, "<br />");
        if (block[headers[j]][0] == '"'){
          block[headers[j]] = block[headers[j]].substring(1, block[headers[j]].length-1);
        }
      } else {
		   block[headers[j]] = csvBlock[j];
     }
	  }
	  json.push(block);
  }
  return json;
}

function render(block) {
  //Mandatory data
  var title = block[0]['Title'];
  var description = block[0]['Description'];
  var buttonText = block[0]['Button text'];
  var buttonLink = block[0]['Button link'];
  //Render mandatory data
  document.getElementById('workshopTitle').innerHTML = title;
  document.getElementById('workshopDescription').innerHTML = description;


  var html = '';
  if (block[0]['Button text'] != "")
    html += '<a target="blanck" href="' + block[0]['Button link'] + '" class="btn btn-primary boton">' + block[0]['Button text'] + '</a>';
  if (block[0]['Button text B'] != "")
    html += '<a target="blanck" href="' + block[0]['Button link B'] + '" class="btn btn-primary boton">' + block[0]['Button text B'] + '</a>';
  document.getElementById('workshopButtons').innerHTML += html;

  //Content blocks
  var numberBlocks = block.length;
  for (i = 1; i < numberBlocks; i++){
    if (block[i]['Type'] == 'Image-Text') {
      imageText(block[i]);
    } else if (block[i]['Type'] == 'Text-Image') {
      textImage(block[i]);
    } else if (block[i]['Type'] == 'Title') {
      titleBlock(block[i]);
    } else if (block[i]['Type'] == 'Image') {
      imageBlock(block[i]);
    } else if (block[i]['Type'] == 'YouTube') {
      youtube(block[i]);
    }
  }

}

// Blocks
function imageText(content){
  var html = '<div class="step-img-left"> \
                <div><img src="' + content['src'] + '" alt="..."></div> \
                <div>\
                    <h2>' + content['Title'] + '</h2>\
                    <p>' + content['Description'] + '</p>';
  if (content['Button text'] != "")
            html += '<a target="blanck" href="' + content['Button link'] + '" class="btn btn-primary boton">' + content['Button text'] + '</a>';
  if (content['Button text B'] != "")
            html += '<a target="blanck" href="' + content['Button link B'] + '" class="btn btn-primary boton">' + content['Button text  B'] + '</a>';
    html += '   </div>\
              </div>';

  document.getElementById('container').innerHTML += html;
}

function textImage(content){
  var html = '<div class="step-img-left"> \
                <div>\
                    <h2>' + content['Title'] + '</h2>\
                    <p>' + content['Description'] + '</p>';
  if (content['Button text'] != "")
            html += '<a target="blanck" href="' + content['Button link'] + '" class="btn btn-primary boton">' + content['Button text'] + '</a>';
  if (content['Button text B'] != "")
            html += '<a target="blanck" href="' + content['Button link B'] + '" class="btn btn-primary boton">' + content['Button text  B'] + '</a>';
    html += '   </div>\
                <div><img src="' + content['src'] + '" alt="..."></div> \
              </div>';

  document.getElementById('container').innerHTML += html;
}

function titleBlock(content){
  var html = '<div class="step-title"> \
                    <h2>' + content['Title'] + '</h2>\
                    <p>' + content['Description'] + '</p>';
  if (content['Button text'] != "")
            html += '<a target="blanck" href="' + content['Button link'] + '" class="btn btn-primary boton">' + content['Button text'] + '</a>';
  if (content['Button text B'] != "")
            html += '<a target="blanck" href="' + content['Button link B'] + '" class="btn btn-primary boton">' + content['Button text  B'] + '</a>';
    html += '   </div>\
              </div>';

  document.getElementById('container').innerHTML += html;
}

function imageBlock(content){
  var html = '<div class="step-image"> \
                <img src="' + content['src'] + '" alt="..."> \
              </div>';

  document.getElementById('container').innerHTML += html;
}

function youtube(content){
  var html = '<div class="step-youtube"> \
                <iframe id="iframe" style="width: 100%;" src="https://www.youtube.com/embed/' + content['src'] + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\
              </div>';

  document.getElementById('container').innerHTML += html;
  var height = (document.getElementById("iframe").clientWidth * 9) / 16;
  document.getElementById("iframe").style.height = height.toString();
}
