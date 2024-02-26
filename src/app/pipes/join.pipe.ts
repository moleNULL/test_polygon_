import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "join",
    standalone: true,
    pure: false,
})
export class JoinPipe implements PipeTransform {
    transform(value: string[], start?: number, end?: number): string {
        if (start) {
            if (end) {
                return value.slice(start, end).join(", ");
            } else {
                return value.slice(start).join(", ");
            }
        }

        return value.join(", ");
    }
}