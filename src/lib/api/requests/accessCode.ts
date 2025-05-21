import ky from "ky";
import type {
  AccessCodeDTO,
  AccessCodePasswordSetDTO,
} from "../dto/accessCode";
import { API_URL } from "@/lib/config/env";
import { resolveRequest } from "../utils";
import type { MessageResponse } from "../dto/message";

export async function getAccessCodes() {
  const request = ky
    .get<AccessCodeDTO[]>(`${API_URL}/access-codes`, {
      credentials: "include",
    })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}

export async function setAccessCodePassword({
  token,
  pwdData,
}: {
  token?: string;
  pwdData: AccessCodePasswordSetDTO;
}) {
  const request = ky
    .post<MessageResponse>(`${API_URL}/access-code/pwd-set/${token}`, {
      json: pwdData,
      credentials: "include",
    })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}

export async function authorizeAccessCode({
  requestId,
}: { requestId: string }) {
  const request = ky
    .post<MessageResponse>(`${API_URL}/access-code/grant/${requestId}`, {
      credentials: "include",
    })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}
