import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (!(value instanceof Date)) {
            value = new Date(value);
        }

        var day = value.getDate();
        var month = value.getMonth() + 1; // Months are zero-based
        var year = value.getFullYear();
        return `${this.formatDatePart(day)}.${this.formatDatePart(month)}.${year}`;
    }

    formatDatePart(part: number): string {
        return part < 10 ? '0' + part : part.toString();
    }
}
