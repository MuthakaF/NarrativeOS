"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "../../engine/auth";

export default function WriterPage() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (!user || user.role !== "writer") {
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6EE] p-10">
      <h1 className="text-2xl font-serif text-[#7A5F43]">
        Writer Dashboard
      </h1>

      <p className="mt-4">
        Create stories, drafts, and chapters here.
      </p>
    </div>
  );
}