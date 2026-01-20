# This chapter includes bite-sized helpful pieces of code that I use all the time.

# Some of these are copyable helper functions, CSS techniques, or tiny React components that solve a single problem well.

# Grid stacking
Naturally, you would probably use absolute positioning and transform to lay two elements on each other:

.root {
  position: relative;
}

.item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
This works but means you now have to account for the translation if you were to animate transform:

.item:hover {
  transform: translate(-50%, -50%) scale(0.96);
}
With CSS Grid you can overlap elements with a lot less code by forcing the grid items onto the first row and column:

.root {
  display: grid;
  place-items: center;

  > * {
    grid-area: 1 / 1;
  }
}
Now you can use transform without relying on it for positioning, and the code looks simpler.

# Natural stacking order
Speaking of stacking—I try to use the natural stacking order of HTML elements as much as possible.

This may sound obvious, but manually fiddling with z-index has started to feel like a hack for me. Most of the time you should instead just take another look at your markup and move elements into the correct order.

# Aesthetic focus rings
For nicer focus rings, I always use a slight radius and offset for elements that have no background color, like links:

.link {
  border-radius: 2px;
  outline: 2px solid orange;
  outline-offset: 2px;
}
When applied holistically, the interface feels more consistent when navigating with the keyboard.

# Intersection detection
This function is helpful to detect whether two elements are overlapping each other. You could use this in a freeform canvas tool to detect when two layers are on top of each other.

export function areIntersecting(
  el1: HTMLElement,
  el2: HTMLElement,
  padding = 0
) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return !(
    rect1.right + padding < rect2.left ||
    rect1.left - padding > rect2.right ||
    rect1.bottom + padding < rect2.top ||
    rect1.top - padding > rect2.bottom
  );
}
It is also used in Radial Timeline to detect when to begin blurring overlapping contents on scroll.

# Grid lines
You might have seen this debug rectangle around. It doesn't use a CSS border because you can't customise the gap on it.

So to customise the dashed border I would sometimes draw borders with a linear gradient to control the spacing:

.gridLine {
  --color: var(--color-orange);
  --size: 8px;

  &[data-direction="horizontal"] {
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      var(--color),
      var(--color) 50%,
      transparent 0,
      transparent
    );
    background-size: var(--size) 1px;
  }
}

import { CSSProperties } from "react";
import styles from "./grid-line.module.css";

export function GridLines() {
  return (
    <div aria-hidden className="bg-orange-bg relative w-[200px] h-[120px]">
      <GridLine direction="vertical" className="absolute bottom-0 left-0" />
      <GridLine direction="horizontal" className="absolute bottom-0 left-0" />
      <GridLine direction="vertical" className="absolute top-0 right-0" />
      <GridLine direction="horizontal" className="absolute top-0 right-0" />
    </div>
  );
}

export function GridLine({
  direction,
  color,
  className,
  size = 8,
}: {
  direction: "horizontal" | "vertical";
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      data-slot="grid-line"
      data-direction={direction}
      className={`${styles.gridLine} ${className}`}
      style={
        {
          "--color": color,
          ...(size && { "--size": `${size}px` }),
        } as CSSProperties
      }
    />
  );
}

# Blur fade
This fades out edges of containers and works on all four sides—top, right, bottom, and left. It is used all over the platform and in Next.js Dev Tools

The component API looks something like this:

<Fade
  background="var(--color-demo-bg)"
  className="w-full h-full"
  side="right"
  blur="6px"
  stop="25%"
/>

import * as React from "react";
import { cx } from "class-variance-authority";
import styles from "./fade.module.css";
import { Logo } from "components";

export function BlurFade() {
  return (
    <div className="relative py-0 [--bg:var(--color-demo-bg)] max-sm:scale-50">
      <Fade
        background="var(--bg)"
        className="w-full h-full"
        side="right"
        blur="6px"
        stop="25%"
      />
      <p className="text-64 flex items-center gap-3">
        <Logo size={40} />
        fadeeeeee
      </p>
    </div>
  );
}

