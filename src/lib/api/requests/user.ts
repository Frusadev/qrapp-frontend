import ky from "ky";
import type { UserDTO } from "../dto/user";
import { API_URL } from "@/lib/config/env";
import { resolveRequest } from "../utils";

export async function getCurrentUser() {
  const request = ky
    .get<UserDTO>(`${API_URL}/me`, { credentials: "include" })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}
