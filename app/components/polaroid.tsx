"use client";

import { cn } from "../lib/cn";
import Picture from "./Picture";

interface PolaroidProps {
  src: string;
  text: string;
  imgAlt?: string;
  className?: string;
}

const Polaroid: React.FC<PolaroidProps> = ({
  src,
  text,
  imgAlt,
  className,
}) => {
  return (
    <div className={cn("box bg-white p-4 shadow-xl max-w-2xs", className)}>
      <Picture url={src} alt={imgAlt} className="w-36 h-28" />

      <p className="text-center mt-4 text-gray-700 font-medium">{text}</p>
    </div>
  );
};

export default Polaroid;
