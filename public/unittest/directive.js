describe('Directive Test', function () {
    beforeEach(module("MainApp"));
    var scope;
    var element;
    var globalCtrl;
    var compile;
    beforeEach(inject(function ($rootScope, $controller , $compile) {
        scope = $rootScope.$new();
        compile = $compile;
        globalCtrl = $controller("globalCtrl", { $scope: scope });
        element = angular.element('<directive-sample ng-model="directiveTest"></directive-sample>');
        $compile(element)(scope);
        scope.$digest();
    }));

    it('directiveTest should create my directive', inject(function() {
        expect(element.text()).toBe('HELLO WORLD');
    }));

    it('focus-on should create my directive', inject(function($timeout,$compile){
        var elementText = angular.element('<input id="inputTest" type="text" name="email" placeholder="E-mail address" focus-on ng-model="$root.login.email">');
        $compile(elementText)(scope);
        scope.$digest();
        // ต้องให้ JQLite
        expect(elementText[0].hasAttribute("focused")).toBe(true);
        //elem[0].setAttribute('focused',"");
        //spyOn(elementText[0],'focus');
        //$timeout.flush();
        //expect(elementText[0].focus).toHaveBeenCalled();
    }));
});