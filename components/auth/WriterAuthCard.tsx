"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WriterAuthCard() {
  const router = useRouter();

  const [mode, setMode] = useState<"signup" | "login">("signup");

  const [penName, setPenName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [writingMode, setWritingMode] =
    useState<"Traditional Prose" | "Screenwriting">("Traditional Prose");

  const [passions, setPassions] = useState<string[]>([]);

  const toggle = (p: string) =>
    setPassions((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  const handleSubmit = () => {
    if (mode === "signup") {
      localStorage.setItem(
        "writerUser",
        JSON.stringify({ penName, email, password, writingMode, passions })
      );
      router.push("/writer/dashboard");
      return;
    }

    const stored = localStorage.getItem("writerUser");
    if (!stored) return alert("No account found");

    const user = JSON.parse(stored);

    if (user.email === email && user.password === password) {
      router.push("/writer/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const inputClass = `
    w-full px-4 py-3 rounded-lg

    bg-white/50 backdrop-blur-md
    border border-[#7A5F43]/15

    text-[#3D2B1F]
    font-['Times_New_Roman',Times,serif]

    placeholder:text-[#5C4433]/85
    placeholder:text-sm

    focus:outline-none focus:ring-2 focus:ring-[#C8A47A]/40

    transition
  `;

  const textFont = "font-['Times_New_Roman',Times,serif]";

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF6EE] px-6">

      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl border border-[#7A5F43]/10 p-8 flex flex-col gap-6">

        <h1 className={`text-center text-[#7A5F43] text-2xl ${textFont}`}>
          THE INKWELL
        </h1>

        <div className={`flex justify-center gap-4 text-sm ${textFont}`}>
          <button
            onClick={() => setMode("signup")}
            className={mode === "signup" ? "text-[#7A5F43]" : "text-gray-400"}
          >
            Sign Up
          </button>

          <button
            onClick={() => setMode("login")}
            className={mode === "login" ? "text-[#7A5F43]" : "text-gray-400"}
          >
            Log In
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {mode === "signup" && (
            <input
              className={inputClass}
              placeholder="Pen Name"
              value={penName}
              onChange={(e) => setPenName(e.target.value)}
            />
          )}

          <input
            className={inputClass}
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className={inputClass}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {mode === "signup" && (
          <>
            <div className={`flex gap-2 text-xs ${textFont}`}>
              {["Traditional Prose", "Screenwriting"].map((m) => (
                <button
                  key={m}
                  onClick={() => setWritingMode(m as any)}
                  className={`flex-1 py-2 rounded-lg border ${
                    writingMode === m
                      ? "bg-[#E6C89A]/60 border-[#C8A47A]"
                      : "bg-white/40 border-[#7A5F43]/10 text-[#7A5F43]/70"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className={`flex flex-wrap gap-2 ${textFont}`}>
              {["Character Development", "Plotting", "World Building", "Experimental Formats"].map((p) => (
                <button
                  key={p}
                  onClick={() => toggle(p)}
                  className={`px-3 py-1 rounded-full text-xs border transition ${
                    passions.includes(p)
                      ? "bg-[#E6C89A]/60 border-[#C8A47A]"
                      : "bg-white/40 border-[#7A5F43]/10 text-[#7A5F43]/70"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </>
        )}

        <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#2D1F18] to-[#4A3325] text-white tracking-widest text-xs uppercase">
          BEGIN WRITING
        </button>
      </div>
    </main>
  );
}