export function Fade({
  stop,
  blur,
  side = "top",
  className,
  background,
  style,
  ref,
  debug,
}: {
  stop?: string;
  blur?: string;
  side: "top" | "bottom" | "left" | "right";
  className?: string;
  background: string;
  debug?: boolean;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      aria-hidden
      data-fade
      className={cx(styles.root, className)}
      data-side={side}
      style={
        {
          "--stop": stop,
          "--blur": blur,
          "--background": background,
          ...(debug && {
            outline: "2px solid var(--color-orange)",
          }),
          ...style,
        } as React.CSSProperties
      }
    />
  );
}

# Gesture hints
This component you might have seen. It hints at what gesture to perform on a given prototype. I thought this would be a nice component to include in case you need it.

The component API looks something like this:

<Gesture.Drag y="down" />
<Gesture.Press />
You can even customise and combine directions to create a diagonal gesture path:

<Gesture.Drag x={32} y={-16} />

import { cx } from "class-variance-authority";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

function Drag({
  x,
  y,
  play = true,
  className,
  size = 40,
}: {
  y?: "up" | "down" | number;
  x?: "left" | "right" | number;
  size?: number;
  play?: boolean;
  className?: string;
}) {
  const { resolvedTheme: theme } = useTheme();

  function getX() {
    if (typeof x === "number") return x;
    if (x === "left") return -32;
    if (x === "right") return 32;
    return 0;
  }

  function getY() {
    if (typeof y === "number") return y;
    if (y === "up") return -32;
    if (y === "down") return 32;
    return 0;
  }

  const x_ = getX();
  const y_ = getY();

  return (
    <motion.div
      key={String(theme)}
      animate={{
        opacity: play ? 1 : 0,
      }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className={cx(
        "absolute rounded-full pointer-events-none select-none",
        className
      )}
    >
      <motion.div
        animate={{
          ...(y !== undefined && { y: [0, 0, y_, 0] }),
          ...(x !== undefined && { x: [0, 0, x_, 0] }),
          scale: [1, 0.9, 1],
          background: [
            "var(--color-gray-a5)",
            "var(--color-gray-a8)",
            "var(--color-gray-a5)",
          ],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 1.4,
          ease: "easeInOut",
          duration: 1.2,
        }}
        className="rounded-full"
        style={{
          width: size,
          height: size,
        }}
      />
    </motion.div>
  );
}

function Press({
  play = true,
  className,
}: {
  play?: boolean;
  className?: string;
}) {
  const { resolvedTheme: theme } = useTheme();
  return (
    <motion.div
      key={String(theme)}
      animate={{
        opacity: play ? 1 : 0,
      }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className={cx(
        "absolute rounded-full pointer-events-none select-none",
        className
      )}
    >
      <motion.div
        animate={{
          scale: [1, 0.85, 1],
          background: [
            "var(--color-gray-a5)",
            "var(--color-gray-a8)",
            "var(--color-gray-a5)",
          ],
        }}
        transition={{
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: "easeInOut",
          duration: 1.2,
        }}
        className={pointer}
      />
    </motion.div>
  );
}

export const Gesture = Object.assign({}, { Drag, Press });

const pointer = "w-10 h-10 bg-gray-a5 rounded-full";

# Transition end
Did you know that there are two events available for knowing when an element stops animating: animationend and transitionend?

These can be useful to sync some UI with an animation, for example before scrolling to another heading you might want to wait until the sidebar closes 

You can actually set the event to be listened to only once like so:

function navigate(target: HTMLElement) {
  sidebarRef.current.addEventListener(
    "transitionend", 
    () => target.scrollIntoView(), 
    { once: true }
  );
  closeSidebar();
}
The listener is automatically cleaned up after the event fires once, so you don't have to worry about removing it.

# Generative avatars
Sometimes it is useful to generate beautiful fallback avatars for users that don't have a profile picture.

I use this component in Public bookmarks as a fallback avatar for bookmarks for URL-s that don't have a favicon. It will hash the given string and generate a unique gradient:

<Avatar.Fallback>Rauno Freiberg</Avatar.Fallback>
You can mess with the colors array used to generate the gradient for more customization:

const colors = ["#F6C750", "#E63525", "#050D4C", "#D4EBEE", "#74B06F"];

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cx } from "class-variance-authority";
import { getRandomColor, getUnit, hash } from "./utils";
import styles from "./avatar.module.css";

const DEFAULT_SIZE = 40;
const DEFAULT_FALLBACK_DELAY_MS = 500;

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  size?: number;
  fallbackDelayMs?: number;
}

