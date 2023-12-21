import { fetchWrapper } from "@/utils/fetchWrapper";

export const localApi = async <T = unknown>(
  input: URL | RequestInfo,
  init?: RequestInit | undefined
) => fetchWrapper<T>(process.env.NEXT_PUBLIC_BASE_URL as string, input, init);
