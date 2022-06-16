export function splitImage12(imageToSplit) {
  // var canvas = document.createElement("canvas"),
  //   ctx = canvas.getContext("2d"),
  //   parts = [],
  //   img = new Image();
  //
  // img.onload = split_12;
  var parts = [];
  var img = new Image();

  function split_12() {
    var w2 = Math.floor(img.width / 3),
      h2 = Math.floor(img.height / 4);

    var i = 0;
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 3; col++) {
        var x = -w2 * col;
        var y = -h2 * row;
        // canvas.width = w2;
        // canvas.height = h2;

        // console.log("x,y :", x, y);
        //
        // ctx.drawImage(this, x, y, w2 * 3, h2 * 4);

        parts.push({ url: "", id: i++ });
      }
    }

    shuffle(parts);

    // setShuffledBoard(parts);
    // setLoading(false);

    // console.log(parts);
  }
  split_12();

  function shuffle(a) {
    for (
      var j, x, i = a.length;
      i;
      j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x
    );
    return a;
  }

  return parts;
  // img.src = imageToSplit;
}
