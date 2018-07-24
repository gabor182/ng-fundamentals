import { FormControl } from "@angular/forms";

// A function that returns a function!
export function restrictedWords(words: string[]) {
	return (control: FormControl): {[key: string]: any} => {
		if (!words) return null;
		
		var invalidWords = words.map(w => control.value.includes(w) ? w : null).filter(w => w != null);

		return invalidWords.length > 0 ? {'restrictedWords': invalidWords.join(', ')} : null;
	}
}