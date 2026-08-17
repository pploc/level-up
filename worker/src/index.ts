export interface Env {
  HABITS_BUCKET: R2Bucket;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

function extractToken(request: Request): string | null {
  const auth = request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return auth.slice(7).trim();
}

function getUserObjectKey(token: string): string {
  let hash = 0;
  for (let i = 0; i < token.length; i++) {
    hash = (hash << 5) - hash + token.charCodeAt(i);
    hash |= 0;
  }
  return `users/user_${Math.abs(hash)}/habits-data.json`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    if (url.pathname !== '/api/sync') {
      return jsonResponse({ error: 'Endpoint not found' }, 404);
    }

    const token = extractToken(request);
    if (!token || token.length < 4) {
      return jsonResponse({ error: 'Unauthorized: Valid Bearer token required' }, 401);
    }

    const objectKey = getUserObjectKey(token);

    try {
      if (request.method === 'GET') {
        const object = await env.HABITS_BUCKET.get(objectKey);
        if (!object) {
          return jsonResponse({ error: 'No remote data found' }, 404);
        }

        const data = await object.json();
        return jsonResponse(data, 200);
      }

      if (request.method === 'PUT') {
        const payload = await request.json();
        if (!payload || typeof payload !== 'object') {
          return jsonResponse({ error: 'Invalid payload' }, 400);
        }

        await env.HABITS_BUCKET.put(objectKey, JSON.stringify(payload), {
          httpMetadata: { contentType: 'application/json' },
          customMetadata: { updatedAt: new Date().toISOString() }
        });

        return jsonResponse({ success: true, syncedAt: new Date().toISOString() }, 200);
      }

      return jsonResponse({ error: 'Method not allowed' }, 405);
    } catch (err: any) {
      return jsonResponse({ error: 'Internal Server Error', message: err.message }, 500);
    }
  },
};
