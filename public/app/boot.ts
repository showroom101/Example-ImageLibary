import {bootstrap} from "angular2/platform/browser";
import {AppComponent} from "./global/app.component";
import {TodoService} from "./sampleComponent/todo-service";

bootstrap(AppComponent, [TodoService]);