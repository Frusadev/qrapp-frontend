import ky from "ky";
import type { UserDTO } from "../dto/user";
import { API_URL } from "@/lib/config/env";
import { resolveRequest } from "../utils";
import type { MessageResponse } from "../dto/message";

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

export async function updloadProfilePicture(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const request = ky
    .put<UserDTO>(`${API_URL}/me/profile-picture`, {
      credentials: "include",
      body: formData,
    })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}

