"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#FAF6EE]">

      {/* Ambient lighting */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/40 blur-3xl rounded-full -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,242,253,0.35),transparent_60%)]" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full blur-[6px] animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 10}s`,
              opacity: 0.2 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <section className="relative z-10 max-w-[720px] w-full text-center px-6 py-16 flex flex-col items-center gap-10">

        <h1 className="font-serif uppercase tracking-[0.35em] text-[#7A5F43] text-4xl md:text-5xl">
          THE CINEMATIC PROLOGUE
        </h1>

        <p className="font-serif text-[#7A5F43]/90 leading-relaxed text-base md:text-lg max-w-xl animate-fadeIn">
          We invite readers, writers, and developers to enter our immersive sanctuary for words. Explore narratives. Craft stories. Build worlds.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">

          <button
            onClick={() => router.push("/auth/reader")}
            className="px-8 py-3 rounded-full bg-white/45 backdrop-blur-md border border-[#7A5F43]/20 text-[#7A5F43] uppercase text-xs tracking-widest hover:shadow-lg transition"
          >
            I'D LIKE TO READ
          </button>

          <button
            onClick={() => router.push("/auth/writer")}
            className="px-8 py-3 rounded-full bg-white/45 backdrop-blur-md border border-[#7A5F43]/20 text-[#7A5F43] uppercase text-xs tracking-widest hover:shadow-lg transition"
          >
            I'M A WRITER
          </button>

          <button
            onClick={() => router.push("/auth/dev")}
            className="px-8 py-3 rounded-full bg-white/45 backdrop-blur-md border border-[#7A5F43]/20 text-[#7A5F43] uppercase text-xs tracking-widest hover:shadow-lg transition"
          >
            I'M A DEVELOPER
          </button>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 1.5s ease forwards;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </main>
  );
}