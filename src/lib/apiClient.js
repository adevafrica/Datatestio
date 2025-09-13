let authToken = null;
let tokenExpiry = null;

export async function login() {
  const res = await fetch(`${process.env.UHAI_API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.UHAI_API_EMAIL,
      password: process.env.UHAI_API_PASSWORD,
    }),
  });

  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();

  const tokenValue = data.token || data.access_token || data.data?.token || data.data?.access_token || data.tokenValue || data.accessToken;
  authToken = tokenValue;
  tokenExpiry = Date.now() + (Number(process.env.TOKEN_EXPIRY || 3600) * 1000);
  return authToken;
}

export async function getToken() {
  if (!authToken || Date.now() > tokenExpiry) {
    return await login();
  }
  return authToken;
}

export async function fetchCustomers() {
  const token = await getToken();
  const res = await fetch(
    `${process.env.UHAI_API_BASE}/customers/by-pos-account-id/1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}
