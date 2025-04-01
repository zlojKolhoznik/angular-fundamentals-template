import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (typeof value !== 'number') {
            throw new Error('Invalid value type. Expected a number.');
        }

        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return `${hours}:${minutes} Hours`;
    }
}
