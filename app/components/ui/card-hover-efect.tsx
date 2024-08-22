"use client"
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { CardStack } from "./card-stack";

export const HoverEffect = ({
    items,
    offset,
    scaleFactor,
  }: {
    items: any[];
    offset?: number;
    scaleFactor?: number;
  }) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-20 mt-80 gap-10",
      )}
    >
      {items.map((item, idx) => (
        <div
        //   href={item?.link}
          key={item?.id}
          className="relative group  block p-2 h-full w-full py-16"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute -inset-y-16 -inset-x-[1px] h-[120%] w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl "
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          {/* <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card> */}
          <CardStack items={item}  />
        </div>
      ))}
    </div>
  );
};
