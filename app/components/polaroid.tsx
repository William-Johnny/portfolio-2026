"use client";

import { ImageFieldImage } from "@prismicio/client";
import { cn } from "../lib/cn";
import { PrismicNextImage } from "@prismicio/next";

interface PolaroidProps {
  src: ImageFieldImage;
  text?: string | null | undefined;
  imgAlt?: string;
  className?: string;
  imgClassName?: string;
}

const Polaroid: React.FC<PolaroidProps> = ({
  src,
  text,
  className,
  imgClassName,
}) => {
  return (
    <div className={cn("box bg-white p-4 pb-10 shadow-xl max-w-83", className)}>
      <PrismicNextImage
        field={src}
        className={cn("w-64 h-64", imgClassName)}
        alt=""
      />
      <p className="text-center mt-4 text-gray-700 font-medium font-caveat">
        {text}
      </p>
    </div>
  );
};

export default Polaroid;
