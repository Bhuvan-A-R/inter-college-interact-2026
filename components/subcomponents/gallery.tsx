"use client";
import React, { useEffect, useState } from "react";
import {
    image1,
    image2,
    image12,
    image14,
    image15,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image16,
    image17,
    image18,
    image19,
    image20,
    image21,
    image22,
    image23,
    image24,
    image25,
    image26,
    image27,
    image28,
    image29,
    image30,
    image31,
    image32,
    image33,
    image34,
    image35,
    image36,
    image37,
    image38,
    image39,
    image40,
    image41,
    image42,
    image43,
    image44,
    image45,
    image46,
    image47,
    image48,
    image49,
    image50,
    image51,
} from "@/components/images/gallery";
import { useRouter } from "next/navigation";
import Image from "next/image";

const images = [
    {
        image: image1,
        className: "big",
    },
    {
        image: image49,
        className: "wide",
    },
    {
        image: image5,
        className: "tall",
    },
    {
        image: image2,
        className: "",
    },
    {
        image: image50,
        className: "",
    },
    {
        image: image6,
        className: "tall",
    },
    {
        image: image9,
        className: "big",
    },
    {
        image: image8,
        className: "",
    },
    {
        image: image20,
        className: "wide",
    },
    {
        image: image15,
        className: "big",
    },
    {
        image: image25,
        className: "tall",
    },
    {
        image: image3,
        className: "",
    },
    {
        image: image46,
        className: "",
    },
    {
        image: image22,
        className: "",
    },
    {
        image: image18,
        className: "",
    },
    {
        image: image21,
        className: "",
    },
    {
        image: image12,
        className: "",
    },
    {
        image: image40,
        className: "",
    },
    {
        image: image24,
        className: "big",
    },
    {
        image: image17,
        className: "",
    },
    {
        image: image34,
        className: "tall",
    },
    {
        image: image43,
        className: "wide",
    },
    {
        image: image26,
        className: "",
    },
    {
        image: image27,
        className: "tall",
    },
    {
        image: image29,
        className: "big",
    },
    {
        image: image28,
        className: "",
    },
    {
        image: image30,
        className: "",
    },
    {
        image: image31,
        className: "big",
    },
    {
        image: image32,
        className: "tall",
    },
    {
        image: image33,
        className: "",
    },
    {
        image: image23,
        className: "",
    },
    {
        image: image35,
        className: "",
    },
    {
        image: image36,
        className: "",
    },
    {
        image: image38,
        className: "",
    },
    {
        image: image39,
        className: "",
    },
    {
        image: image42,
        className: "big",
    },
    {
        image: image48,
        className: "tall",
    },
    {
        image: image19,
        className: "",
    },
    {
        image: image14,
        className: "",
    },
    {
        image: image44,
        className: "",
    },
    {
        image: image45,
        className: "",
    },
    {
        image: image47,
        className: "",
    },
    {
        image: image41,
        className: "wide",
    },
];

const Gallery = () => {
    const router = useRouter();

    return (
        <>
            <section className="p-10 md:p-20">
                <div className="md:px-12 xl:px-6">
                    <div className="relative pt-36 ">
                        <div className="lg:w-2/3 md:text-center  mx-auto">
                            <h1 className="text-secondary font-bold text-4xl md:text-6xl xl:text-7xl">
                                GLIMPSE OF{" "}
                                <span className="">VTU Youth Festival</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="grid-wrapper  mt-10">
                    {images.map((item, index) => (
                        <div key={index} className={item.className}>
                            <Image src={item.image} alt="" />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Gallery;
