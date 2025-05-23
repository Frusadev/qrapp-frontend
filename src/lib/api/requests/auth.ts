import ky from "ky";
import type {
  LoginPayload,
  OTPVerificationPayload,
  RegisterPayload,
} from "../dto/auth";
import { API_URL } from "@/lib/config/env";
import { resolveRequest } from "../utils";
import type { MessageResponse } from "../dto/message";

export async function register(payload: RegisterPayload) {
  const request = ky
    .post<MessageResponse>(`${API_URL}/auth/register`, {
      json: payload,
      credentials: "include",
    })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}

export async function login(payload: LoginPayload) {
  const request = ky
    .post<MessageResponse>(`${API_URL}/auth/login`, {
      json: payload,
      credentials: "include",
    })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}

export async function verifyOTP(payload: OTPVerificationPayload) {
  const request = ky
    .post<MessageResponse>(`${API_URL}/auth/login/verify-otp`, {
      json: payload,
      credentials: "include",
    })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}

export async function isAuthenticated() {
  const request = ky
    .get<boolean>(`${API_URL}/auth/authenticated`, {
      credentials: "include",
    })
    .json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}

export async function logout() {
  const request = ky.post<MessageResponse>(`${API_URL}/auth/logout`, {
    credentials: "include",
  }).json();
  const [data, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return data;
}
