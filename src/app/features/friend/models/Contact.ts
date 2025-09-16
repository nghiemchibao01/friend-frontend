import { createKeys } from "../../../shared/utils/key.util";

export interface Contact {
    fb: string;
    ins: string;
    phone: string;
    email: string;
}

export const CONTACT_KEYS = createKeys<Contact>();