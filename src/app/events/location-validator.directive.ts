import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
	selector: '[validateLocation]',
	providers: [{ provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true }] // register the validator to Angular's list of validators
})
export class LocationValidator implements Validator {
	validate(formGroup: FormGroup): { [key: string]: any } {
		let addressControl = formGroup.controls['address'];
		let cityControl = formGroup.controls['city'];
		let countryControl = formGroup.controls['country'];
		// (<FormGroup>formGroup.root) : cast formGroup.root to FormGroup type. Like with ((FormGroup)formGroup.root) in C#
		let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

		if ((addressControl && addressControl.value && 
			cityControl && cityControl.value && 
			countryControl && countryControl.value) 
			|| (onlineUrlControl && onlineUrlControl.value)) {
				// everything is valid, return null
				return null;
		}

		// invalid location
		return { validateLocation: false }
	}
}