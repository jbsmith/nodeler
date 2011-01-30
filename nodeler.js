#!/usr/bin/env node

/*
 * Copyright (c) 2011 jbsmith__aaat__mac.com
 *
 * Licensed under the terms of MIT License. For the full copyright and license
 * information, please see the README file in the root folder.
 *
 * A simple testing notification service callable from the command line
 * Works with Growl or Snarl clients.
 */
 
var net = require('net'); // for TCP
var dgram = require('dgram'); // for UDP
var crypto = require('crypto'); // for MD5
var sys = require('sys');

var appname = "nodeler";
var notices = ["Fail","Pass"];

var destination = (process.ARGV[2] || "127.0.0.1");
var title = (process.ARGV[3] || "Message from node.js");
var description = (process.ARGV[4] || "Hello from your node.js application");
var priority = (process.ARGV[5] < notices.length ? process.ARGV[5] : 0);
var register = (process.ARGV[6] || false); // option for Snarl only.

/** GrowlTalk UDP packet preparation
 *  http://growl.info/documentation/developer/protocol.php
 */
var clear = function clear(){
  var buffer = this;
  var i = buffer.length;
  while(i){
  buffer.write('\u0000',i);
    --i;
  }
  return buffer;
};

Buffer.prototype.clear = clear;

var conlens = new Buffer( '\u0000' + String.fromCharCode(notices[priority].length) 
                            + '\u0000' + String.fromCharCode(title.length)
                            + '\u0000' + String.fromCharCode(description.length)
                            + '\u0000' + String.fromCharCode(appname.length) );
var content = new Buffer( notices[priority]
                        + title
                        + description
                        + appname, 'utf8');
var prereg = new Buffer(  appname
                        + '\u0000' + String.fromCharCode(notices[0].length)
                        + notices[0]
                        + '\u0000' + String.fromCharCode(notices[1].length)
                        + notices[1]
                        + '\u0000\u0001', 'utf8');
var n_bufsize = ( 4 + 8 
                + notices[priority].length
                + title.length
                + description.length
                + appname.length
                //+ 16  // for the MD5 checksum
                );
var r_bufsize = ( 4 + 2
                + appname.length
                + 2
                + notices[0].length
                + 2
                + notices[1].length
                + 2
                //+ 16  // for the MD5 checksum
                );
               

var notification = new Buffer(n_bufsize).clear();
var registration = new Buffer(r_bufsize).clear();

var regraw = '\u0001\u0004\u0000' + String.fromCharCode(appname.length) + '\u0002\u0002' + prereg.toString('utf8');
//registration.write(regraw + crypto.createHash('md5').update(regraw).digest('binary'),0);
registration.write(regraw,0);

var notraw = '\u0001\u0005\u0001\u0011' + conlens.toString()+content.toString('utf8');
//notification.write(notraw + crypto.createHash('md5').update(notraw).digest('binary'),0);
notification.write(notraw,0);

var client = dgram.createSocket("udp4");
client.send(registration, 0, registration.length, 9887, destination); // notify via growl
client.send(notification, 0, notification.length, 9887, destination); // notify via growl
client.close();
// END Growltalk UDP packet preparation


/** Snarl
 *  SNP packet preparation
 *  http://www.fullphat.net/dev/snp/index.htm
 */
var snpreg = new Buffer('type=SNP#?version=1.0#?action=register#?timeout=0#?app=' + appname + '\r\n','utf8');
var snpcls = [new Buffer('type=SNP#?version=1.0#?action=add_class#?timeout=0#?app=' + appname + '#?class=1#?title=' + notices[0] + '\r\n','utf8')
            , new Buffer('type=SNP#?version=1.0#?action=add_class#?timeout=0#?app=' + appname + '#?class=2#?title=' + notices[1] + '\r\n','utf8')];
var snpnot = new Buffer('type=SNP#?version=1.0#?action=notification#?app=' + appname + '#?class=' + (parseInt(priority)+1) + '#?title=' + title + '#?text=' + description + '#?timeout=3' + '\r\n','utf8');
var snpurg = new Buffer('type=SNP#?version=1.0#?action=unregister#?timeout=0#?app=' + appname + '\r\n','utf8');

/** Provide a method to register with Snarl if needed.
 *  This method attempts to unregister and then reregister itself.
 *  If no registration was called for, just send the notification.
 */
var notify = function notify(socket){
  var timeout = 100;
  if(!register){
    socket.end(snpnot);
  }else{
    setTimeout(function(){socket.write(snpurg)
      setTimeout(function(){socket.write(snpreg)
        setTimeout(function(){socket.write(snpcls[0])
          setTimeout(function(){socket.write(snpcls[1])
              socket.end(snpnot);
            },timeout);
          },timeout);
        },timeout);
    },timeout);
  }
};

var socket_R = net.createConnection(9887, destination); // TCP
socket_R.setEncoding('utf8');

socket_R.on('connect',function(){
  notify(socket_R);  
});

socket_R.on('data', function(chunk){
  //sys.print(chunk);
});

socket_R.on('error', function(){
  //sys.print(chunk);
});

// END SNP packet preparation