export function AvatarFallbackExamples() {
  return (
    <div className="flex gap-4 py-4">
      <Avatar.Fallback size={60}>Rauno Freiberg</Avatar.Fallback>
      <Avatar.Fallback size={60}>John Doe 9</Avatar.Fallback>
      <Avatar.Fallback size={60}>Thomas Wilkinson</Avatar.Fallback>
      <Avatar.Fallback size={60}>Robert Demure 3</Avatar.Fallback>
    </div>
  );
}

export const AvatarImpl = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(
    {
      children,
      src,
      alt,
      size = DEFAULT_SIZE,
      fallbackDelayMs = DEFAULT_FALLBACK_DELAY_MS,
      className,
      style,
      ...rest
    },
    ref
  ) {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cx(styles.root, className)}
        style={{
          ...style,
          ["--size" as string]: `${size}px`,
        }}
        {...rest}
      >
        <AvatarPrimitive.Image asChild={!!children} src={src} alt={alt}>
          {children}
        </AvatarPrimitive.Image>
        <AvatarPrimitive.Fallback asChild delayMs={fallbackDelayMs}>
          <Fallback>{alt}</Fallback>
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);

// const colors = ["#FFAD08", "#EDD75A", "#74B06F"];
const colors = ["#F6C750", "#E63525", "#050D4C", "#D4EBEE"];
// const colors = ["#F6C750", "#E63525", "#E87D58"];

function Fallback({
  children,
  size = DEFAULT_SIZE,
}: {
  children: string;
  size?: number;
  className?: string;
}) {
  const titleId = React.useId();
  const properties = generateColors(children, colors);

  const maskId = React.useId();
  const filterId = React.useId();

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      role="img"
      aria-describedby={titleId}
      width={size}
      height={size}
    >
      <mask
        id={maskId}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={size}
        height={size}
      >
        <rect width={size} height={size} rx={size * 2} fill="#FFFFFF" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <rect width={size} height={size} fill={properties[0].color} />
        <path
          filter={`url(#${filterId})`}
          d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
          fill={properties[1].color}
          transform={`
            translate(${properties[1].translateX} ${properties[1].translateY})
            rotate(${properties[1].rotate} ${size / 2} ${size / 2})
            scale(${properties[1].scale})
          `}
        />
        <path
          filter={`url(#${filterId})`}
          style={{
            mixBlendMode: "overlay",
          }}
          d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
          fill={properties[2].color}
          transform={`
            translate(${properties[2].translateX} ${properties[2].translateY})
            rotate(${properties[2].rotate} ${size / 2} ${size / 2})
            scale(${properties[2].scale})
          `}
        />
      </g>
      <defs>
        <filter
          id={filterId}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={7} result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}

export function generateColors(name: string, colors: string[]) {
  const numFromName = hash(name);
  const range = colors && colors.length;

  const elementsProperties = Array.from({ length: 3 }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),
    translateX: getUnit(numFromName * (i + 1), DEFAULT_SIZE / 10, 1),
    translateY: getUnit(numFromName * (i + 1), DEFAULT_SIZE / 10, 2),
    scale: 1.2 + getUnit(numFromName * (i + 1), DEFAULT_SIZE / 20) / 10,
    rotate: getUnit(numFromName * (i + 1), 360, 1),
  }));

  return elementsProperties;
}

export const Avatar = Object.assign(AvatarImpl, { Fallback });
