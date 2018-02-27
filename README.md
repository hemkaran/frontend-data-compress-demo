## A demonstration of compression the data at frontend in browser using web worker

This file demonstrate the use of web worker to compress the data. We want to send a very big data to our backend. We will send this data to web worker to get it compressed as we can't do compression on the main thread. Worker will compress the data and return it here, so that we can send it to backend

### Running demo
1. Clone this repository
2. Run `npm install`
2. Install `http-server` to serve the file using (Ignore if already installed):
    
    `
    npm install -g http-server
    `
3. Move to the directory, where you cloned this repository and run this command to start the server
    
    `
    http-server .
    `
    
    It will give the output like
    ```
    Starting up http-server, serving .
    Available on:
      http://127.0.0.1:8080
      http://192.168.1.124:8080
    Hit CTRL-C to stop the server
    ``` 
4. Open http://127.0.0.1:8080 to access the demo.
5. You will see two events call in the network panel, check the request size of both the request.

## Setup
2. Run `grunt` to build the files again if you have changed the worker.js file.

### Copyright and license

>The [MIT license](https://opensource.org/licenses/MIT) (MIT)
>
>Copyright (c) 2018-2019 Hemkaran Raghav
>
>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 