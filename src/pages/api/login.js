export const config = { runtime: "edge" };

async function loginWithApi(email, password) {
  const res = await fetch(`${process.env.UHAI_API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "*/*" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    return new Response(JSON.stringify({ error: `Login failed: ${res.status} ${text}` }), { status: res.status });
  }

  const data = await res.json();
  // adapt token field extraction if necessary
  const tokenValue = data.token || data.access_token || data.data?.token || data.data?.access_token || data.tokenValue || data.accessToken;

  globalThis.apiSession = {
    token: tokenValue,
    expiry: Date.now() + (Number(process.env.TOKEN_EXPIRY || 3600) * 1000),
    email,
    password,
  };

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export default async function handler(req) {
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });

  try {
    const { email, password } = await req.json();
    return await loginWithApi(email, password);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
