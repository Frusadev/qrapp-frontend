export interface UserDTO {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  verified: boolean;
  credits: number;
  avatar_id?: string;
}

export interface EditUserDTO {
  first_name?: string;
  last_name?: string;
  avatar_id?: string; // UUIDs are usually represented as strings in TypeScript
}
