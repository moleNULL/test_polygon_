import {Injectable, Optional} from "@angular/core";
import {LogService} from "./log.service";

@Injectable()
export class DataService {
    private data: string[] = ["Tom", "Sam", "John"];

    constructor(@Optional() private logService: LogService) {
    }

    public getData(): string[] {
        if (this.logService) {
            this.logService.write("Data was fetched");
            console.log(this.logService);
        }

        return this.data;
    }

    public addData(name: string): void {
        if (this.logService) {
            this.logService.write("Data will be added");
        }

        this.data.push(name);
    }
}