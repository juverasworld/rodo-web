import { getAuthToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.selltana.com";

export class ApiCaller {
  private static defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  private static cachedToken: string | null = null;

  private static async getHeaders(secure: boolean = true): Promise<HeadersInit> {
    if (!secure) return this.defaultHeaders;
    if (!this.cachedToken) {
      this.cachedToken = await getAuthToken().then((token) => {console.log("token:", token); return token || ""});
    }
    return this.cachedToken
      ? { ...this.defaultHeaders, Authorization: `Bearer ${this.cachedToken}` }
      : this.defaultHeaders;
  }

  private static async request(
    path: string,
    method: string,
    data?: unknown,
    secure: boolean = true
  ): Promise<{ message: string; success: boolean; data?: any }> {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: await this.getHeaders(secure),
        credentials: secure ? "include" : "same-origin",
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json();
      return {
        message: responseData.message || (response.ok ? "Request successful" : "Request failed"),
        success: response.ok,
        data: responseData.data || null,
      };
    } catch (error) {
      console.error("Unexpected API Error:", error);
      return {
        message: "Unexpected error occurred",
        success: false,
        data: null,
      };
    }
  }

  static async get(path: string, secure: boolean = true) {
    return this.request(path, "GET", undefined, secure);
  }

  static async post(path: string, data: unknown, secure: boolean = true) {
    return this.request(path, "POST", data, secure);
  }

  static async delete(path: string, secure: boolean = true) {
    return this.request(path, "DELETE", undefined, secure);
  }

  static async patch(path: string, data: unknown, secure: boolean = true) {
    return this.request(path, "PATCH", data, secure);
  }
}
