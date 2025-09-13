import { getValidToken } from "../../../lib/token";

export const config = { runtime: "edge" };

export default async function handler() {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.UHAI_API_BASE}/customers/by-pos-account-id/1`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "accept": "application/json;charset=UTF-8",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({ error: `Upstream fetch failed: ${res.status} ${text}` }), { status: res.status });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
