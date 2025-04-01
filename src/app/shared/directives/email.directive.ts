import { Directive, OnChanges, SimpleChanges } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true
    }]
})
export class EmailValidatorDirective implements Validator, OnChanges {
    private onChange?: () => void;

    ngOnChanges(changes: SimpleChanges): void {
        if (this.onChange) {
            this.onChange();
        }
    }

    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return value && !emailPattern.test(value)
        ? { invalidEmail: true }
        : null;
    }

    registerOnValidatorChange?(fn: () => void): void {
        this.onChange = fn;
    }
    // Add your code here
}
