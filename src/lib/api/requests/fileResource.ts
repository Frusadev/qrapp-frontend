import { API_URL } from "@/lib/config/env";
import { resolveRequest } from "../utils";
import ky from "ky";

export async function getFileURL(resourceId?: string) {
  const request = ky
    .get(`${API_URL}/resources/files/${resourceId}`, {
      credentials: "include",
    })
    .blob();
  const [blob, error] = await resolveRequest(request);
  if (error) {
    throw new Error(error.detail);
  }
  return URL.createObjectURL(blob);
}
