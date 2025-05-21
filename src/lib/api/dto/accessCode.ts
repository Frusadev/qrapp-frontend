import type { InfofieldDTO } from "./infofield";
import type { UserDTO } from "./user";

export interface AccessCodePasswordSetDTO {
  password: string;
  password_confirm: string;
}

export interface AccessCodeCreationDTO {
  field_ids: string[]; // UUIDs as strings
}

export interface AccessCodeRequestDTO {
  access_code_id: string;
  password: string;
}

export interface AccessCodeViewDTO {
  user: UserDTO;
}

export interface AccessCodeDTO {
  access_code_id: string;
  proprietary: UserDTO;
  activated: boolean;
  created_at: string; // ISO 8601 date string
  qrcode_resource_id?: string; // optional UUID as string
  info_fields: InfofieldDTO[];
  accessed_by: UserDTO[];
}
