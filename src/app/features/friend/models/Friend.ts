import { createKeys } from "../../../shared/utils/key.util";
import { Contact } from "./Contact";
import { Info } from "./Info";  
import { Parent } from "./Parent";

export interface Friend {
  id: number;
  info: Info;
  contact: Contact;
  parent: Parent;
}

export const FRIEND_KEYS = createKeys<Friend>();