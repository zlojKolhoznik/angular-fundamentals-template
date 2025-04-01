import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (typeof value !== 'number') {
            value = +value;
        }

        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return `${this.formatDurationPart(hours)}:${this.formatDurationPart(minutes)} Hours`;
    }

    private formatDurationPart(value: number): string {
        if (value < 10) {
            return `0${value}`;
        }

        return value.toString();
    }
}
