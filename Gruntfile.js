/* globals module */
var fs = require("fs");
module.exports = function (grunt) {
    /**
     * Automatically load all Grunttasks, which follow the pattern `grunt-*`
     */
    require('load-grunt-tasks')(grunt);

    /**
     * Allow description and definition of avaialable tasks
     */
    grunt.config("availabletasks.tasks.options", {
        /* No special config yet */
    });
    grunt.registerTask("tasks", ["availabletasks"]);


    /**
     * Basic configuration for all watch tasks
     */
    grunt.config("watch", {
        options: {
            atBegin: true
        }
    });

    /**
     * Basic configuration for all symlink tasks
     */
    grunt.config("symlink", {
        options: {
            overwrite: true
        }
    });

    /**
     * Basic configuration for all uglify tasks
     */
    grunt.config("uglify", {
        options: {
            report: "min",
            /** preserve special comments, which include licenses and stuff */
            preserveComments: "some",
            /** Write out source maps for each uglified target */
            sourceMap: function(filepath) {
                return filepath + ".map";
            }
        }
    });


    /**
     * Jshint configuration for linting the project files
     */
    grunt.config("jshint", {
        options: {
            jshintrc: "jshint.json"
        },
        all: [
            "Gruntfile.js",
            "karma.conf.js",
            "specs/**/*.js",
            "src/**/*.js"
        ]
    });

    grunt.config("watch.lint", {
        files: grunt.config.get("jshint.all"),
        tasks: ["lint"]
    });

    grunt.registerTask("lint", ["jshint"]);


    /**
     * Statically build all dependencies into one file for production
     */
    grunt.config("requirejs", {
        all: {
            options: {
                basePath: "src/",
                mainConfigFile: "src/require.config.js",
                out: "build/requirejs/main.js",
                optimize: "none",
                generateSourceMaps: true,
                /* Remove all jsx! loader calls from build */
                onBuildWrite: function (moduleName, path, singleContents) {
                    return singleContents.replace(/('|")jsx!/g, '$1');
                },
                exclude: ["../node_modules/almond/almond", "JSXTransformer", "jsx"],
                // We use the wrapping technique here instead of `insertRequire`
                // as we need one initial sync `require` to make sure the library
                // is fully loaded once the file is completely processed.
                // `insertRequire` is async!
                wrap: {
                    start: "(function() {\n" + fs.readFileSync("node_modules/almond/almond.js") + "\n",
                    end: "require('main');\n" + "}());"
                },
                include: ["jsx!main"]
            }
        }
    });

    grunt.config("uglify.build", {
        files: {
            "build/uglify/main.min.js": "build/requirejs/main.js"
        }
    });

    grunt.config("copy.dist", {
        files: [
            {
                expand: true,
                cwd: "assets",
                src: ["*"],
                dest: "dist/"
            },
            {
                expand: true,
                flatten: true,
                src: [
                    "build/requirejs/main.js",
                    "build/uglify/main.min.js",
                    "build/uglify/main.min.map"
                ],
                dest: "dist/js/"
            }
        ]
    });

    grunt.config("watch.build", {
        files: [
            "src/**/*.js"
        ],
        tasks: ["build"]
    });

    grunt.registerTask("build", ["lint", "requirejs", "uglify:build", "copy:dist"]);


     /**
     * Karma-Runner execution configuration to execute Unit-Tests from
     * within Grunt
     */
    grunt.config("karma", {
        "all": {
            configFile: 'karma.conf.js',
            autoWatch: true
        },
        "all-single": {
            configFile: 'karma.conf.js',
            autoWatch: false
        },
        "dev":{
            configFile: 'karma.conf.js',
            browsers: ['PhantomJS'],
            autoWatch: true
        },
        "dev-single": {
            configFile: 'karma.conf.js',
            browsers: ['PhantomJS'],
            singleRun: true
        }
    });

    // Execute single test run with PhantomJS
    grunt.registerTask("test", ["karma:dev-single"]);

    // Execute a test run on a running server
    grunt.registerTask("test:run", ["karma:dev:run"]);

    // Watch changes and run tests on Phantom automatically
    grunt.registerTask("watch:test", ["karma:dev"]);

    // Run a karma test-server for everybody else to connect to
    grunt.registerTask("test:server", ["lint", "karma:all-single"]);

    // Run a karma test server for everybody to connect to, while watching
    // and auto-executing tests once files change
    grunt.registerTask("watch:test:server", ["lint", "karma:all"]);


    /**
     * Symlink files to www directory
     */
    grunt.config("symlink.www", {
        files: [
            {
                src: "bower_components",
                dest: "www/bower_components"
            },
            {
                src: "node_modules",
                dest: "www/node_modules"
            },
            {
                src: "vendor",
                dest: "www/vendor"
            },
            {
                src: "src",
                dest: "www/js"
            },
            {
                expand: true,
                cwd: "assets",
                src: ["*"],
                dest: "www/"
            }
        ]
    });


    /**
     * Clean all the build and temporary directories
     */
    grunt.config("clean", {
        "build": ["build/**/*"],
        "dist": ["dist/**/*"],
        "www": ["www/**/*"]
    });

    /**
     * Default grunt task ;)
     */
    grunt.registerTask("default", ["build"]);
};
