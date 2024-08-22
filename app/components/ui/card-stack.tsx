"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval: any;

type Card = {
    idUser: number;
    id: number;
    title: string;
    body: string;
    content: React.ReactNode;
};

export const CardStack = ({
    items,
    offset,
    scaleFactor,
}: {
    items: Card[];
    offset?: number;
    scaleFactor?: number;
}) => {
    const CARD_OFFSET = offset || 10;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState<Card[]>(items);

    useEffect(() => {
        startFlipping();

        return () => clearInterval(interval);
    }, []);
    const startFlipping = () => {
        const getRandomTime = Math.floor(Math.random() * (5000 - 8000)) + 8000;
        interval = setInterval(() => {
            setCards((prevCards: Card[]) => {
                const newArray = [...prevCards]; // create a copy of the array
                newArray.unshift(newArray.pop()!); // move the last element to the front
                return newArray;
            });
        }, getRandomTime);
    };

    return (
        <div className="relative  h-70 w-60 md:h-60 md:w-96 ">
            {cards.map((card, index) => {
                return (
                    <motion.div
                        key={card.id}
                        className="absolute dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
                        style={{
                            transformOrigin: "top center",
                        }}
                        animate={{
                            top: index * -CARD_OFFSET,
                            scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
                            zIndex: cards.length - index, //  decrease z-index for the cards that are behind
                        }}
                    >
                        <div className="font-normal text-neutral-700 dark:text-neutral-200">
                            {card.body}
                        </div>
                        <div>
                            <p className="text-neutral-500 font-medium dark:text-white">
                                {card.title}
                            </p>
                            <p className="text-neutral-400 font-normal dark:text-neutral-200">
                                {card.id}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
