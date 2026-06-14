const DEFAULT_JSON_BODY_MAX_BYTES = 64 * 1024;

export class RequestBodyTooLargeError extends Error {
  constructor(maxBytes) {
    super(`JSON body exceeds ${maxBytes} bytes.`);
    this.name = 'RequestBodyTooLargeError';
    this.status = 413;
  }
}

export const jsonResponse = (status, body, extraHeaders = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  });

export const errorResponse = (status, message, extra = {}, headers = {}) =>
  jsonResponse(status, { error: message, ...extra }, headers);

export const readJsonBody = async (
  request,
  { maxBytes = DEFAULT_JSON_BODY_MAX_BYTES } = {},
) => {
  const contentLength = Number(request.headers.get('content-length') || 0);

  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new RequestBodyTooLargeError(maxBytes);
  }

  try {
    const text = await request.text();
    const bodyByteLength = new TextEncoder().encode(text).byteLength;

    if (bodyByteLength > maxBytes) {
      throw new RequestBodyTooLargeError(maxBytes);
    }

    return JSON.parse(text);
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      throw error;
    }

    return null;
  }
};
