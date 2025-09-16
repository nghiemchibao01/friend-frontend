import { createKeys } from "../../../shared/utils/key.util";

export interface Info {
  fullName: string;
  nickName: string;
  birthDay: string;
  address: string;
  hobby: string;
  elementarySchool: string;
  middleSchool: string;
  highSchool: string;
  university: string;
}

export const INFO_KEYS = createKeys<Info>();