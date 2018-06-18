var archiveName = "buildExt.zip";
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webstore_upload: {
            "accounts": {
                "default": { //account under this section will be used by default
                    publish: true, //publish item right after uploading. default false
                    client_id: "494421552186-ljtfffbhefsm66pmosqlqrn9vphg3o8b.apps.googleusercontent.com",
                    client_secret: "tNtRpuVGqYBSzBhqO_Fxsa9k",
                    refresh_token: "1/WcqGhaUyM4zkSP_ryF_q3oerFloXDDQMwe5Ve038cNk"
                }
            },
            "extensions": {
                "myExtensionName": {
                    //required
                    appID: "aibcoelcomdmlhmadhkgpohmhdkcalga?hl=it",
                    publish: true,
                    //required, we can use dir name and upload most recent zip file
                    zip: "build/" + archiveName
                }
            }
        }
    }),

    grunt.loadNpmTasks('grunt-webstore-upload');

    grunt.registerTask('default', ['webstore_upload']);
};