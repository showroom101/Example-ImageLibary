/**
 * Created by Worawut on 12/1/2559.
 */
export class TodoModel {
    public status: string = "started";
    public title: string = "";
    constructor(title: string) {
        this.title = title;
    };
}
