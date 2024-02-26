import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {User} from "../../assets/models/user";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) {}

    public getUsers(): any {
        return this.http.get("assets/data.json");
    }

    public get(num1: number, num2: number) : Observable<number> {
        const params = new HttpParams()
            .set("num1", num1.toString())
            .set("num2", num2.toString());

        return this.http.get("http://localhost:5000/sum", {params: params})
            .pipe(
                map((data: any) => data),
                catchError(error => {
                    alert(JSON.stringify(error));
                    return [];
                }));
    }

    public postData(user: User): Observable<User> {
        const myHeaders = new HttpHeaders().set("Accept", "application/xml");
        const body = {name: user.name, age: user.age};
        return this.http.post("http://localhost:5000/postuser", body)
            .pipe(
                map((data: any) => data),
                catchError(error => {
                    alert(JSON.stringify(error));
                    return [];
                }));
    }
}