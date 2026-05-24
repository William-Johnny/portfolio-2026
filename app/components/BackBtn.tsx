"use client";

import { useRouter } from "next/navigation";
import { cn } from "../lib/cn";

export default function BackBtn({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={cn("bg-gray-300 py-4 px-5 w-32.5", className)}>
      {"<"} GO BACK
    </button>
  );
}