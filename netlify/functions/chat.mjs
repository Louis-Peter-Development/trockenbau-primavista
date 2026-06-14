import { buildChatReply, ChatRequestError } from './_shared/chat.mjs';
import {
  RequestBodyTooLargeError,
  errorResponse,
  jsonResponse,
  readJsonBody,
} from './_shared/http.mjs';

export default async (request) => {
  if (request.method !== 'POST') {
    return errorResponse(405, 'Method not allowed.');
  }

  let body;

  try {
    body = await readJsonBody(request, { maxBytes: 24 * 1024 });
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return errorResponse(error.status, 'Request body is too large.');
    }

    throw error;
  }

  if (!body) {
    return errorResponse(400, 'Invalid JSON body.');
  }

  try {
    const reply = await buildChatReply(body.messages);
    return jsonResponse(200, { reply });
  } catch (error) {
    if (error instanceof ChatRequestError) {
      return errorResponse(error.status, error.reply);
    }

    console.error('[chat] Chat request failed', error);
    return errorResponse(500, 'Es gab einen Fehler. Bitte versuchen Sie es später erneut.');
  }
};

export const config = {
  path: '/api/chat',
};
