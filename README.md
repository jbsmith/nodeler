(The MIT License)

Copyright (c) 2010-2011 JB Smith <jbsmith_aaat_mac.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Getting started

   SUPPORT FOR: Growl (OS X) and Snarl (Windows)
        
      start with either:
			
  			npm install nodeler
			
      or: 
	
				git clone https://github.com/jbsmith/nodeler.git
				cd nodeler
				npm install
      
			try

        nodeler  127.0.0.1  'Title' 'Message' 1 // Test passed
        nodeler  127.0.0.1  'Title' 'Message' 0 // Test failed
        nodeler  127.0.0.1  'Title' 'Message' // ordinary message
        nodeler  127.0.0.1  'Title' 'Message' 1 true // register with Snarl client
  
   where x.x.x.x is the IP of the machine to receive the notification. 
      the first (optional) argument after that is the message Title.
      the second (optional) argument after that is the Notice itself.
      third argument (optional) is the priority/passfail
      fourth argument (optional) is the request to register with the Snarl client app.

   in the code you'll find where these arguments are utilized via:
   process.ARGV[2]  etc.
   
   At the moment, the registration packet works if growl is configured with no password to listen on the network port UDP 9887
   
   Snarl should listen on TCP 9887.
   
   With node, you could possibly setup a listener that would accept a list of IPs that could become receivers for the packets created in nodeler. a simplistic pubsub.
   
   By default you can call nodeler.js as a command line application script.
   There is no reason this code could not be turned into a module.
   
   The purpose of this code was to enable notifications to be sent from ANY machine (e.g. anything running node) without a dependency on growlnotify.
   
   Please post any desired features to the issues page.
   
##2011 01 29
   ADDED support for SNP using the Snarl notification client.
   Was looking for a way to notify OSX and Windows clients simultaneously.
   Let Windows users run Snarl configured on:
      Network->Receiving->Listen for incoming Growl or Snarl notifications? set to Yes.
   OS X users ca run growl with network listening turned on and no password for registrations.
      No registration password support working yet.


