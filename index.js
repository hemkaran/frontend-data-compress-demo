/**
 * This file demonstrate the use of web worker to compress the data.
 * We want to send a very big data to our backend. We will send this data to worker to get it compressed
 * as we can't do compression on the main thread. Worker will compress the data and return it here, so that
 * we can send it to backend
 */

(function () {
    /**
     * Check if browser supports worker
     * @returns {boolean} - true/false
     */
    var isWorkerSupported = function () {
        return window.Worker && window.URL && window.Blob;
    };

    // URL of the worker file to load
    var workerUrl = '/dist/worker.js';

    // Check if worker is supported in the browser
    if (isWorkerSupported()) {
        // If supported, send a call to fetch the web worker file. Create a blob out of it
        $.ajax({
            url: workerUrl,
            dataType: 'text',
            success: function (data) {
                try {
                    // Create a blob of the file content, so that we can create blob url out of it, that can
                    // be passed to create a web worker file (that runs in the background thread)
                    var blob =  new window.Blob([data], {type: 'text/javascript'});
                    var workerBlobUrl = window.URL.createObjectURL(blob);

                    // workerBlobUrl now is the url to worker file, now we need to create a web worker using this url.
                    var worker = new Worker(workerBlobUrl);

                    // Since, worker is ready, call the function of worker initialized with the worker instance
                    workerInitialized(worker);
                } catch (e) {
                    console.log('Error in initializing worker file');
                }
            }
        });
    }

    function sendData (data) {
        $.ajax({
            // This url is created using Postman (https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)
            // mock server, to check how to create a mock server
            // check here: https://www.getpostman.com/docs/postman/mock_servers/setting_up_mock
            url: 'https://cf9d49d3-f0ce-4cf9-90c5-76ad542d1982.mock.pstmn.io/event',
            type: 'POST',
            data: data
        });
    }

    /**
     * Called when worker will be initialized
     * @param worker
     */
    function workerInitialized (worker) {

        // This will be called when worker finished compressing data. you can access data at e.data
        worker.onmessage = function (e) {
            console.log(e.data);
            sendData(e.data);
        };

        // Lets wait for the document to be ready, so that we will enought data to send
        $(document).ready(function () {
            // Let's create a lot of data to test the compression
            var aLongString = '',
                dataToSend;
            for (var i = 0; i < 1000; i++) {
                aLongString = aLongString + JSON.stringify(window.performance);
            }

            dataToSend = {
                name: 'Hemkaran Raghav',
                value: aLongString
            };

            // Since data is ready, will be send two calls:
            // 1. One call without compressing the data
            sendData(dataToSend);

            // 2. Second call after worker will compress our data
            worker.postMessage({
                id: 1,
                data: dataToSend,
                action: 'compress'
            });
        })
    }
})();