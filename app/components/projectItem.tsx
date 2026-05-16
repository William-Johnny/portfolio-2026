"use client";

import { ImageFieldImage } from "@prismicio/client";
import Polaroid from "./polaroid";
import { cn } from "../lib/cn";

interface ProjectItemProps {
  src: ImageFieldImage;
  src2: ImageFieldImage;
  text?: string | null | undefined;
  imgAlt?: string;
  className?: string;
  imgClassName?: string;
  title: string;
  description: string;
  index: number;
  slug: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  src,
  src2,
  text,
  className,
  imgClassName,
  imgAlt,
  title,
  description,
  index,
  slug,
}) => {
  return (
    <a href={`/en/project/${slug}`}>
        <div className="flex w-full gap-15.5 justify-center mt-32 mb-50">
            {index %2 === 0 ? (
                <>
                <div className="max-w-125">
                    <h2 className="font-bebas text-[64px]">{title}</h2>
                    <p className="text-[20px]">{description}</p>
                </div>
                <div className="relative">
                    <Polaroid
                    src={src}
                    text={text}
                    imgAlt={imgAlt}
                    className={cn(
                            "-rotate-14",
                            className,
                        )}
                    imgClassName={imgClassName}
                    />
                    <Polaroid
                    src={src2}
                    text="Site JSP de France"
                    imgAlt="ref"
                    className="rotate-14 hover:scale-110 transition cursor-pointer absolute top-37.5 left-37.5"
                    imgClassName="min-w-64 min-h-64"
                    />
                </div>
                </>
            ) : (
                <>
                <div className="relative">
                    <Polaroid
                    src={src}
                    text={text}
                    imgAlt={imgAlt}
                    className={cn(
                            "-rotate-14",
                            className,
                        )}
                    imgClassName={imgClassName}
                    />
                    <Polaroid
                    src={src2}
                    text="Site JSP de France"
                    imgAlt="ref"
                    className="rotate-14 hover:scale-110 transition cursor-pointer absolute top-37.5 left-37.5"
                    imgClassName="min-w-64 min-h-64"
                    />
                </div>
                <div className="max-w-125">
                    <h2 className="font-bebas text-[64px] leading-none">{title}</h2>
                    <p className="text-[20px] max-w-125 line-clamp-2">{description}</p>
                </div>
                </>
            )}
            
        </div>
    </a>
  );
};

export default ProjectItem;
