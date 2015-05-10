module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'development/',
                        src: [
                            'index.js',
                            'bin/**/*',
                            'config/**/*',
                            'routes/**/*',
                            'views/**/*.*',
                            'views/**/**/.*',
                            'public/main-client-app/css/*.css',
                            'public/main-client-app/assets/**/*.*'

                        ],
                        dest: 'production/'
                    }
                ]
            }
        },
        sass: {
            options: {
                style: 'compressed'
            },
            dist: {
                files: {
                    'development/public/main-client-app/css/styles.css': 'development/public/main-client-app/css/sass/styles.scss'
                }
            }
        },
        jshint: {
            all: [
                'development/public/main-client-app/js/**/*.js'
            ],
            options:{
                strict: false
            }
        },
        watch: {
            sass: {
                files: ['development/public/main-client-app/css/sass/*.scss'],
                tasks: ['sass'],
                options: { debounceDelay: 250 }
            },
            js: {
                files: [
                    'development/public/**/*.js',
                    'development/public/*.js'
                ],
                tasks: ['jshint', 'browserify'],
                options: { debounceDelay: 250 }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'production/public/index.js': ['development/public/index.js' ]
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'development/public/index.js': [
                        'development/public/main-client-app/js/**/*.js'
                    ]
                },
                options: {
                    debug: true,
                    transform:  [
                        'reactify',
                        ['hoganify', { ext: '.html,.hg,.hjs' }]
                    ],
                    alias: {
                        'hogan.js':'./node_modules/hogan/node_modules/hogan.js/dist/hogan-3.0.2.min.js'
                    }
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                browsers: ['Chrome']
            },
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                autoWatch: false,
                browsers: ['PhantomJS']
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build',  ['sass', 'jshint', 'browserify', 'copy']);
    grunt.registerTask('default', ['sass', 'jshint', 'karma:continuous', 'browserify', 'copy', 'uglify']);
};

