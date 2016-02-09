describe("Controller Test",function() {
    describe("globalCtrl Test", function () {
        beforeEach(module("MainApp"));
        var globalCtrl,
            scope,
            timeout,
            $httpBackend,
            GlobalService,
            rootScope,
            window = { location : { reload : function(){}} };
        beforeEach(inject(function ($rootScope, $controller, $q, $timeout, globalService, $injector) {
            GlobalService = globalService;
            scope = $rootScope.$new();
            rootScope = $rootScope.$new();
            globalCtrl = $controller("globalCtrl", {
                $scope: scope,
                $rootScope : rootScope,
                globalService: globalService,
                $window: window
            });
            deferred = $q.defer();
            timeout = $timeout;
            $httpBackend = $injector.get('$httpBackend');
        }));

        it("Login submit should be work on post.", function () {
            var obj = {};
            obj.email = "pariwat@theiconweb.com";
            obj.password = "1234";

            var result = {};
            result.status = true;
            result.Menu = 'have menu';

            $httpBackend.expectPOST('/login/chkLogin', obj).respond(200, result);
            $httpBackend.expectPOST('/login/chkLoginSession', undefined).respond(200, result);
            $httpBackend.expectGET('/views/home/index.html').respond(200, result);
            scope.loginsubmit(obj);
            $httpBackend.flush();
            expect(rootScope.loginform).toEqual(false);
            expect(rootScope.Allmenu).toEqual(result.Menu);
        });

        it("Login not success wrong passwords.", function () {
            var obj = {};
            obj.email = "pariwat@theiconweb.com";
            obj.password = "12341111";

            var result = {};
            result.status = false;

            $httpBackend.expectPOST('/login/chkLogin', obj).respond(200, result);
            $httpBackend.expectPOST('/login/chkLoginSession', undefined).respond(200, result);
            $httpBackend.expectGET('/views/home/index.html').respond(200, result);
            scope.loginsubmit(obj);
            $httpBackend.flush();
            expect(rootScope.loginform).toEqual(true);
        });

        it("Logout must be clear session",function(){

            var obj = undefined;
            var result = "END";

            $httpBackend.expectPOST('/login/clearSession', obj).respond(200, result);
            $httpBackend.expectPOST('/login/chkLoginSession', undefined).respond(200, result);
            $httpBackend.expectGET('/views/home/index.html').respond(200,result);
            scope.logout(obj);
            $httpBackend.flush();
            expect(rootScope.loginform).toEqual(false);
        });

    });
});