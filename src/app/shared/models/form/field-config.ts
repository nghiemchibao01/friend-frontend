import { ValidatorFn } from "@angular/forms";
import { FieldOption } from "./field-option";
import { FieldType } from "./field-type";

export interface FieldConfig {
  key: string;                 // formControlName
  label: string;               // label text
  type: FieldType;             // input type
  group?: string;              // optional formGroupName
  value?: any;                 // default value
  options?: FieldOption[];     // for select, checkbox-group
  placeholder?: string;
  required?: boolean;          // quick validation
  validators?: ValidatorFn[];  // Angular validators
}