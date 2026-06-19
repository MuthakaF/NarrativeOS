"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveUser, login } from "../../engine/auth";

export default function DevAuthCard() {
  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? (
    <DevLoginCard onToggle={() => setIsLogin(false)} />
  ) : (
    <DevSignUpCard onToggle={() => setIsLogin(true)} />
  );
}

function DevSignUpCard({ onToggle }: any) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = () => {
    saveUser({
      name,
      email,
      password,
      role: "dev",
      loggedIn: true,
    });

    router.push("/dev");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF6EE]">
      <div className="w-[420px] p-6 border bg-[#FAF6EE]">

        <h1 className="font-mono uppercase tracking-widest text-center">
          THE SCRIPT COMPILER
        </h1>

        <p className="text-center text-sm mt-2">
          Initialize your syntax pipeline.
        </p>

        <input className="w-full mt-4 p-2 border font-mono" placeholder="Project Name" onChange={(e)=>setName(e.target.value)} />
        <input className="w-full mt-2 p-2 border font-mono" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full mt-2 p-2 border font-mono" placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />

        <button className="w-full mt-4 bg-black text-white py-2" onClick={handle}>
          BUILD THE SCRIPT
        </button>

        <p className="text-center text-xs mt-3">
          Already deployed?{" "}
          <button onClick={onToggle} className="underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}

function DevLoginCard({ onToggle }: any) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = () => {
    const ok = login(email, password);

    if (ok) router.push("/dev");
    else alert("Invalid credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF6EE]">
      <div className="w-[420px] p-6 border bg-[#FAF6EE]">

        <h1 className="font-mono uppercase text-center">
          AUTHENTICATE COMPILER
        </h1>

        <input className="w-full mt-4 p-2 border font-mono" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full mt-2 p-2 border font-mono" placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={handle} className="w-full mt-4 bg-black text-white py-2">
          EXECUTE PIPELINE
        </button>

        <p className="text-center text-xs mt-3">
          New instance?{" "}
          <button onClick={onToggle} className="underline">
            Initialize Profile
          </button>
        </p>
      </div>
    </div>
  );
}