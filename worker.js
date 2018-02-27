define(['pako'], function (pako) {
    'use strict';

    onmessage = function (e) {
        var data = e.data;
        var dataToCompress = data.data;
        if (data.action === 'compress') {
            for(var key in dataToCompress) {
                if(dataToCompress.hasOwnProperty(key)) {
                    dataToCompress[key] = pako.gzip(dataToCompress[key], {level: 4});
                }
            }

            postMessage({
                action: 'compressed',
                id: data.id,
                data: dataToCompress
            });
        }
    };
});