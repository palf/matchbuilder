var config = {
    options: {
    },

    all: {
        options: {
            script: 'server/start.js'
            // background: false
        }
    }
};

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-express-server');
    grunt.renameTask('express', 'serve');
    grunt.config('serve', config);
};
