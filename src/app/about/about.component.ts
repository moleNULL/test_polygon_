import {Component} from "@angular/core";

@Component({
    selector: "about-app",
    standalone: true,
    template: "<h2>About site</h2>"
})
export class AboutComponent {
    public saved: boolean = false;

    public save() {
        this.saved = true;
    }
}