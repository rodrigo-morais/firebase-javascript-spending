module.exports = function (grunt) {

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                modules: 'amd'
            },
            dist: {
                files: {
                    'dist/javascript/app.js': 'javascript/app.js',
                    'dist/javascript/config.js': 'javascript/config.js'
                }
            }
        },
        copy: {
            main: {
                cwd: './',
                src: 'index.html',
                dest: 'dist/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            },
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['babel', 'copy']);

};