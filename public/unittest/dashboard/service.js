describe("Service Test", function() {
    describe("dashboardService Test", function() {
        beforeEach(module("MainApp"));
        var GlobalService;

        beforeEach(inject(function ($rootScope, $controller, $q, $timeout, globalService) {
            GlobalService = globalService;
        }));

        it('should contain a globalService', inject(function () {
            expect(GlobalService).not.toEqual(null);
        }));
    });
});