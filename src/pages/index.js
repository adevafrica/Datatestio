import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      userId === process.env.NEXT_PUBLIC_USER_ID &&
      token === process.env.NEXT_PUBLIC_UNIQUE_TOKEN
    ) {
      localStorage.setItem("auth", JSON.stringify({ userId, token }));
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">User ID</label>
          <div className="flex items-center border rounded-lg p-2">
            <i className="fas fa-user text-gray-400 mr-2"></i>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full outline-none"
              placeholder="Enter User ID"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Unique Token</label>
          <div className="flex items-center border rounded-lg p-2">
            <i className="fas fa-key text-gray-400 mr-2"></i>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full outline-none"
              placeholder="Enter Unique Token"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
