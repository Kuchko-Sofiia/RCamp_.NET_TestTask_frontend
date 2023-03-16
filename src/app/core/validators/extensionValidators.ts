import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function docxFileExtensionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const file = control.value;
        if (!file) {
            return null;
        }
        const extension = file.split('.').pop();
        return extension !== 'docx' ? { invalidExtension: true } : null;
    }
}