/* This scripts connects to blynk cloud from a Raspberry Pi 3 using Raspbian.

 First checks version of node by typing node --version
 or nodejs --version

 You should look something like this : v6.2.1

If it doesn't print the version or shows an error, please follow Node.js installation guide for Raspberry Pi. I'll give you some hints:

Check that your board is connected to the internet, run in it's terminal:

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

The previous command updates our package repository to include the required packages. Now, let’s install Node.js and Blynk!

sudo apt-get update && sudo apt-get upgrade
sudo apt-get install -y build-essential nodejs
sudo npm install -g npm
sudo npm install -g onoff
sudo npm install -g blynk-library

************************************************************************
Step 2: Writing a simple script

In the Blynk mobile App:

    Create a new dashboard of type Generic, and send yourself an Auth Token. 

    Add a Value Display widget and bind it to V9 

    Add a Slider widget and bind it to V1 

    Press Run (triangle in the upper right corner)

Let's check simple built-in test script.

Note: NODE_PATH environment variable should point to the place where npm stores globally installed modules. If you get something like "Error: Cannot find module blynk-library", you should run in the console (the path might be different):

export NODE_PATH=/usr/local/lib/node_modules

Now, run on your board (put your auth token):

blynk-client.js 715f8cafe95f4a91bae319d0376caa8c

It should print something like:

Connecting to SSL: blynk-cloud.com 8441
Connected, authorized
Blynk ready.

Press Ctrl+C to exit.

If it doesn't work, check if:

    you used a correct auth-token from your mobile project 

    internet connection is OK 

    simple Node.js scripts work 

    ...

Usually there should be no problems.

*******************************************************************************************
Now let's write our own script.
TCP connection

First try a TCP connection example. It is insecure, but easier to start.

On the board, create a new file (call it blynk-test.js):

var Blynk = require('blynk-library');

var AUTH = 'YOUR_AUTH_TOKEN';

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
});

Replace YOUR_AUTH_TOKEN with your token from the App.

There are two Virtual Pins specified here: v1 and v9. These are actions for your widgets.

When you run the script, the project on your phone should start working:

    The Value Display widget should show current time seconds. 

    Moving a Slider should make script printing current value.

Also, if mraa or onoff package is installed, you should be able to read/write digital pins out-of-the-box.

 */

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
