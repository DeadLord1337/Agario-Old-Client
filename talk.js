// see: https://github.com/forairan/Agar.io-Protocol/blob/master/Protocol.md

var WebSocket = require('ws')
  , ws = new WebSocket('ws://167.114.174.63:1506');
ws.on('open', function() {
  console.log('onopen');

  ws.onmessage = function (message) {
    // console.log(message.data)

    processMessage(new DataView(toArrayBuffer(message.data)));
  }

  function P(a) {
    ws.send(a.buffer)
  }

  function O(a) {
    return new DataView(new ArrayBuffer(a))
  }

  var a;

  a = O(5);
  a.setUint8(0, 254);
  a.setUint32(1, 4, !0);

  ws.send(a);

  a = O(5);
  a.setUint8(0, 255);
  a.setUint32(1, 673720361, !0);

  ws.send(a);
});

var processMessage = function (message) {
  // console.log(message.toString());
  // console.log(message.getUint8(0));

  function b() {
    for (var b = "";;) {
      var d = message.getUint16(c, !0);
      c += 2;
      if (0 == d) break;
      b += String.fromCharCode(d)
    }

    return b
  }

  var c = 0;
  240 == message.getUint8(c) && (c += 5);

  switch (message.getUint8(c++)) {
    case 49:
      console.log('leaderboard');
      var d = message.getUint32(c, !0);
      c = c + 4;
      var B = [ ];

      for (var e = 0; e < d; ++e) {
        var m = message.getUint32(c, !0);
        c = c + 4;
        console.log({
          id: m,
          name: b()
        });
      }
  }
};

function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);

  for (var i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
  }

  return ab;
}