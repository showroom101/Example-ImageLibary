import {Component} from "angular2/core";
import {TodoInput} from "../sampleComponent/todo-input";
import {TodoList} from "../sampleComponent/todo-list";

@Component({
    selector: "my-app",
    directives : [TodoInput, TodoList],
    template: `
        <div>
            <todo-input></todo-input>
            <todo-list></todo-list>
        </div>
    `
})
export class AppComponent {};