window.onload = function loadBlocks() {
  var blocks = [];
  var i = 0;
  var soundBlock = document.createElement('div');
  soundBlock.className = 'soundBlock';
  for (var y = 0; y < 14; y++) {
    var temp = []
    for (var x = 0; x < 14; x++) {
      temp.push(soundBlock.cloneNode(true));
      temp[x].setAttribute('data-index-column', x);
      temp[x].setAttribute('data-index-row', y);
      temp[x].setAttribute('clicked', 0);
      document.getElementById('box').appendChild(temp[x])
    }
    blocks.push(temp);
  }
  for (var x = 0; x < 14; x++) {
    for (var y = 0; y < 14; y++) {
      blocks[y][x].onclick = function() {
        if (this.getAttribute('clicked') == false) {
          this.setAttribute('clicked', 1);
          this.className += ' selected';
        }
        else {
          this.setAttribute('clicked', 0);
          this.classList.remove('selected');
        }
      }
    }
  }

function loop() {
  var clicked = 0;
  setTimeout(function() {
    for (var x = 0; x < 14; x++) {
      blocks[x][i].classList.remove('row-select')
    }
    i++;
    if (i >= 14) i = 0;
    for (var x = 0; x < 14; x++) {
      blocks[x][i].className += ' row-select';
      if (blocks[x][i].getAttribute('clicked') == true) {
        PlaySound(blocks[x][i].getAttribute('data-index-row'));
        clicked++;
      }
    }
    for (var x = 0; x < clicked; x++) {
      var width = document.body.getBoundingClientRect().width;
      var height = document.body.getBoundingClientRect().height;
      var size = Math.floor(Math.random()*400);
      var posX = Math.floor(Math.random()*width);
      var posY = Math.floor(Math.random()*height);
      var colorR = Math.floor(Math.random() * 255);
      var colorG = Math.floor(Math.random() * 255);
      var colorB = Math.floor(Math.random() * 255);
      var circ = document.createElement('div');
      circ.setAttribute('style', 'left:'+ (posX-size/2) + 'px; top:' + (posY-size/2) +'px; width:' + size + 'px; height:' + size + 'px; background-color:' + 'rgba(' + colorR + ',' + colorR
                        +',' + colorR + ',1); position:absolute; border-radius:50%; z-index:1;');
      document.getElementById('container').insertBefore(circ, document.getElementById('box'));

    }
    loop();
  }, 500)
}
  //PlaySound(this.getAttribute('data-index-row'));
  function PlaySound(melody) {
    var path = "sounds/"
    var snd = new Audio(path + melody + ".wav");
    snd.play();
}
loop();
}
