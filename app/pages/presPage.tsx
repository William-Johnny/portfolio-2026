"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Polaroid from "../components/polaroid";
import { ImageFieldImage } from "@prismicio/client";

gsap.registerPlugin(Draggable, InertiaPlugin);

interface PresPageProps {
  imgArray: Array<any>;
  pictureOfMe: ImageFieldImage;
  highlightedProjectImg: ImageFieldImage;
}

const PresPage: React.FC<PresPageProps> = ({
  imgArray,
  pictureOfMe,
  highlightedProjectImg,
}) => {
  function isInsideEllipse(
    x: number,
    y: number,
    cx: number,
    cy: number,
    a: number,
    b: number,
  ) {
    const dx = x - cx;
    const dy = y - cy;

    return (dx * dx) / (a * a) + (dy * dy) / (b * b) < 1;
  }

  function generatePositions(
    count: number,
    centerX: number,
    centerY: number,
    a: number,
    b: number,
  ) {
    const positions: { x: number; y: number }[] = [];
    const padding = 80;

    function isFarEnough(
      x: number,
      y: number,
      positions: { x: number; y: number }[],
      minDist = 200,
    ) {
      return positions.every((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.sqrt(dx * dx + dy * dy) > minDist;
      });
    }

    while (positions.length < count) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      const inside = isInsideEllipse(
        x,
        y,
        centerX,
        centerY,
        a + padding,
        b + padding,
      );

      if (!inside && isFarEnough(x, y, positions)) {
        positions.push({ x, y });
      }
    }

    return positions;
  }

  useEffect(() => {
    const elements = document.getElementsByClassName(
      "polaroid",
    ) as HTMLCollectionOf<HTMLElement>;

    const ele = document.getElementsByClassName(
      "point",
    ) as HTMLCollectionOf<HTMLElement>;

    const els = Array.from(elements);
    const points = Array.from(ele);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const centerX = width / 2;
    const centerY = height / 2;

    const a = 705 / 2;
    const b = 173 / 2;

    const positions = generatePositions(els.length, centerX, centerY, a, b);

    els.forEach((el, i) => {
      const p = positions[i];

      const rotation = gsap.utils.random(-45, 45);

      gsap.set(el, {
        position: "absolute",
        x: p.x,
        y: p.y,
        rotation,
        xPercent: -50,
        yPercent: -50,
      });
    });

    points.forEach((el, i) => {
      const p = positions[i];

      const rotation = gsap.utils.random(-45, 45);

      gsap.set(el, {
        position: "absolute",
        x: p.x,
        y: p.y,
        rotation,
        xPercent: -50,
        yPercent: -50,
      });
    });

    const margin = 25;

    Draggable.create(els, {
      type: "x,y",
      inertia: true,
      bounds: {
        minX: -margin,
        minY: -margin,
        maxX: window.innerWidth + margin,
        maxY: window.innerHeight + margin,
      },
    });
  }, []);

  return (
    <>
      {imgArray.map((item, index) => (
        <Polaroid
          key={index}
          src={item.mainimg}
          imgAlt="ref"
          className="polaroid"
        />
      ))}
      <div className="min-h-full w-full flex justify-center items-center">
        <h1 className="font-bebas text-[200px]">Portfolio</h1>
      </div>
      <div className="min-h-full w-full flex">
        <div className="pt-11 pl-36">
          <h1 className="font-bebas text-8xl">Who am I ?</h1>
          <p className="font-sans text-2xl w-108.75">
            My name is William-John Guenon I’m a student developer at l’Ecole by
            CCI
          </p>
          <button className="bg-gray-300 mt-18.5 py-4 px-5">
            SEE MY WORK {">"}
          </button>
        </div>
        <div className="relative w-184.25 ml-18.25 mt-24">
          <Polaroid
            src={pictureOfMe}
            text="me"
            imgAlt="ref"
            className="-rotate-12"
            imgClassName="w-[300px] h-[300px]"
          />
          <Polaroid
            src={highlightedProjectImg}
            text="Site JSP de France"
            imgAlt="ref"
            className="absolute rotate-14 top-36 left-70.5 hover:scale-110 transition cursor-pointer"
            imgClassName="w-[300px] h-[300px]"
          />
        </div>
      </div>
      {/* <div
        className="ellipse-debug"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "705px",
          height: "173px",
          transform: "translate(-50%, -50%)",
          border: "2px dashed red",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: "9999",
        }}
      />
      <div
        className="point"
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundColor: "red",
          zIndex: "9999",
        }}
      />
      <div
        className="point"
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundColor: "red",
          zIndex: "9999",
        }}
      />
      <div
        className="point"
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundColor: "red",
          zIndex: "9999",
        }}
      />
      <div
        className="point"
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundColor: "red",
          zIndex: "9999",
        }}
      />
      <div
        className="point"
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundColor: "red",
          zIndex: "9999",
        }}
      />
      <div
        className="point"
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundColor: "red",
          zIndex: "9999",
        }}
      />
      <div
        className="point"
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundColor: "red",
          zIndex: "9999",
        }}
      /> */}
    </>
  );
};

export default PresPage;
