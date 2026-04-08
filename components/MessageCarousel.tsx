"use client"
import React from 'react'
import cheif1 from '@/public/dignitaries/images-2.jpeg.jpg'
import organize1 from '@/public/dignitaries/hbp.png'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"

const MessageCarousel = () => {
    const messageList = [
        {
            name: "Sri. D. K. Shivakumar",
            image: cheif1,
            message: "As you cross the traditional threshold and step into the portals of GLOBAL ACADEMY OF TECHNOLOGY, the realm of professional education is unfastened to achieve your goals and fulfil your dreams. I look forward to your becoming just not an engineer or a manager, but a person with holistic approach to contribute to our nation’s prosperity through individual growth. We @GAT, simply believe in and tread the path of Quality & Discipline, the basic mantra of success.\n\nYou have entered an educational experience that goes far beyond the professional course of your choice in engineering and management. @GAT, we offer multiple opportunities for you to experience as you learn and contribute to the betterment of the society. This should also translate into benefiting the mankind through your technical knowledge & management skill and innate sensitivity to the dynamics of the times and environment around us.\n\nYou are the future of our great nation and our vision is to see you as responsible individuals with the pursuit of excellence as your motto in all that you undertake.",
            header: "Chairman, NEF"
        },
        {
            name: "Dr. Balakrishna H. B.",
            image: organize1,
            message: "Dear Students,\n\nI am very happy to meet you through this page. Global Academy of Technology has stood above the rest in its approach to its education and in its pedagogies. The methods we used to teach and the ways by which our students learn are unique and creative. Consistently, we never hesitated to investigate our deficiencies and transform us to an agent of social change. The institute has substantially contributed to the process of National building by providing quality education and thereby enabling the students to become globally competent. We have plans and dreams in the years to come. We propose to introduce Academic Audit for every department by external experts. This aims at regular scrutiny of the quality teaching and the content of teaching.\n\nEducation is not an act of acquiring knowledge but learning a skill to lead life and forming one’s personality. This is an ennobling process of growth. I can boldly say that we have excelled in every initiative that we undertook, and we have stood together in facing the challenges in realizing quality education. In all this, we have made every effort to be sensitive and compassionate to the marginalized and the people in need.\n\nGrowing Ahead of Time ....\n\nMy best wishes to all prospective students and regards to the parents for having bestowed their faith in us.\n\nRemaining at your service 24X7,",
            header: "Principal, GAT"
        }
    ]
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false})
    )
    return (
        <Carousel className="w-[50%] mt-20 shadow-primary shadow-inner shadow-lg rounded-lg"
            plugins={[plugin.current]}
            >
            <CarouselContent>
                {messageList.map((person, index) => (
                    <CarouselItem key={index}>
                        <div>
                            <Card className="border-0 border-collapse">
                                <CardHeader>
                                    <div className="flex flex-col items-center justify-center gap-7">
                                        <h2 className="font-sans text-xl font-bold">
                                            Message From {person.name}
                                        </h2>
                                        <div>
                                            <Image
                                                alt="User Image"
                                                src={person.image}
                                                className="rounded-full border shadow shadow-black"
                                                width={200}
                                                height={200} // Explicit height for better layout control
                                            />
                                            <h5 className="mt-3 font-semibold text-gray-600 text-xl">
                                                {person.header}
                                            </h5>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-col mt-3 items-center justify-center">
                                    <p className="text-justify mx-5 whitespace-pre-wrap">
                                        {person.message}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default MessageCarousel