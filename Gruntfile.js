module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        requirejs: {
            worker: {
                options: {
                    mainConfigFile: 'require-config.js',
                    name: 'worker',
                    out: 'dist/worker.js',
                    onModuleBundleComplete: function (data) {
                        var fs = module.require('fs'),
                            amdclean = module.require('amdclean'),
                            outputFile = data.path,
                            cleanedCode = amdclean.clean({
                                'filePath': outputFile
                            });

                        fs.writeFileSync(outputFile, cleanedCode);
                    }
                }
            }
        }
    });

    grunt.registerTask('default', [ 'requirejs' ]);
    grunt.loadNpmTasks('grunt-contrib-requirejs');
};
