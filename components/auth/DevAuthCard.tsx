"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DevAuthCard() {
  const router = useRouter();

  const [mode, setMode] = useState<"signup" | "login">("signup");

  const [projectName, setProjectName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [language, setLanguage] = useState<"PYTHON" | "JAVA">("PYTHON");
  const [skills, setSkills] = useState<string[]>([]);

  const toggle = (s: string) =>
    setSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const handleSubmit = () => {
    if (mode === "signup") {
      localStorage.setItem(
        "devUser",
        JSON.stringify({ projectName, email, password, language, skills })
      );
      router.push("/dev/dashboard");
      return;
    }

    const stored = localStorage.getItem("devUser");
    if (!stored) return alert("No account found");

    const user = JSON.parse(stored);

    if (user.email === email && user.password === password) {
      router.push("/dev/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const inputClass = `
    w-full px-4 py-3 rounded-lg

    bg-white/10 backdrop-blur-md
    border border-cyan-400/10

    text-cyan-50
    font-['Times_New_Roman',Times,serif]

    placeholder:text-cyan-200/60
    placeholder:text-sm

    focus:outline-none focus:ring-2 focus:ring-cyan-400/30

    transition
  `;

  const textFont = "font-['Times_New_Roman',Times,serif]";

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0F1115] px-6">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl border border-cyan-400/10 p-8 flex flex-col gap-6">

        <h1 className={`text-center text-cyan-200 text-2xl ${textFont}`}>
          THE SCRIPT COMPILER
        </h1>

        <div className={`flex justify-center gap-4 text-sm ${textFont}`}>
          <button
            onClick={() => setMode("signup")}
            className={mode === "signup" ? "text-cyan-200" : "text-gray-500"}
          >
            Sign Up
          </button>

          <button
            onClick={() => setMode("login")}
            className={mode === "login" ? "text-cyan-200" : "text-gray-500"}
          >
            Log In
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {mode === "signup" && (
            <input
              className={inputClass}
              placeholder="Builder Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          )}

          <input
            className={inputClass}
            placeholder="Email"
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
              {["PYTHON", "JAVA"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l as any)}
                  className={`flex-1 py-2 rounded-lg border ${
                    language === l
                      ? "bg-cyan-400/20 border-cyan-400 text-cyan-200"
                      : "bg-white/5 border-cyan-400/10 text-gray-500"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className={`flex flex-wrap gap-2 ${textFont}`}>
              {["NLG Engine", "Automated Editing", "API Integration", "Context Parsing"].map((s) => (
                <button
                  key={s}
                  onClick={() => toggle(s)}
                  className={`px-3 py-1 rounded-full text-xs border transition ${
                    skills.includes(s)
                      ? "bg-cyan-400/20 border-cyan-400 text-cyan-200"
                      : "bg-white/5 border-cyan-400/10 text-gray-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </>
        )}

        <button className="w-full py-3 rounded-full border border-cyan-400 text-cyan-100 uppercase text-xs tracking-widest">
          START BUILDING
        </button>
      </div>
    </main>
  );
}