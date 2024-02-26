import { Component } from '@angular/core';
import {NgClass, NgFor, NgIf, NgStyle, NgSwitchCase} from "@angular/common";
import {BoldDirective} from "../directives/bold.directive";

import {FormsModule} from "@angular/forms";
import {DataService} from "./data.service";

@Component({
    selector: 'tutorial',
    standalone: true,
    imports: [NgFor, NgSwitchCase, FormsModule],
    template: `
        <div>
            <input type="text" [(ngModel)]="name">
            <button (click)="addData(name)">Add</button>
        </div>
    <div>
        <ul>
            @for(item of items; track $index){
                <li>{{item}}</li>
            }
        </ul>
    </div>`,
})
export class TutorialComponent {
    public name: string = "";
    public items: string[] = [];

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.items = this.dataService.getData();
    }

    public addData(name: string) : void {
        this.dataService.addData(name);
    }
}