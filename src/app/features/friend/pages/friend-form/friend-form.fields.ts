import { FieldConfig } from "../../../../shared/models/form/field-config";
import { FieldType } from "../../../../shared/models/form/field-type";
import { INFO_KEYS } from "../../models/Info";
import { CONTACT_KEYS } from "../../models/Contact";
import { PARENT_KEYS } from "../../models/Parent";

export const FRIEND_FIELDS: FieldConfig[] = [
  // Basic Info
  {
    key: INFO_KEYS.fullName,
    label: 'Full Name',
    type: FieldType.Text,
    placeholder: 'Enter full name',
    required: true,
    group: 'info'
  },
  {
    key: INFO_KEYS.nickName,
    label: 'Nickname',
    type: FieldType.Text,
    placeholder: 'Enter nickname',
    group: 'info'
  },
  {
    key: INFO_KEYS.birthDay,
    label: 'Birthday',
    type: FieldType.Date,
    group: 'info'
  },

  // Contact
  {
    key: CONTACT_KEYS.phone,
    label: 'Phone',
    type: FieldType.Tel,
    placeholder: 'Enter phone number',
    group: 'contact'
  },
  {
    key: CONTACT_KEYS.email,
    label: 'Email',
    type: FieldType.Email,
    placeholder: 'Enter email',
    group: 'contact'
  },
  {
    key: INFO_KEYS.address,
    label: 'Address',
    type: FieldType.Textarea,
    placeholder: 'Enter address',
    group: 'info'
  },
  {
    key: CONTACT_KEYS.fb,
    label: 'Facebook',
    type: FieldType.Text,
    placeholder: 'Facebook profile',
    group: 'contact'
  },
  {
    key: CONTACT_KEYS.ins,
    label: 'Instagram',
    type: FieldType.Text,
    placeholder: 'Instagram handle',
    group: 'contact'
  },

  // Education
  {
    key: INFO_KEYS.elementarySchool,
    label: 'Elementary School',
    type: FieldType.Text,
    group: 'info'
  },
  {
    key: INFO_KEYS.middleSchool,
    label: 'Middle School',
    type: FieldType.Text,
    group: 'info'
  },
  {
    key: INFO_KEYS.highSchool,
    label: 'High School',
    type: FieldType.Text,
    group: 'info'
  },
  {
    key: INFO_KEYS.university,
    label: 'University',
    type: FieldType.Text,
    group: 'info'
  },

  // Parent
  {
    key: PARENT_KEYS.father,
    label: 'Father Name',
    type: FieldType.Text,
    group: 'parent'
  },
  {
    key: PARENT_KEYS.mother,
    label: 'Mother Name',
    type: FieldType.Text,
    group: 'parent'
  },

  // Hobby
  {
    key: INFO_KEYS.hobby,
    label: 'Hobby',
    type: FieldType.Text,
    group: 'info'
  }
];
