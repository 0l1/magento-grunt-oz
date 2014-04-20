module.exports = function(grunt) {
    var skinDir = 'theme/skin/frontend/my-theme/default/';
    var appDir = 'theme/app/design/frontend/my-theme/default/';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    sassDir: skinDir + 'scss',
                    cssDir: skinDir + 'css',
                    environment: 'development',
                    outputStyle: 'nested'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            livereload: {
                files: [
                    skinDir + 'scss/{,*/}*.scss',
                    skinDir + 'images-src/{,*/}*.{png,jpg,gif}'
                ],
                tasks: [
                    'compass',
                    'clean:images',
                    'imagemin'
                ]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: skinDir + 'images-src/',
                    src: '**/*.{png,jpg,gif}',
                    dest: skinDir + 'images/'
                }]
            }
        },
         clean: {
            images: {
                src: [skinDir + 'images']
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', [
        'compass',
        'clean:images',
        'imagemin',
    ]);
};