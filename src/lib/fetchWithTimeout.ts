/**
 * Fetch with a timeout (default 15 seconds).
 * Throws an error if the request takes too long.
 */
export async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeoutMs = 15000
): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const res = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        return res;
    } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("İstek zaman aşımına uğradı. Lütfen tekrar deneyin.");
        }
        throw error;
    } finally {
        clearTimeout(timer);
    }
}
