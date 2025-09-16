import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FieldConfig } from '../models/form/field-config';
import { FieldType } from '../models/form/field-type';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private formBuilder = inject(FormBuilder);

  /** Build FormGroup from field configs */
  buildFormGroup(fields: FieldConfig[]) {
    const root: FormGroup = this.formBuilder.group({});

    for (const field of fields) {
      const validators: ValidatorFn[] = [...(field.validators || [])];
      if (field.required) {
        validators.push(Validators.required);
      }

      const ensureGroup = (groupName: string) => {
        const existing = root.get(groupName) as FormGroup | null;

        if (existing && existing instanceof FormGroup) return existing;

        const newGroup = this.formBuilder.group({});
        root.addControl(groupName, newGroup);
        return newGroup;
      }
      const group: FormGroup = field.group ? ensureGroup(field.group) : root;
      if (field.type === FieldType.CheckboxGroup) {
        this.addControl(group, field.key, this.createCheckboxFormArray(field));
      }
      else if (field.type === FieldType.Checkbox) {
        const initial = typeof field.value === 'boolean' ? field.value : false;
        this.addControl(group, field.key, new FormControl(initial, validators));
      }
      else {
        this.addControl(group, field.key, new FormControl(field.value ?? null, validators));
      }
    }
    return root;
  }

  private addControl(
    target: FormGroup,
    name: string,
    control: FormControl | FormArray,
    validators?: ValidatorFn[]
  ) {
    if (target.get(name)) {
      console.warn(`[FormService] Control with name '${name}' already exists in the target group.`);
      return;
    }
    if (validators && control instanceof FormControl) {
      control.setValidators(validators);
    }
    target.addControl(name, control);
  }

  private createCheckboxFormArray(field: FieldConfig): FormArray {
    const options = field.options ?? [];

    const initialBooleans: boolean[] = options.map(opt => {
      if (Array.isArray(field.value)) {
        // typical: value is array of selected option values
        return (field.value as any[]).includes(opt.value);
      }
      // maybe value is a single value (rare) => match equality
      if (field.value !== undefined && field.value !== null) {
        return field.value === opt.value;
      }
      return false;
    });

    const controls = initialBooleans.map(b => new FormControl(b));
    return this.formBuilder.array(controls);
  }

  /** Patch nested data */
  patchForm(form: FormGroup, data: any, fields?: FieldConfig[]) {
    if (!data) return;

    // if we have fields metadata, we can specially patch checkbox-groups
    if (fields) {
      for (const field of fields) {
        const targetPath = field.group ? [field.group, field.key] : [field.key];
        const control = form.get(targetPath);
        if (!control) continue;

        if ((field.type === FieldType.CheckboxGroup)
          && Array.isArray(data[field.group ? field.group : field.key])) {
          // If data is nested (grouped), get data[group][key] or data[key]
          const rawVal = field.group ? data[field.group]?.[field.key] : data[field.key];
          const arr = control as FormArray;
          const opts = field.options ?? [];
          const selected: any[] = Array.isArray(rawVal) ? rawVal : [];
          arr.controls.forEach((c, i) => c.setValue(selected.includes(opts[i].value)));
        } else {
          // normal patch
          const patchValue = field.group ? data[field.group]?.[field.key] : data[field.key];
          if (patchValue !== undefined) {
            control.setValue(patchValue);
          }
        }
      }
      return;
    }
    // fallback: simple patch
    form.patchValue(data);
  }

  /** Convert form back to typed model */
  toModel<T>(form: FormGroup): T {
    return form.getRawValue() as T;
  }

  getCheckboxGroupValue<T = any>(form: FormGroup, field: FieldConfig): T[] {
    const values = form.get(field.key) as FormArray;
    return (values.value as boolean[])
      .map((checked, i) =>
        checked ? (field.options?.[i].value as T) : null
      )
      .filter((v): v is T => v !== null);
  }
}
