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

      const urlDomain = "https://cryptunatest-anderm.amvera.io/v1/" + url;

      const response = await fetch(urlDomain, options);

      if (!response.ok) {
        throw new HttpError(`Ошибка`, response.status);
      }

      return expectResponse ? await response.json() : response.status;
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        // 4xx — не ретраим, бросаем сразу
        if (error.status >= 400 && error.status < 500) {
          throw error;
        }
        // 5xx — ретраим, на последней попытке бросаем
        if (attempt === maxAttempts) {
          throw error;
        }
        await new Promise((res) => setTimeout(res, 500 * attempt));
      } else {
        // Сетевая ошибка (нет интернета, таймаут и т.д.)
        if (attempt === maxAttempts) {
          throw error;
        }
        await new Promise((res) => setTimeout(res, 500 * attempt));
      }
    }
  }
}

export default fetchData;
