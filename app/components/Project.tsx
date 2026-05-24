"use client";

import { ImageFieldImage } from "@prismicio/client";
import Polaroid from "./polaroid";
import BackBtn from "./BackBtn";

interface ProjectProps {
  src: ImageFieldImage;
  title: string;
  description: string;
  tag: Array<any>;
}

const Project: React.FC<ProjectProps> = ({
  src,
  title,
  description,
  tag,
}) => {
  return (
    <div className="flex h-full p-6">
      <div>
        <BackBtn className="mb-5"/>
        <Polaroid
          src={src}
          className="h-full w-147.5 max-w-147.5"
          imgClassName="h-full w-full object-cover"
        />
      </div>
      <div className="ml-40">
        <h2 className="font-bebas text-[64px]">{title}</h2>
        <div className="mb-15">
          {tag.map((t: any, i: number) => (
            <span
                key={i}
                className="inline-block text-white font-bold text-[14px] px-3 py-1 rounded-full mr-2"
                style={{ backgroundColor: t.color }}
            >
                {t.name}
            </span>
          ))}
        </div>
        <p className="text-[20px]">{description}</p>
      </div>
    </div>
  );
};

export default Project;