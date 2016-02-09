System.register([], function(exports_1) {
    var TodoModel;
    return {
        setters:[],
        execute: function() {
            TodoModel = (function () {
                function TodoModel(title) {
                    this.status = "started";
                    this.title = "";
                    this.title = title;
                }
                ;
                return TodoModel;
            })();
            exports_1("TodoModel", TodoModel);
        }
    }
});
//# sourceMappingURL=todo-model.js.map