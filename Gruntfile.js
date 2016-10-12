var js_files = [
    
    
    'js_src/helpers/*.js',
    'js_src/app*.js',
    'js_src/services/*.js',
    'js_src/controllers/*.js',
    
];

var less_files = [
    'less/**/*.less'

];

module.exports = function (grunt) {
    require('jit-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            less: {
                files: less_files,
                tasks: ['less']
            },
            js: {
                files: js_files,
                tasks: ['concat']
            }
        },
        less: {
            development: {
                files: {
                    "css/style.css": less_files
                }
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';\n',
                    sourceMap: true
                },
                files: [
                    {
                        src: js_files,
                        dest: 'js/app.js'
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', ['concat','less']);
};
