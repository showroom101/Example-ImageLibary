var app = {};
(function () {
    app = angular.module("MainApp", ['ngRoute', 'ngCookies', 'ngSanitize', 'ngResource', 'ngAnimate', 'mgcrea.ngStrap', 'kendo.directives']);
    app.factory('mainAuthentication', function ($http, $q, $timeout, $interval, $rootScope, $location) {
        var thisAuth = {};
        thisAuth.CheckAuthentication = function () {
            var deferred = $q.defer();
            var maxTimeout = 5;
            $http({
                method: "POST",
                url: "/login/chkLoginSession",
                contentType: 'application/json; charset=utf-8',
                timeout: 15000,
                dataType: 'json'
                //headers: {
                //    'RequestVerificationToken': token
                //}
            }).success(function (data) {
                if (data == "ERROR") {
                    $location.path("/");
                } else {
                    $rootScope.loginform = false;
                }
                deferred.resolve(data);
            }).error(function () {
                $location.path("/");
                deferred.reject("ERROR");
            });
            return deferred.promise;
        };
        return thisAuth;
    });

    app.config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');
        $routeProvider
            .when("/", {
                templateUrl: '/views/index/index.html',
                controller: 'indexCtrl',
                resolve: {
                    ChkAuthen: function (mainAuthentication) {
                        return; // mainAuthentication.CheckAuthentication();
                    }
                }
            })
            
            .otherwise({
                redirectTo: "/"
            });
    });
})();
