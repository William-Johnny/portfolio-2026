"use client";

import { forwardRef } from "react";
import { cn } from "../lib/cn";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

export type ButtonProps = React.ComponentProps<"button"> & {
  isPending?: boolean;
  push: Url;
  back?: boolean;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, push }, ref) => {
    return (
      <Link
        href={push}
        ref={ref}
        className={cn("bg-gray-300 py-4 px-5 cursor-pointer", className)}
      >
        {children}
      </Link>
    );
  },
);

Button.displayName = "ButtonPrimitive";

export { Button };
