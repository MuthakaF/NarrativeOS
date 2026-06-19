"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "../../engine/auth";

export default function DevPage() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (!user || user.role !== "dev") {
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1115] p-10 text-white">
      <h1 className="text-2xl font-serif text-cyan-200">
        Script Compiler
      </h1>

      <p className="mt-4 text-white/70">
        Build effects, plugins, and narrative tools here.
      </p>
    </div>
  );
}