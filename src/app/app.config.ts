import {provideRouter, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {ApplicationConfig} from "@angular/core";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ItemComponent} from "./item/item.component";
import {ItemDetailsComponent} from "./item/item-details/item.details.component";
import {ItemStatComponent} from "./item/item-stat/item.stat.component";
import {aboutGuard} from "./guards/about.guard";
import {exitAboutGuard} from "./guards/exit.about.guard";


const itemRoutes: Routes = [
    {path: "details", component: ItemDetailsComponent},
    {path: "stat", component: ItemStatComponent},
];

const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "about", component: AboutComponent, canActivate: [aboutGuard], canDeactivate: [exitAboutGuard]},
    {path: "contact", redirectTo: "/about", pathMatch: "full"},
    {path: "item/:id", component: ItemComponent, children: itemRoutes},
    {path: "**", component: NotFoundComponent},
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(appRoutes)]
}