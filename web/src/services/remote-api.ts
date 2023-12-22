import { fetchWrapper } from "@/utils/fetchWrapper";

export const remoteApi = async <T = unknown>(
  input: URL | RequestInfo,
  init?: RequestInit | undefined
) => await fetchWrapper<T>(process.env.NEXT_PUBLIC_API_URL as string, input, init);
