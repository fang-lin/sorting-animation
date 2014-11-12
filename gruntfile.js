/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

module.exports = function (grunt) {
    'use strict';

    //grunt plugins
    require('load-grunt-tasks')(grunt);
    //config
    grunt.initConfig({
        clean: {
            build: ['build'],
            tmp: ['tmp']
        },

        jshint: {
            options: {
                base: '',
                jshintrc: true,
                reporter: 'jshintreport.js'
            },
            client: {
                files: {
                    src: ['client/*.js', 'client/algorithm/*.js']
                }
            },
            server: {
                files: {
                    src: '*.js'
                }
            }
        },

        less: {
            dev: {
                files: {
                    'client/css/main.css': 'client/css/main.less'
                }
            }
        },

        watch: {
            less: {
                files: [
                    'client/css/*.less'
                ],
                tasks: ['less']
            }
        },

        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    ignore: ['client/**']
                }
            }
        }
    });

    //alias tasks
    grunt.registerTask('jshint:all', ['jshint:client', 'jshint:server']);
};