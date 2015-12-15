module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-release');
    grunt.initConfig({
        watch: {
            'app': {
                'files': [
                    'app/**/*.{html,js,css}',
                    '!app/bower_components/**/*.*'
                ],
                'options': { 'livereload': '<%= connect.options.livereload %>' }
            },
            'bower': {
                'files': ['bower.json'],
                'tasks': ['wiredep']
            }
        },
        wiredep: { 'app': { 'src': ['app/*.html'] } },
        connect: {
            'options': {
                'port': 3000,
                'livereload': 4586,
                'open': false,
                'base': ['app'],
                'hostname': 'localhost'
            },
            'app': {}
        },
        release: {
          options: {
            npm: false
          }
        }
    });
    grunt.registerTask('default', [
        'connect',
        'watch'
    ]);
};
