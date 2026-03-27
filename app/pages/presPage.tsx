"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Polaroid from "../components/polaroid";
import { ImageFieldImage } from "@prismicio/client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

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
  const [goToProjects, setGoToProjects] = useState<boolean>(false);

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

  function getNearestEdge(el: HTMLElement) {
    const rect = el.getBoundingClientRect();

    const distances = {
      left: rect.left,
      right: window.innerWidth - rect.right,
      top: rect.top,
    };

    const nearest = Object.entries(distances).reduce((a, b) =>
      a[1] < b[1] ? a : b,
    )[0];

    return nearest;
  }

  useEffect(() => {
    new Lenis({
      autoRaf: true,
    });

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

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-title",
        markers: true,
        start: "-=300",
        end: "+=2000",
        scrub: true,
      },
    });

    heroTl
      .to(".home-title", {
        opacity: 0,
        y: 500,
        duration: 1,
      })
      .fromTo(
        ".highlightProject",
        { x: 1100, y: 20, rotate: 14, zIndex: 9999 },
        {
          x: 900,
          y: 1800,
          duration: 1.2,
          ease: "power1.out",
          zIndex: 9999,
        },
        0,
      );

    els.forEach((el) => {
      const edge = getNearestEdge(el);

      let x = 0;
      let y = 0;

      const offset = 300;

      if (edge === "left") x = -offset;
      if (edge === "right") x = offset;
      if (edge === "top") y = -offset;

      gsap.fromTo(
        el,
        { zIndex: 8888 },
        {
          x: `+=${x}`,
          y: `${y}`,
          zIndex: 9999,
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
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
      <div className="highlightProject absolute rotate-14">
        <div className="hover:scale-110 transition cursor-pointer">
          <Polaroid
            src={highlightedProjectImg}
            text="Site JSP de France"
            imgAlt="ref"
            imgClassName="w-[300px] h-[300px]"
          />
        </div>
      </div>
      <div className="min-h-full w-full flex justify-center items-center">
        <h1 className="home-title font-bebas text-[200px]">Portfolio</h1>
      </div>
      <div className="min-h-full w-full flex mt-125">
        <div className="hero-subtitle pt-11 pl-36">
          <h1 className="font-bebas text-8xl">Who am I ?</h1>
          <p className="font-sans text-2xl w-108.75">
            My name is William-John Guenon I’m a student developer at l’Ecole by
            CCI
          </p>
          <div className="flex flex-col gap-3.5 mt-18.5 w-42.5">
            <button
              onClick={() => {
                setGoToProjects(true);
              }}
              className="bg-gray-300 py-4 px-5 cursor-pointer"
            >
              SEE MY WORK {">"}
            </button>
            {/* <button className="bg-gray-300 py-4 px-5 cursor-pointer">
              CONTACT ME {">"}
            </button> */}
          </div>
        </div>
        <div className="mainPolaroidDiv relative w-184.25 ml-18.25 mt-24">
          <Polaroid
            src={pictureOfMe}
            text="me"
            imgAlt="ref"
            className="-rotate-12"
            imgClassName="mainPolaroid w-[300px] h-[300px]"
          />
        </div>
      </div>
      <div className="flex w-full gap-15.5 justify-center">
        <div>
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
            className="absolute rotate-14 top-19 left-65.5 hover:scale-110 transition cursor-pointer"
            imgClassName="w-[300px] h-[300px]"
          />
        </div>
        <div>
          <h2 className="font-bebas text-[64px]">Project 1</h2>
          <p className="text-[20px]">This is a project.</p>
        </div>
      </div>
      <div className="flex w-full gap-15.5 justify-center mt-32">
        <div>
          <h2 className="font-bebas text-[64px]">Project 1</h2>
          <p className="text-[20px]">This is a project.</p>
        </div>
        <div>
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
            className="absolute rotate-14 top-19 left-65.5 hover:scale-110 transition cursor-pointer"
            imgClassName="w-[300px] h-[300px]"
          />
        </div>
      </div>
    </>
  );
};

export default PresPage;
