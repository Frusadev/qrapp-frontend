import ky from "ky";
import type {
  AccessCodeCreationDTO,
  AccessCodeDTO,
  AccessCodePasswordSetDTO,
  AccessCodeRequestDTO,
  AccessCodeViewDTO,
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

export async function getAccessCodeCost(ac_type: "basic" | "secure") {
  const request = ky
    .get<number>(`${API_URL}/access-code/costs/`, {
      credentials: "include",
      searchParams: {
        ac_type: ac_type,
      },
    })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}

export async function generateAccessCode({
  accessType,
  data,
}: { accessType: "basic" | "secure"; data: AccessCodeCreationDTO }) {
  const request = ky
    .post<MessageResponse>(`${API_URL}/access-code`, {
      credentials: "include",
      searchParams: {
        access_type: accessType,
      },
      json: data,
    })
    .json();
  const [response, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return response;
}

export async function deleteAccessCode(accessCodeId: string) {
  const request = ky
    .delete<MessageResponse>(`${API_URL}/access-code/${accessCodeId}`, {
      credentials: "include",
    })
    .json();
  const [response, error] = await resolveRequest(request);
  if (error) {
    return error;
  }
  return response;
}


export async function requestViewAccessCode(requestData: AccessCodeRequestDTO) {
  const request = ky.post<MessageResponse>(
    `${API_URL}/access-code/access`, {
      json: requestData,
      credentials: "include",
    }
  ).json()
  const [response, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return response;
}

export async function getAccessedAccessCodes() {
  const request = ky
    .get<AccessCodeDTO[]>(`${API_URL}/access-codes/accessed`, {
      credentials: "include",
    })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}
