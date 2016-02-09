import {Component} from "angular2/core";
import {TodoService} from "./todo-service";
import {TodoModel} from "./todo-model";
@Component({
    selector : "todo-input",
    template : `
    <div>
        <form (submit)="onClick($event,elementInput.value)">
        Search : <input type='text' #elementInput [(ngModel)]="todoModel.title"/>
        <span class='btn btn-primary' (click)='onClick($event,elementInput.value)' >OK</span>
        </form>
        <span class="label label-default">{{ todoModel.title }}</span>
    </div>
    `
})
export class TodoInput {
    todoModel: TodoModel = new TodoModel("Default");
    constructor(public todoService: TodoService) {}
    onClick (event, value) {
        this.todoService.todos.push(this.todoModel);
        this.todoModel = new TodoModel("Default");
        // console.log(event , value);
        // console.log(this.todoService);
    }
}
