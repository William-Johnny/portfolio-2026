"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Polaroid from "../components/polaroid";

gsap.registerPlugin(Draggable, InertiaPlugin);

const PresPage = () => {
  function poissonDiskSampling(
    width: number,
    height: number,
    minDist: number,
    maxPoints = 100,
  ) {
    const points: { x: number; y: number }[] = [];
    const attempts = 30;

    function isFarEnough(x: number, y: number) {
      return points.every((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.sqrt(dx * dx + dy * dy) >= minDist;
      });
    }

    while (points.length < maxPoints) {
      let placed = false;

      for (let i = 0; i < attempts; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        if (isFarEnough(x, y)) {
          points.push({ x, y });
          placed = true;
          break;
        }
      }

      if (!placed) break;
    }

    return points;
  }

  function isInEllipseBand(
    x: number,
    y: number,
    cx: number,
    cy: number,
    a: number,
    b: number,
    spread: number,
  ) {
    const dx = x - cx;
    const dy = y - cy;

    const value = (dx * dx) / (a * a) + (dy * dy) / (b * b);
    return value >= 1 && value <= 1 + spread / 100;
  }

  useEffect(() => {
    const elements = document.getElementsByClassName(
      "polaroid",
    ) as HTMLCollectionOf<HTMLElement>;

    const els = Array.from(elements);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const centerX = width / 2;
    const centerY = height / 2;

    const a = 705 / 2;
    const b = 173 / 2;

    const spread = 500;
    const minDist = 120;

    const samples = poissonDiskSampling(width, height, minDist, 200);

    const validPoints = samples.filter((p) =>
      isInEllipseBand(p.x, p.y, centerX, centerY, a, b, spread),
    );

    els.forEach((el, i) => {
      const p = validPoints[i % validPoints.length];
      if (!p) return;

      const rotation = gsap.utils.random(-50, 50);

      gsap.set(el, {
        position: "absolute",
        x: p.x,
        y: p.y,
        rotation,
        xPercent: -50,
        yPercent: -50,
      });
    });

    Draggable.create(els, {
      type: "x,y",
      inertia: true,
      bounds: document.querySelector("body"),
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
      <div className="h-full w-full flex justify-center items-center">
        <h1 className="font-bebas text-[200px]">Portfolio</h1>
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
        /> */}
      </div>
    </>
  );
};

export default PresPage;
