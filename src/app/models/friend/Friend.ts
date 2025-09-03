import { Contact } from "./Contact";
import { Info } from "./Info";  
import { Parent } from "./Parent";

export interface Friend {
  id: number;
  info: Info;
  contact: Contact;
  parent: Parent;
}