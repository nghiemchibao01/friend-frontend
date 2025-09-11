import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../models/form/field-config';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private formBuilder = inject(FormBuilder);

  /** Build FormGroup from field configs */
  buildFormGroup(fields: FieldConfig[]) {
    const group: any = {};
    fields.forEach(field => {
      if (field.group) {
        // nested group
        group[field.group] ??= this.formBuilder.group({});
        (group[field.group] as FormGroup).addControl(
          field.key,
          this.formBuilder.control('', field.required ? Validators.required : [])
        );
      } else {
        group[field.key] = [
          '',
          field.required ? Validators.required : [],
        ];
      }
    });
    return this.formBuilder.group(group);
  }

  /** Patch nested data */
  patchForm(form: FormGroup, data: any) {
    if (form && data) {
      form.patchValue(data, { emitEvent: false });
    }
  }

  /** Convert form back to typed model */
  toModel<T>(form: FormGroup): T {
    return form.getRawValue() as T;
  }
}
