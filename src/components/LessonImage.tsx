"use client";

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

type LessonImageProps = {
  src: string;
  alt: string;
  code: string;
};

export default function LessonImage({ src, alt, code }: LessonImageProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-atom-border bg-atom-card shadow-2xl shadow-atom-accent/5">
        <div className="absolute left-3 top-3 z-10 rounded-full bg-atom-bg/80 px-3 py-1 text-xs font-mono font-bold text-atom-accent backdrop-blur-sm">
          {code}
        </div>
        <Image
          src={assetPath(src)}
          alt={alt}
          width={480}
          height={480}
          className="h-auto w-full object-cover"
          priority
        />
      </div>
    </div>
  );
}