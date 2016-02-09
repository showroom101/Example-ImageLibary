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