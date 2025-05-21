import { API_URL } from "@/lib/config/env";
import ky from "ky";
import { resolveRequest } from "../utils";
import type { InfofieldDTO, InfofieldCreationDTO } from "../dto/infofield";
import type { MessageResponse } from "../dto/message";

export async function getInfofields() {
  const request = ky
    .get<InfofieldDTO[]>(`${API_URL}/infofields`, { credentials: "include" })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}

export async function createInfofield(infofield: InfofieldCreationDTO) {
  const request = ky
    .post<InfofieldDTO>(`${API_URL}/infofield`, {
      json: infofield,
      credentials: "include",
    })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}

export async function deleteInfofield(id: string) {
  const request = ky
    .delete<MessageResponse>(`${API_URL}/infofield/${id}`, {
      credentials: "include",
    })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}
