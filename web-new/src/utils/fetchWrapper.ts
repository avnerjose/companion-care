export const fetchWrapper = async <T = unknown>(
  baseUrl: string,
  input: URL | RequestInfo,
  init?: RequestInit | undefined
): Promise<T> => {
  const res = await fetch(`${baseUrl}${input}`, init);

  const data = await res.json();
  return data as T;
};
