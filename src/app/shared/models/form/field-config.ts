import { FieldOption } from "./field-option";
import { FieldType } from "./field-type";

export interface FieldConfig {
  key: string;                // formControlName
  label: string;              // label text
  type: FieldType;            // input type
  group?: string;             // optional formGroupName
  options?: FieldOption[];    // for select, checkbox-group
  placeholder?: string;
  required?: boolean;
}