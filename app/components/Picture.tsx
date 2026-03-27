/* eslint-disable @next/next/no-img-element -- any */

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type MouseEventHandler,
} from "react";
import { cn } from "../lib/cn";

export type PictureProps = {
  alt?: string;
  url?: string;
  className?: string;
  imageClassName?: string;
  sail?: boolean;
  fetchPriority?: "high" | "low";
  style?: CSSProperties;
  preloaded?: boolean;
  onClick?: MouseEventHandler<HTMLPictureElement>;
};

const Picture: React.FC<PictureProps> = ({
  url,
  alt,
  className = "",
  imageClassName = "",
  sail = false,
  fetchPriority = "high",
  style,
  preloaded = false,
  onClick,
}) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(preloaded);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preloaded) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 500px 0px",
        threshold: 0,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps -- any
        observer.unobserve(ref.current);
      }
    };
  }, [preloaded]);

  const handleClick = (event: MouseEvent<HTMLPictureElement>) => {
    onClick && onClick(event);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative block",
        {
          "after:absolute after:left-0 after:top-0 after:z-2 after:size-full after:bg-black after:opacity-20 after:content-empty":
            sail,
        },
        className,
      )}
      onClick={handleClick}
      style={style}
    >
      <img
        src={`${url}?w=10&q=10&fm=webp`}
        alt="thumbnail"
        className={cn(
          "ease-power2-out absolute inset-0 size-full object-cover object-center transition-opacity duration-150",
          {
            "opacity-0": !isLoading,
            "opacity-100": isLoading,
          },
          imageClassName,
        )}
        sizes="10px"
        fetchPriority={fetchPriority}
      />
      <img
        src={isIntersecting ? `${url}?fm=webp` : undefined}
        alt={alt}
        className={cn(
          "ease-power2-out absolute inset-0 size-full object-cover object-center transition-opacity duration-150",
          {
            "opacity-0": isLoading,
            "opacity-100": !isLoading,
          },
          imageClassName,
        )}
        decoding="async"
        loading="lazy"
        sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
        fetchPriority={fetchPriority}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default Picture;
