sassFiles = {
    'site/css/style.min.css': 'assets/style/main.scss'
}
postcssFiles = {
    "site/css/style.min.css": ['site/css/style.min.css']
}
scriptOutput = 'site/js/app.min.js';
scriptFiles = {
    src: ['bower_components/jquery/dist/jquery.min.js', 
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js', 
    'bower_components/owl.carousel/dist/owl.carousel.min.js', 
    'assets/js/**/*.js', 
    'assets/js/main.js', ],
    dest: scriptOutput
}
module.exports = function(grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        postcss: {
            prod: {
                options: {
                    map: {
                        inline: false, // save all sourcemaps as separate files...
                        annotation: 'assets/style/maps' // ...to the specified directory
                    },
                    // safe: true,
                    processors: [
                        // require('pixrem')(), // add fallbacks for rem units
                        require('autoprefixer')({
                            browsers: 'last 2 versions'
                        }), // add vendor prefixes
                        require('cssnano')(), // minify the result
                        require('cssnext')() // Plugins to use future CSS features now by adding backwards compatibility css processing
                    ]
                },
                files: postcssFiles
            },
            dev: {
                options: {
                    map: {
                        inline: false, // save all sourcemaps as separate files...
                        annotation: 'assets/style/maps' // ...to the specified directory
                    },
                    // safe: true,
                    processors: [
                        // require('pixrem')(), // add fallbacks for rem units
                        require('autoprefixer')({
                            browsers: 'last 2 versions'
                        }), // add vendor prefixes
                        require('cssnext')() // Plugins to use future CSS features now by adding backwards compatibility css processing
                    ]
                },
                files: postcssFiles
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: sassFiles
            }
        },
        uglify: {
            dist: {
                options: {},
                files: {
                    'site/js/app.min.js': [scriptOutput]
                }
            }
        },
        concat: {
            options: {
                separator: ';\n',
            },
            dist: scriptFiles,
        },
        watch: {
            configFiles: {
                files: ['Gruntfile.js', 'package.json'],
                options: {
                    reload: true
                }
            },
            styles: {
                files: 'assets/style/**/*.scss',
                tasks: ['sass:dist', 'postcss:dev'],
                options: {
                    nospawn: true
                }
            },
            scripts: {
                files: 'assets/js/**/*.js',
                tasks: ['concat'],
                options: {
                    nospawn: true
                }
            },
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['site/**/*', 'assets/**/*']
                },
                options: {
                    watchTask: true,
                    proxy: "http://127.0.0.1:4000/"
                }
            }
        },
        copy: {
            files: {
                cwd: 'bower_components/font-awesome/fonts', // set working folder / root to copy
                src: '**/*', // copy all files and subfolders
                dest: 'site/fonts', // destination folder
                expand: true // required when using cwd
            }
        },
        wiredep: {
            task: {
                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'assets/style/main.scss' // .scss & .sass support...
                ],
                options: {
                    // See wiredep's configuration documentation for the options
                    // you may pass:
                    // https://github.com/taptapship/wiredep#configuration
                }
            }
        },
        shell: {
            jekyllBuild: {
                cwd: 'site',
                command: 'jekyll build'
            }
        }
    });
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('prod', ['sass:dist', 'postcss:prod', 'concat', 'uglify', 'copy', 'shell:jekyllBuild']);
    grunt.registerTask('dev', ['sass:dist', 'postcss:dev', 'concat', 'uglify', 'copy', 'shell:jekyllBuild']);
};