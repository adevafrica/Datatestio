export async function getValidToken() {
  if (!globalThis.apiSession || Date.now() > globalThis.apiSession.expiry) {
    if (globalThis.apiSession?.email && globalThis.apiSession?.password) {
      const res = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: globalThis.apiSession.email,
          password: globalThis.apiSession.password,
        }),
      });
      if (!res.ok) throw new Error("Auto refresh failed");
      const data = await res.json();
      if (!data.success) throw new Error("Re-login failed");
    } else {
      throw new Error("Not logged in");
    }
  }
  return globalThis.apiSession.token;
}
