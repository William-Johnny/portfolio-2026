"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Polaroid from "../components/polaroid";
import { ImageFieldImage } from "@prismicio/client";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger);

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

  function getNearestEdge(el: HTMLElement) {
    const rect = el.getBoundingClientRect();

    const distances = {
      left: rect.left,
      right: window.innerWidth - rect.right,
      top: rect.top,
      bottom: window.innerHeight - rect.bottom,
    };

    const nearest = Object.entries(distances).reduce((a, b) =>
      a[1] < b[1] ? a : b,
    )[0];

    return nearest;
  }

  function moveToEdge(el: HTMLElement) {
    const edge = getNearestEdge(el);

    const offset = 200; // how far outside screen

    let x = 0;
    let y = 0;

    switch (edge) {
      case "left":
        x = -window.innerWidth / 2 - offset;
        break;
      case "right":
        x = window.innerWidth / 2 + offset;
        break;
      case "top":
        y = -window.innerHeight / 2 - offset;
        break;
      case "bottom":
        y = window.innerHeight / 2 + offset;
        break;
    }

    gsap.to(el, {
      x: `+=${x}`,
      y: `+=${y}`,
      duration: 0.8,
      ease: "power3.out",
    });
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

    gsap.to(".home-title", {
      opacity: 0,
      y: -50,
      duration: 1,
      scrollTrigger: {
        trigger: ".home-title",
        markers: true,
        start: "-=300",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    els.forEach((el) => {
      const edge = getNearestEdge(el);

      let x = 0;
      let y = 0;

      const offset = 300;

      if (edge === "left") x = -offset;
      if (edge === "right") x = offset;
      if (edge === "top") y = -offset;
      if (edge === "bottom") y = offset;

      gsap.to(el, {
        x: `+=${x}`,
        y: `+=${y}`,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
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
        <h1 className="home-title font-bebas text-[200px]">Portfolio</h1>
      </div>
      <div className="min-h-full w-full flex mt-[500px]">
        <div className=".hero-subtitle pt-11 pl-36">
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
    </>
  );
};

export default PresPage;
