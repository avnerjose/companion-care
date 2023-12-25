export const fetchWrapper = async <T = unknown>(
  baseUrl: string,
  input: URL | RequestInfo,
  init?: RequestInit | undefined
): Promise<T | undefined> => {
  const res = await fetch(`${baseUrl}${input}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...init,
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    (error as any).info = await res.json();
    (error as any).status = res.status;

    throw error;
  }

  const contentLength = res.headers.get("content-length");

  if (contentLength && Number(contentLength) === 0) {
    return;
  }

  const data = await res.json();

  return data as T;
};
