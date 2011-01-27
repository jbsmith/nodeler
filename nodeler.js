#!/usr/bin/env node

var dgram = require('dgram');
var crypto = require('crypto');

var appname = "growlnotify";//"nodeler";
var notice = "Command-Line Growl Notification";//"Nodification";
/*
var appname = "nodeler";
var notice = "Nodification";
*/
var title = (process.ARGV[3] || "Message from node.js");
var description = (process.ARGV[4] || "Hello from your node.js application");

var contentlens = new Buffer( '\u0000' + String.fromCharCode(notice.length) 
                            + '\u0000' + String.fromCharCode(title.length)
                            + '\u0000' + String.fromCharCode(description.length)
                            + '\u0000' + String.fromCharCode(appname.length) 
                      );
var content = new Buffer(notice
                        +title
                        +description
                        +appname, 'utf8');
var prereg = new Buffer(appname
                        + '\u0000' + String.fromCharCode(notice.length)
                        + notice 
                        + '\u0000\u0000', 'utf8');
var notification_bufsize = (  4 + 8 
               + notice.length
               + title.length
               + description.length
               + appname.length
               //+ 16  // for the MD5 checksum
               );
var registration_bufsize = (  4 + 1
               + appname.length
               + 2
               + notice.length
               + 2
               //+ 16  // for the MD5 checksum
               );
               
var notification = new Buffer(notification_bufsize);
var registration = new Buffer(registration_bufsize);

var i=notification_bufsize
   ,j=registration_bufsize;
   
while(i){
  notification.write('\u0000',i);
  --i;
}
while(j){
  registration.write('\u0000',j);
  --j;
}

var regraw = '\u0001\u0004\u0000' + String.fromCharCode(appname.length) + '\u0001\u0001' + prereg.toString('utf8');

//registration.write(regraw + crypto.createHash('md5').update(regraw).digest('binary'),0);
registration.write(regraw,0);

var notraw = '\u0001\u0005\u0000\u0000' + contentlens.toString()+content.toString('utf8');

//notification.write(notraw + crypto.createHash('md5').update(notraw).digest('binary'),0);
notification.write(notraw,0);

var client = dgram.createSocket("udp4");
client.send(registration, 0, registration.length, 9887, (process.ARGV[2] || "127.0.0.1")); // notify via growl
client.send(notification, 0, notification.length, 9887, (process.ARGV[2] || "127.0.0.1")); // notify via growl
client.close();