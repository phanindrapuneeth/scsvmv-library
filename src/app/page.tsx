"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Welcome to SCSVMV Navigator
        </h1>
        <p className="mt-3 text-muted-foreground">
          Your Personalized CS Learning Hub
        </p>
      </header>

      <main className="mt-10">
        <Button size="lg" onClick={() => router.push("/dashboard")}>
          Get Started
        </Button>
      </main>

      <footer className="mt-12 text-center text-muted-foreground">
        <p className="text-sm">
          © {new Date().getFullYear()} SCSVMV Navigator. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
