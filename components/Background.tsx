"use client";

import { useState, useEffect, useRef, TouchEvent } from "react";
import Image from "next/image";

// Optional arrow icons (Tailwind Heroicons style)
const ArrowLeftIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
        />
    </svg>
);

const ArrowRightIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
    </svg>
);

const Background = () => {
    // 1) Carousel images. Replace with your own paths or URLs:
    const images = [
        "/images/carouselimg1.jpeg",
        "/images/carouselimg2.jpeg",
        "/images/carouselimg3.jpeg",
        "/images/carouselimg4.jpeg",
        "/images/carouselimg5.jpeg",
        "/images/carouselimg6.jpeg",
    ];

    // 2) Current slide index
    const [currentIndex, setCurrentIndex] = useState(0);

    // 3) Touch positions for swipe gestures
    const touchStartXRef = useRef<number | null>(null);
    const touchEndXRef = useRef<number | null>(null);

    // 4) Auto-play interval
    useEffect(() => {
        const autoSlide = setInterval(() => {
            handleNext();
        }, 5000); // 5 seconds
        return () => clearInterval(autoSlide);
    }, []);

    // 5) Go to previous slide
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // 6) Go to next slide
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    // 7) Handle touch start
    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        touchStartXRef.current = e.touches[0].clientX;
    };

    // 8) Handle touch move
    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        touchEndXRef.current = e.touches[0].clientX;
    };

    // 9) Handle touch end (decide if user swiped left or right)
    const handleTouchEnd = () => {
        if (!touchStartXRef.current || !touchEndXRef.current) return;
        const distance = touchStartXRef.current - touchEndXRef.current;
        // A threshold to detect a swipe
        const swipeThreshold = 50;

        if (distance > swipeThreshold) {
            // Swipe left -> next
            handleNext();
        } else if (distance < -swipeThreshold) {
            // Swipe right -> prev
            handlePrev();
        }

        // Reset refs
        touchStartXRef.current = null;
        touchEndXRef.current = null;
    };

    return (
        <div className="relative w-full h-[600px] overflow-hidden bg-gray-900 text-white">
            {/* Outer wrapper to capture touch events and display the horizontal slider */}
            <div
                className="w-full h-full flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Map each image to a slide. Each slide takes 100% of the container width. */}
                {images.map((imgSrc, idx) => (
                    <div
                        key={idx}
                        className="w-full h-full flex-shrink-0 relative"
                    >
                        <Image
                            src={imgSrc}
                            alt={`Slide ${idx}`}
                            fill
                            priority={idx === 0}
                            className="object-fit"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                        <div className="absolute bottom-8 left-8 z-10">
                            {/* <h2 className="text-3xl font-bold">
                                Slide {idx + 1}
                            </h2>
                            <p className="mt-2 max-w-md">
                                This is a sample caption for slide {idx + 1}.
                            </p> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Arrows for manual navigation */}
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white hover:text-black p-3 rounded-full transition-colors"
            >
                <ArrowLeftIcon />
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white hover:text-black p-3 rounded-full transition-colors"
            >
                <ArrowRightIcon />
            </button>

            {/* Dots Indicators */}
            <div className=" flex container ">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            currentIndex === idx ? "bg-white" : "bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Background;
