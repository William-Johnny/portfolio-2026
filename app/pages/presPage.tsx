"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Polaroid from "../components/polaroid";

gsap.registerPlugin(Draggable, InertiaPlugin);

const PresPage = () => {
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
      positions: any[],
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
        console.log({ x, y });

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
      <Polaroid
        src="/reference.jpg"
        text="ref"
        imgAlt="ref"
        className="polaroid"
      />
      <Polaroid
        src="/img/jsp1.png"
        text="Site JSP de France"
        imgAlt="Polaroid"
        className="polaroid"
      />
      <Polaroid
        src="/img/hide_and_seek.png"
        text="Hide and seek"
        imgAlt="Polaroid"
        className="polaroid"
      />
      <Polaroid
        src="/img/py1.png"
        text="Pygamon"
        imgAlt="Polaroid"
        className="polaroid"
      />
      <Polaroid
        src="/img/hit.png"
        text="Site JSP de France"
        imgAlt="Polaroid"
        className="polaroid"
      />
      <Polaroid
        src="/img/cap.png"
        text="Hide and seek"
        imgAlt="Polaroid"
        className="polaroid"
      />
      <Polaroid
        src="/img/lost.png"
        text="Pygamon"
        imgAlt="Polaroid"
        className="polaroid"
      />
      <div className="h-full w-full flex justify-center items-center">
        <h1 className="font-bebas text-[200px]">Portfolio</h1>
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
