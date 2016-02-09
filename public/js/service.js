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