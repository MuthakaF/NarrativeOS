"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveUser, login } from "../../engine/auth";

/**
 * WRAPPER
 */
export default function ReaderAuthCard() {
  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? (
    <ReaderLoginCard onToggle={() => setIsLogin(false)} />
  ) : (
    <ReaderSignUpCard onToggle={() => setIsLogin(true)} />
  );
}

/**
 * SIGNUP
 */
function ReaderSignUpCard({ onToggle }: any) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const genres = ["Fiction", "Mystery", "Fantasy", "Romance"];

  const [selected, setSelected] = useState<string[]>([]);

  const toggleGenre = (g: string) => {
    setSelected((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const handle = () => {
    saveUser({
      name,
      email,
      password,
      role: "reader",
      loggedIn: true,
    });

    router.push("/reader");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF6EE]">
      <div className="w-[420px] bg-[#FAF6EE] border border-[#7A5F43]/10 p-6 rounded-2xl shadow-sm">

        <h1 className="text-center font-serif tracking-[0.06em] uppercase text-[#7A5F43]">
          THE READER'S STUDY
        </h1>

        <p className="text-center text-[#8B7E74] text-sm mt-2">
          Create your sanctuary account.
        </p>

        <input
          placeholder="Full Name"
          className="w-full mt-4 p-2 bg-[#FDFBF7] border border-[#7A5F43]/15"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email Address"
          className="w-full mt-2 p-2 bg-[#FDFBF7] border border-[#7A5F43]/15"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Create Password"
          type="password"
          className="w-full mt-2 p-2 bg-[#FDFBF7] border border-[#7A5F43]/15"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* GENRES */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => toggleGenre(g)}
              className={`p-2 text-xs border rounded ${
                selected.includes(g)
                  ? "bg-[#F5E6D3] border-[#8E5A36]"
                  : "bg-white border-[#7A5F43]/15"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <button
          onClick={handle}
          className="w-full mt-4 bg-[#8E5A36] text-white py-2 rounded-full shadow-md"
        >
          START READING
        </button>

        <p className="text-center text-xs mt-3 text-[#8B7E74]">
          Already have a library card?{" "}
          <button onClick={onToggle} className="underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

/**
 * LOGIN
 */
function ReaderLoginCard({ onToggle }: any) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = () => {
    const ok = login(email, password);

    if (ok) router.push("/reader");
    else alert("Invalid credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF6EE]">
      <div className="w-[420px] bg-[#FAF6EE] border border-[#7A5F43]/10 p-6 rounded-2xl shadow-sm">

        <h1 className="text-center font-serif tracking-[0.06em] uppercase text-[#7A5F43]">
          RETURN TO THE STUDY
        </h1>

        <p className="text-center text-[#8B7E74] text-sm mt-2">
          Pull up a chair and continue reading.
        </p>

        <input
          placeholder="Email Address"
          className="w-full mt-4 p-2 bg-[#FDFBF7] border border-[#7A5F43]/15"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full mt-2 p-2 bg-[#FDFBF7] border border-[#7A5F43]/15"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handle}
          className="w-full mt-4 bg-[#8E5A36] text-white py-2 rounded-full shadow-md"
        >
          ENTER ARCHIVE
        </button>

        <p className="text-center text-xs mt-3 text-[#8B7E74]">
          New to the study?{" "}
          <button onClick={onToggle} className="underline">
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}