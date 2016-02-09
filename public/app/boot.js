System.register(["angular2/platform/browser", "./global/app.component", "./sampleComponent/todo-service"], function(exports_1) {
    var browser_1, app_component_1, todo_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [todo_service_1.TodoService]);
        }
    }
});
//# sourceMappingURL=boot.js.map