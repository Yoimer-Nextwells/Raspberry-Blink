var Blynk = require('blynk-library');

var AUTH = '423b9ca014e54a1c892d4d22d2832f68';

var blynk = new Blynk.Blynk(AUTH, options = {
 connector : new Blynk.TcpClient()
});

var v1 = new blynk.VirtualPin(1);
var v9 = new blynk.VirtualPin(9);

v1.on('write', function(param) {
 console.log('V1:', param[0]);
});

v9.on('read', function() {
 v9.write(new Date().getSeconds());
//v9.write(10);
});
