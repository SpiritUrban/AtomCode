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
    <div className="flex h-full w-full items-center justify-center p-3">
      <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-atom-border bg-atom-card shadow-2xl shadow-atom-accent/5">
        <div className="absolute left-3 top-3 z-10 rounded-full bg-atom-bg/80 px-3 py-1 text-xs font-mono font-bold text-atom-accent backdrop-blur-sm">
          {code}
        </div>
        <Image
          src={assetPath(src)}
          alt={alt}
          fill
          className="object-contain p-2"
          sizes="(max-height: 100vh) 50vw"
          priority
        />
      </div>
    </div>
  );
}