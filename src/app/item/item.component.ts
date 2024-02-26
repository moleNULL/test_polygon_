import {Component} from "@angular/core";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: "item-info",
    template: `
        <h2>Model: {{ id }}</h2>
        <h3>Product: {{ product }}</h3>
        <h3>Price: {{ price }}</h3>
        <router-outlet></router-outlet>
    `,
    standalone: true,
    imports: [
        RouterOutlet
    ]
})
export class ItemComponent {
    public id: number | undefined;
    public product: string;
    public price: number;

    constructor(private activeRoute: ActivatedRoute) {
        activeRoute.params.subscribe(params => this.id = params["id"]);
        activeRoute.queryParams.subscribe(params => {
           this.product = params["product"];
           this.price = params["price"];
        });
    }
}