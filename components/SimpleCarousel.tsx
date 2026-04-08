"use client"; // Because we'll use state and side effects in Next.js App Router

import { useState } from "react";
import Image from "next/image";

interface SimpleCarouselProps {
    images: string[];
}

const SimpleCarousel: React.FC<SimpleCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto my-10 border-4 border-gray-300 rounded-xl shadow-lg overflow-hidden">
            {/* Current Image */}
            <div className="flex transition-transform duration-700 ease-in-out transform">
                <Image
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    width={1920}
                    height={1080}
                    className="object-cover w-full h-auto rounded-lg"
                />
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800/70 text-white hover:bg-gray-900 rounded-full p-3 transition-all duration-300 shadow-md"
            >
                ⬅
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800/70 text-white hover:bg-gray-900 rounded-full p-3 transition-all duration-300 shadow-md"
            >
                ➡
            </button>

            {/* Dots or indicators */}
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                            idx === currentIndex
                                ? "bg-blue-600 scale-125 shadow-md"
                                : "bg-gray-400"
                        }`}
                        onClick={() => setCurrentIndex(idx)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default SimpleCarousel;
