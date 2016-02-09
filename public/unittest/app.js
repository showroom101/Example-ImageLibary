var spinner = {
    show : function(){},
    hide : function(){}
};

var methodCallBack =  function(){
    console.log("HELLO AM SWAL MOCK");
};
var methodVariable = {};
function swal(variable,cb){
    methodVariable = variable;
    methodCallBack = cb;
};


describe('App Test', function () {
    var $route;
    beforeEach(function () {
        module('MainApp');
        inject(function (_$route_) {
            $route = _$route_;
        });
    });

    it('should map routes to many controllers', function () {
        expect($route.routes['/'].controller).toBe('indexCtrl');
        expect($route.routes['/'].templateUrl).toEqual('/views/home/index.html');

        expect($route.routes['/team'].controller).toBe('teamCtrl');
        expect($route.routes['/team'].templateUrl).toEqual('/views/team/team.html');

        expect($route.routes['/teammapping'].controller).toBe('teammappingCtrl');
        expect($route.routes['/teammapping'].templateUrl).toEqual('/views/team/teammapping.html');

        expect($route.routes['/employee'].controller).toBe('employeeCtrl');
        expect($route.routes['/employee'].templateUrl).toEqual('/views/employee/employee.html');

        expect($route.routes['/department'].controller).toBe('departmentCtrl');
        expect($route.routes['/department'].templateUrl).toEqual('/views/department/department.html');

        expect($route.routes['/position'].controller).toBe('positionCtrl');
        expect($route.routes['/position'].templateUrl).toEqual('/views/position/position.html');

        expect($route.routes['/status'].controller).toBe('statusCtrl');
        expect($route.routes['/status'].templateUrl).toEqual('/views/status/status.html');

        expect($route.routes['/dashboard'].controller).toBe('dashboardCtrl');
        expect($route.routes['/dashboard'].templateUrl).toEqual('/views/dashboard/dashboard.html');

        expect($route.routes['/customer/?:gradeType'].controller).toBe('dashboardCtrl');
        expect($route.routes['/customer/?:gradeType'].templateUrl).toEqual('/views/dashboard/dashboardCustomer.html');

        expect($route.routes['/getcustomerbymonth'].controller).toBe('dashboardCtrl');
        expect($route.routes['/getcustomerbymonth'].templateUrl).toEqual('/views/dashboard/werbSiteSelectMonth.html');

        expect($route.routes['/facebookAddfund'].controller).toBe('facebookCtrl');
        expect($route.routes['/facebookAddfund'].templateUrl).toEqual('/views/facebook/facebookAddfund.html');

        expect($route.routes['/facebookAddfundDetail/?:idAddfund'].controller).toBe('facebookCtrl');
        expect($route.routes['/facebookAddfundDetail/?:idAddfund'].templateUrl).toEqual('/views/facebook/facebookAddfundDetail.html');

        expect($route.routes['/facebooklist/?:paramtype'].controller).toBe('facebookCtrl');
        expect($route.routes['/facebooklist/?:paramtype'].templateUrl).toEqual('/views/facebook/facebookAddfundList.html');

        //expect($route.routes['/phones/:phoneId'].templateUrl).
        //    toEqual('partials/phone-detail.html');
        //expect($route.routes['/phones/:phoneId'].controller).
        //    toEqual('PhoneDetailCtrl');
        //
        //// otherwise redirect to
        //expect($route.routes[null].redirectTo).toEqual('/phones')
    });

    it('can get an instance of my mainAuthentication', inject(function(mainAuthentication) {
        expect(mainAuthentication).toBeDefined();
    }));
    
});