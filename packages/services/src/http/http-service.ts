export type HTTPServiceResponse<T> =
  | { data: T; error?: never }
  | { data?: never; error: string }

export class HTTPService {
  constructor(private baseURL: string = '') { }

  private async request<T>(url: string, method: string, body?: unknown): Promise<HTTPServiceResponse<T>> {
    const res = await fetch(`${this.baseURL}${url}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = res.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!res.ok) {
      const error = isJson ? await res.json() : await res.text();
      const message = typeof error === "string" ? error : error?.message || "Unknown error";

      return { error: message };
    }

    if (isJson) {
      const data = await res.json();
      return { data };
    }

    return { error: "Unexpected response format" };
  }

  get<T>(url: string) {
    return this.request<T>(url, "GET");
  }

  post<T>(url: string, body?: unknown) {
    return this.request<T>(url, "POST", body);
  }

  patch<T>(url: string, body: unknown) {
    return this.request<T>(url, "PATCH", body);
  }

  put<T>(url: string, body: unknown) {
    return this.request<T>(url, "PUT", body);
  }

  delete<T>(url: string) {
    return this.request<T>(url, "DELETE");
  }
}
