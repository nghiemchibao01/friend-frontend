// field-type.ts
export const FieldType = {
  Text: 'text',
  Textarea: 'textarea',
  Email: 'email',
  Tel: 'tel',
  Number: 'number',
  Date: 'date',
  Select: 'select',
  RadioGroup: 'radio-group',
  Checkbox: 'checkbox',
  CheckboxGroup: 'checkbox-group',
  Password: 'password',
} as const;

export type FieldType = (typeof FieldType)[keyof typeof FieldType];
