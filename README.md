(The MIT License)

Copyright (c) 2010-2011 JB Smith <jbsmith_aaat_mac.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Getting started

  ./nodeler.js  127.0.0.1  'Hello from node'  'Here is a new message using growl'

   in the code you'll find where these arguments are utilized via:
   process.ARGV[2]  etc.
   
   At the moment, the registration packet seems to be correct but will still not be permitted by growl. For now we just mimic the existing growlnotify command line app to ensure that we can at least transmit messages from remote.
   
   With node, you could possibly setup a listener that would accept a list of IPs that could become receivers for the packets created in nodeler.
   
   By default you can call nodeler.js as a command line application script, but there is no reason this code could not be turned into a module.
   
   The purpose of this code was to enable notifications to be sent from ANY machine (e.g. anything running node) without having to run growlnotify, which is only present on Mac OSX.
   
   Please post any desired features to the issues page.


