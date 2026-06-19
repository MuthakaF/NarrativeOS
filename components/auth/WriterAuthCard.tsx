"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveUser, login } from "../../engine/auth";

export default function WriterAuthCard() {
  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? (
    <WriterLoginCard onToggle={() => setIsLogin(false)} />
  ) : (
    <WriterSignUpCard onToggle={() => setIsLogin(true)} />
  );
}

function WriterSignUpCard({ onToggle }: any) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = () => {
    saveUser({
      name,
      email,
      password,
      role: "writer",
      loggedIn: true,
    });

    router.push("/writer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4EDE0]">
      <div className="w-[420px] bg-[#F4EDE0] p-6 rounded-2xl shadow-md border">

        <h1 className="text-center font-serif uppercase tracking-[0.06em]">
          THE WRITER'S INKWELL
        </h1>

        <p className="text-center text-sm text-[#6B5B4D] mt-2">
          Claim your desk and pseudonym.
        </p>

        <input className="w-full mt-4 p-2 border" placeholder="Author Pen Name" onChange={(e)=>setName(e.target.value)} />
        <input className="w-full mt-2 p-2 border" placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full mt-2 p-2 border" placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />

        <button
          onClick={handle}
          className="w-full mt-4 bg-gradient-to-b from-[#2D1F18] to-[#4A3325] text-white py-2 rounded-full"
        >
          BEGIN WRITING
        </button>

        <p className="text-center text-xs mt-3">
          Belong to the guild?{" "}
          <button onClick={onToggle} className="underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

function WriterLoginCard({ onToggle }: any) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = () => {
    const ok = login(email, password);

    if (ok) router.push("/writer");
    else alert("Invalid credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4EDE0]">
      <div className="w-[420px] bg-[#F4EDE0] p-6 rounded-2xl shadow-md border">

        <h1 className="text-center uppercase">DIP THE PEN</h1>

        <input className="w-full mt-4 p-2 border" placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full mt-2 p-2 border" placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={handle} className="w-full mt-4 bg-[#2D1F18] text-white py-2 rounded-full">
          RESUME DRAFTING
        </button>

        <p className="text-center text-xs mt-3">
          Need a new parchment?{" "}
          <button onClick={onToggle} className="underline">
            Join Guild
          </button>
        </p>
      </div>
    </div>
  );
}