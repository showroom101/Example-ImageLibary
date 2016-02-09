/**
 * Created by Tonman on 24/8/2558.
 */
// karma.conf.js
module.exports = function(config) {
    config.set({
        // Base path for all script '' it mean current
        basePath: '',

        // Frameworks for test script but you can define multiple
        frameworks: ['jasmine'],


        // File are include before test must include unit testing file
        files:[
            "./public/components/angular/angular.js",
            "./public/components/angular-animate/angular-animate.js",
            "./public/components/angular-cookies/angular-cookies.js",
            "./public/components/angular-resource/angular-resource.js",
            "./public/components/angular-route/angular-route.js",
            "./public/components/angular-sanitize/angular-sanitize.js",
            "./public/components/angular-mocks/angular-mocks.js",

            "./public/components/jquery/dist/jquery.min.js",
            "./public/components/angular-strap/dist/angular-strap.min.js",
            "./public/components/angular-strap/dist/angular-strap.tpl.min.js",

            "./public/components/blockUI/jquery.blockUI.js",
            "./public/components/bootstrap/dist/js/bootstrap.min.js",
            "./public/components/spin.js/spin.js",
            "./public/components/toastr/toastr.min.js",
            "./public/components/kendo/js/kendo.all.min.js",
            "./public/components/sweetalert/dist/sweetalert.min.js",
            "./public/components/async/dist/async.js",
            "./public/components/moment/min/moment.min.js",
            "./public/components/jszip/dist/jszip.min.js",
            // angular-mock is test mock for angularjs
            './public/dist/alljavascript.js', // OurCurrentScript
            './public/test/**/*.js' // OurCurrentScript
        ],

        //exclud file list
        exclude:[
            ''
        ],

        // if you have alot plugins can define here.
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher'
        ],
        port:9876,
        colors:true,

        // dot,progress,junit,growl,coverage
        reporters:['progress'],
        //...

        // possible values:
        // config.LOG_DISABLE
        // config.LOG_ERROR
        // config.LOG_WARN
        // config.LOG_INFO
        // config.LOG_DEBUG
        //logLevel: config.LOG_INFO,

        //autoWatch: false,

        browsers: ['Chrome'],

        singleRun: true
    });
};