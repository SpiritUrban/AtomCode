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
    <div className="relative h-full w-full p-2">
      <div className="relative h-full w-full overflow-hidden rounded-xl border-2 border-atom-border bg-atom-card">
        <div className="absolute left-2 top-2 z-10 rounded-full bg-atom-bg/80 px-2.5 py-1 text-xs font-mono font-bold text-atom-accent backdrop-blur-sm">
          {code}
        </div>
        <Image
          src={assetPath(src)}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1023px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
}
