"use client";

import { useState } from "react";
import {
  saveUser,
  getUser,
  logout,
  login,
} from "../../engine/auth";

export default function AuthTestPage() {
  const [log, setLog] = useState<any>(null);

  const testSignup = () => {
    saveUser({
      name: "Test User",
      email: "test@narrative.com",
      password: "1234",
      role: "writer",
      loggedIn: true,
    });

    setLog("Signup complete ✔");
  };

  const testLoginSuccess = () => {
    const result = login("test@narrative.com", "1234");
    setLog({ loginSuccess: result });
  };

  const testLoginFail = () => {
    const result = login("test@narrative.com", "wrongpassword");
    setLog({ loginSuccess: result });
  };

  const testGetUser = () => {
    const user = getUser();
    setLog(user);
  };

  const testLogout = () => {
    logout();
    setLog("Logged out ✔");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF6EE] gap-4 p-6">

      <h1 className="text-xl font-serif text-[#7A5F43]">
        Auth System Test Panel
      </h1>

      <button
        onClick={testSignup}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Test Signup
      </button>

      <button
        onClick={testLoginSuccess}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Test Login (Correct Password)
      </button>

      <button
        onClick={testLoginFail}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Test Login (Wrong Password)
      </button>

      <button
        onClick={testGetUser}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Get User
      </button>

      <button
        onClick={testLogout}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Logout
      </button>

      <pre className="mt-4 p-4 bg-white border rounded w-[320px] text-xs overflow-auto">
        {JSON.stringify(log, null, 2)}
      </pre>

    </div>
  );
}