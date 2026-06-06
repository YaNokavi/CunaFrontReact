class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

async function fetchData(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  headers: Record<string, string | number> = {},
  body: unknown = null,
  expectResponse = true,
  maxAttempts = 3,
) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      };

      const urlDomain = "https://cryptuna-anderm.amvera.io/v1/" + url;

      const response = await fetch(urlDomain, options);

      if (!response.ok) {
        throw new HttpError(`Ошибка`, response.status);
      }

      return expectResponse ? await response.json() : response.status;
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        if (attempt === maxAttempts) {
          throw error;
        }

        if (error.status >= 400 && error.status < 500) {
          console.error("Ошибка при выполнении запроса:", error.status);
          throw error;
        } else {
          await new Promise((res) => setTimeout(res, 500 * attempt));
        }
      }
    }
  }
}

export default fetchData;
