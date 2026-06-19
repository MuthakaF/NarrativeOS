"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "../../engine/auth";

export default function ReaderPage() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (!user || user.role !== "reader") {
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6EE] p-10">
      <h1 className="text-2xl font-serif text-[#7A5F43]">
        Reader Library
      </h1>

      <p className="mt-4">
        Your stories will appear here.
      </p>
    </div>
  );
}