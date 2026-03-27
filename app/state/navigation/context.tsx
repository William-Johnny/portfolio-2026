import { Noop } from "@/app/types/utils";
import { createContext } from "react";

export type NavigationContextState = {
  isNavigating: boolean;
  start: Noop;
  done: Noop;
};

const NavigationContext = createContext<NavigationContextState | undefined>(
  undefined,
);

export default NavigationContext;
