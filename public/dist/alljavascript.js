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

var spinner = {};
var token = "XXX";
(function() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    var optSpinerModal = {
        lines: 11, // The number of lines to draw
        length: 23, // The length of each line
        width: 8, // The line thickness
        radius: 40, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 9, // The rotation offset
        color: '#FFF', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 50, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        //className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent in px
        left: '50%' // Left position relative to parent in px
    };

    var spinnerObj = null;
    spinner.show = function () {
        var spinner_div = document.getElementById('spinner');
        if (spinnerObj == null) {
            spinnerObj = new Spinner(optSpinerModal).spin(spinner_div);
        } else {
            spinnerObj.spin(spinner_div);
        }
        $.blockUI({message: null, overlayCSS: {backgroundColor: '#5c5c5c'}});
    };

    spinner.hide = function () {
        var spinner_div = document.getElementById('spinner');
        spinnerObj.stop(spinner_div);
        $.unblockUI();
    }
})();
(function () {
    app.controller("globalCtrl", function ($scope, $location, $rootScope, $route, $cookies, $window, $timeout, $cookieStore, globalService) {

    });
})();
(function(){
    app.directive('directiveSample',function() {
        return {
            restrict: 'AEC',
            replace: true,
            require: 'ngModel',
            scope: true,
            //template : "",
            //templateUrl : "",
            link: function (scope, element, attr, ngModel) {
                ngModel.$render = function () {
                    element.empty();
                    element.append(ngModel.$viewValue);
                };
            }
        }
    });

    app.directive('componentPagination', function () {
        return {
            templateUrl: "views/Sharing/Pagination.html",
            restrict: "E",
            scope: { itemsdir: "=", totalpage: "=", pagesizeitem: "=", currentpage: "=", changepage: "=" },
            link: function (scope, element, attrib) {

                scope.checkactive = function (page) {
                    if (page == scope.currentpage) return 'active';
                }
                scope.first = function () {
                    scope.changepage(1);
                }
                scope.endpage = function () {
                    var data = Math.ceil(scope.itemsdir / scope.pagesizeitem)
                    scope.changepage(data);

                }
                scope.next = function () {
                    var data = Math.ceil(scope.itemsdir / scope.pagesizeitem)
                    if (scope.currentpage + 1 > data) {

                    } else {
                        scope.changepage(scope.currentpage + 1);
                    }
                }
                scope.prev = function () {
                    if (scope.currentpage - 1 > 0) {
                        scope.changepage(scope.currentpage - 1);
                    }
                }
            }
        }
    });

    app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });
     
                    event.preventDefault();
                }
            });
        };
    });

    app.directive('focusOn', function($timeout) {
        return function(scope, elem, attr) {
                elem[0].focus();
                elem[0].setAttribute('focused',"");
        };
    });
})();
(function() {
    Date.prototype.addHours = function (h) {
        this.setHours(this.getHours() + h);
        return this;
    };
    app.filter('DateTrick', function () {
        return function (input) {
            if (input !== null) {
                var DateCal = input.addHours(7);
                return DateCal;
            } else {
                return {};
            }
        }
    });

    app.filter('thaiDate', function () {
        return function (val) {
            if (val != undefined) {
                var d = new Date(val);
            } else
            {
                var d = new Date();
            }
            
            var month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
            var res = d.getDate() + " " + month[d.getMonth()] + " " + (d.getFullYear() + 543);
            return res;
        }
    });

    app.filter('thaiMount', function () {
        return function (val) {
            if (val != undefined) {
                var d = new Date(val);
            } else
            {
                var d = new Date();
            }
            
            var month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
            var res = month[d.getMonth()] + " " + (d.getFullYear() + 543);
            return res;
        }
    });
})();
(function () {
    app.factory('globalService', function ($http, $q) {
        var thisfact = {};

        thisfact.chkLogin = function (data) {
            spinner.show();
            var defer = $q.defer();
            $http({method: 'POST', url: '/login/chkLogin', data:data}).
                success(function (data) {
                    spinner.hide();
                    defer.resolve(data);
                }).
                error(function (err) {
                    spinner.hide();
                    defer.reject(err);
                });
            return defer.promise;
        };
        thisfact.clearSession = function () {
            spinner.show();
            var defer = $q.defer();
            $http({method: 'POST', url: '/login/clearSession'}).
                success(function (data) {
                    spinner.hide();
                    defer.resolve(data);
                }).
                error(function (err) {
                    spinner.hide();
                    defer.reject(err);
                });
            return defer.promise;
        };


        return thisfact;
    });
})();
(function(){
    app.controller('indexCtrl', function ($scope, $rootScope, $location, $routeParams, indexService) {
        console.log("HEL")
    });
})();
(function(){
    app.factory('indexService', function ($http, $q) {
        var thisfact = {};

        thisfact.getDashboardbyDay = function (data) {
            var defer = $q.defer();
            $http({method: 'POST', url: '/allureSchedule/getDashboardbyDay', data: data}).
                success(function (data) {

                    defer.resolve(data);
                }).
                error(function (err) {

                    defer.reject(err);
                });
            return defer.promise;
        };

        return thisfact;
    });
})();