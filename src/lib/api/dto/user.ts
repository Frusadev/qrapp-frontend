export interface UserDTO {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  verified: boolean;
  credits: number;
  avatar_id?: string;
}
