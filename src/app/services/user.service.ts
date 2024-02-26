import {Injectable} from "@angular/core";
import {User} from "../../assets/models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable()
export class UserService {
    private _url: string = "http://localhost:5182/api/users";

    constructor(private _http: HttpClient) {}

    public getUsers(): Observable<User[]> {
        return this._http.get<User[]>(this._url);
    }

    public createUser(user: User) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.post(this._url, JSON.stringify(user), {headers: myHeaders})
            .pipe(
                catchError(error => {
                    console.error('Error during POST request:', error);
                    throw error;
                })
            );
    }

    public updateUser(user: User) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.put<User>(this._url + "/" + user.id, JSON.stringify(user), {headers: myHeaders});
    }

    public deleteUser(id: number) {
        return this._http.delete<User>(this._url + "/" + id);
    }
}