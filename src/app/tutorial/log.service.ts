import {Injectable} from "@angular/core";

@Injectable()
export class LogService {
    public write(logMessage: string) {
        console.log(logMessage);
    }
}