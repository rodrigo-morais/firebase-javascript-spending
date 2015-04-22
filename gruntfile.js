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
            jquery: {
                cwd: './',
                src: 'vendor/jquery/dist/*',
                dest: 'dist/vendor/jquery/dist',
                expand: true,
                flatten: true,
                filter: 'isFile'
            },
            bootstrap: {
                cwd: './',
                src: 'vendor/bootstrap/dist/**',
                dest: 'dist',
                expand: true
            },
            assets: {
                cwd: './',
                src: 'assets/**',
                dest: 'dist',
                expand: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['babel', 'copy']);

};