import Image from "next/image";
import type { EditorialPhoto } from "@/lib/data/photos";

// Shared background treatment for every navy "page banner" section (the
// pt-40/pb-20 bg-deep-blue blocks at the top of each route). Keeps text legible
// over any photo via a consistent navy gradient scrim, so editorial
// photography can be dropped in per-page/per-service without each page
// re-deriving its own overlay math.

export function PageHeroBackground({
  photo,
  priority = false,
}: {
  photo: EditorialPhoto;
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes="100vw"
        quality={70}
        className="object-cover"
      />
      {/* Navy scrim: solid near the bottom (where headline text sits) fading
          to a lighter wash at top, so the photo still reads as photography. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,31,51,0.80) 0%, rgba(11,31,51,0.72) 45%, rgba(11,31,51,0.88) 100%)",
        }}
      />
    </div>
  );
}
