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
        clean: ['dist', 'tmp'],

        jshint: {
            options: {
                base: '',
                jshintrc: true,
                reporter: 'jshintreport.js'
            },
            client: {
                files: {
                    src: ['client/*.js', 'client/app/*.js', 'client/app/**/*.js']
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

        uglify: {
            options: {
                preserveComments: true
            },
            requirejs: {
                files: {
                    'dist/lib/requirejs/require.js': ['client/lib/requirejs/require.js']
                }
            }
        },

        requirejs: {
            dist: {
                options: {
                    baseUrl: '',
                    name: 'client/init',
                    mainConfigFile: 'client/build.js',
                    out: 'dist/init.js',
                    preserveLicenseComments: false
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'dist/css/main.css': ['client/css/main.css']
                }
            },
            minify: {
                expand: true,
                cwd: 'dist/css/',
                src: ['main.css'],
                dest: 'dist/css/',
                ext: '.css'
            }
        },

        copy: {
            main: {
                files: [
                    {src: 'client/index.html', dest: 'dist/index.html'},
                    {src: 'client/css/main.css', dest: 'dist/css/main.css'},
                    {expand: true, flatten: true, src: ['client/app/views/*'], dest: 'dist/app/views/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['client/app/partials/*'], dest: 'dist/app/partials/', filter: 'isFile'}
                ]
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
    grunt.registerTask('build', ['clean', 'less', 'uglify', 'requirejs', 'copy', 'cssmin']);
};