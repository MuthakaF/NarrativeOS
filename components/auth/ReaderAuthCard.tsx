"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReaderAuthCard() {
  const router = useRouter();

  const [mode, setMode] = useState<"signup" | "login">("signup");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [genres, setGenres] = useState<string[]>([]);

  const genreOptions = [
    "Fiction",
    "Mystery",
    "Fantasy",
    "Romance",
    "Sci-Fi",
    "Historical",
  ];

  const toggleGenre = (g: string) => {
    setGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const handleSubmit = () => {
    if (mode === "signup") {
      localStorage.setItem(
        "readerUser",
        JSON.stringify({ name, email, password, genres })
      );
      router.push("/reader/dashboard");
      return;
    }

    const stored = localStorage.getItem("readerUser");
    if (!stored) return alert("No account found");

    const user = JSON.parse(stored);

    if (user.email === email && user.password === password) {
      router.push("/reader/dashboard");
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
          THE STUDY
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
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div className={`flex flex-wrap gap-2 ${textFont}`}>
            {genreOptions.map((g) => (
              <button
                key={g}
                onClick={() => toggleGenre(g)}
                className={`px-3 py-1 rounded-full text-xs border transition ${
                  genres.includes(g)
                    ? "bg-[#E6C89A]/60 border-[#C8A47A] text-[#3D2B1F]"
                    : "bg-white/40 border-[#7A5F43]/10 text-[#7A5F43]/70"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        )}

        <button className="w-full py-3 rounded-full bg-[#8E5A36] text-white tracking-widest text-xs uppercase">
          START READING
        </button>
      </div>
    </main>
  );
}