import { createKeys } from "../../../shared/utils/key.util";

export interface Parent {
  father: string;
  mother: string;
}

export const PARENT_KEYS = createKeys<Parent>();