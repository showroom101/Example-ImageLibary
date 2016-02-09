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