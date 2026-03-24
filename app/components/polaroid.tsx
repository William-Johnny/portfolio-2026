"use client"

import Picture from "./Picture";

interface PolaroidProps {
  src: string;
  text: string;
  imgAlt?: string;
}

const Polaroid:  React.FC<PolaroidProps> = ({src, text, imgAlt}) => {

  return (
	<div className="box bg-white p-4 pb-10 shadow-xl -rotate-3 hover:rotate-0 transition duration-300 max-w-2xs">

        <Picture
          url={src}
          alt={imgAlt}
          className="w-64 h-64"
        />

        <p className="text-center mt-4 text-gray-700 font-medium">
        {text}
        </p>

    </div>
  );
}

export default Polaroid;
