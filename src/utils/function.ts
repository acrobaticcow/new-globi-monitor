import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Children, cloneElement, isValidElement } from "react";

export const currentDate = new Date();
// export const currentTime = currentDate.getTime();
export function getRandInt(min = 0, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
export const currentTime = format(new Date(), "eeee, dd/MM/y - kk:mm:ss", {
  locale: vi,
});

interface CloneChildArgs {
  children: any;
  props?: {
    [key: string]: any;
  };
}
export const cloneChild = ({ children, props }: CloneChildArgs) => {
  return Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (isValidElement(child)) {
      return cloneElement(child, { ...(child.props as {}), ...props });
    } else {
      console.log("child is not valid");
    }
    return child;
  });
};
interface ExtractorProps {
  root: {
    [key: string]: any;
  };
  target: string;
  suffix?: string;
  prefix?: string;
}
export const extractor = ({ root, target, suffix, prefix }: ExtractorProps) => {
  return root[`${prefix ?? ""}${target}${suffix ?? ""}`];
};
export const uuid = () => {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};
