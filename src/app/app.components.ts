import { Component, OnInit, OnDestroy } from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MyCalculatorComponent} from "./my-calculator/my-calculator.component";
import {TutorialComponent} from "./tutorial/tutorial.component";
import {LogService} from "./tutorial/log.service";
import {DataService} from "./tutorial/data.service";
import {
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    LowerCasePipe, NgClass,
    NgForOf, NgIf,
    PercentPipe,
    SlicePipe,
    UpperCasePipe
} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpService} from "./services/http.service";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {FormatPipe} from "./pipes/format.pipe";
import {JoinPipe} from "./pipes/join.pipe";
import {interval, map, Observable} from "rxjs";
import {UserService} from "./services/user.service";
import {User} from "../assets/models/user";

@Component({
    selector: "my-app",
    standalone: true,
    providers: [LogService, DataService, HttpService, UserService],
    templateUrl: './app.components.html',
    styleUrls: ['./app.components.css'],
    imports: [
        MyCalculatorComponent,
        TutorialComponent,
        FormsModule,
        NgForOf,
        ReactiveFormsModule,
        HttpClientModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        DatePipe,
        UpperCasePipe,
        LowerCasePipe,
        PercentPipe,
        CurrencyPipe,
        SlicePipe,
        FormatPipe,
        JoinPipe,
        AsyncPipe,
        NgClass,
        NgIf,
    ],
})
export class AppComponent implements OnInit{
    public num1: number = 0;
    public num2: number = 0;
    public result: number = 0;

    public isLoading: boolean = false;

    public user: User = new User(0, "", 0);
    public modifiedUser: User;
    public isDone: boolean = false;

    public number: number = 1;
    public product: string = "";
    public price: number = 100;

    public myDate = new Date(1997, 1, 11);
    public welcome: string = "Hello, World!";
    public percentage: number = 0.14;

    public users: string[] = ["Tom", "Alice", "Sam", "Kate", "Bob"];

    public phones: string[] = ["iPhone 15 Pro", "Xiaomi 14 Pro", "Infinix NOTE 30", "Samsung Galaxy A24", "realme C53"];
    public phone: Observable<string> | undefined;

    public pusers: Observable<User[]> | undefined;

    constructor(private httpService: HttpService, private router: Router, public authService: AuthService, private _userService: UserService)
    {
    }

    ngOnInit() {
        this.pusers = this.httpService.getUsers();
        this.getUsers();
    }

    public calc() {
        this.isLoading = true;

        this.httpService.get(this.num1, this.num2)
            .subscribe((data: number) => {
                this.result = data;
                this.isLoading = false;
            });
    }

    public send() {
        this.isDone = false;

        this.httpService.postData(this.user)
            .subscribe((data: User) => {
                this.modifiedUser = data;
                this.isDone = true;
            });
    }

    public goToProduct() {
        this.router.navigate(["/item", this.number], {queryParams: {"product": this.product, "price": this.price}});
    }

    public performAuth() {
        if (this.authService.isLoggedIn) {
            this.authService.logout();
        } else {
            this.authService.login();
        }
    }

    public showPhones() {
        this.phone = interval(500).pipe(map((i: number) => this.phones[i]));
    }



    /**/

    public myUsers: User[] = [];
    public userName: string = "";
    public userAge: number = 0;

    public getUsers() {
        this._userService.getUsers().subscribe((data: User[]) => this.myUsers = data);
        /*this.myUsers = [
            new User(1, "Tom", 23),
            new User(2, "Alice", 25),
            new User(3, "Sam", 28),
            new User(4, "Kate", 21),
            new User(5, "Bob", 30)
        ];*/
    }

    public hideFlag: boolean = true;
    public editUserId: number | null = null;

    public add() {
        this.hideFlag = !this.hideFlag;
    }

    public addUser() {
        if (this.myUsers.length !== 0) {
            const lastId: number = (this.myUsers[this.myUsers.length - 1].id) + 1;

            this._userService.createUser(new User(lastId, this.userName, this.userAge)).subscribe((data: User) => {
                this.myUsers.push(data);
            });

        }
    }

    public edit(id: number) {
        this.editUserId = id;
    }

    public cancel() {
        this.editUserId = null;
    }

    public saveEditedUser(id: number) {
        const modifiedUser: User = this.myUsers.find(u => u.id === id);
        this._userService.updateUser(modifiedUser)
            .subscribe((data: User) => {
                this.myUsers = this.myUsers.map(u => u.id === id ? data : u);
                this.editUserId = null;
            });
    }

    public deleteUser(id: number) {
        this._userService.deleteUser(id)
            .subscribe(() => this.myUsers = this.myUsers.filter(u => u.id !== id));
    }
}