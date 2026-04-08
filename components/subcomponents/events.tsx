
import React from 'react';

import Link from 'next/link';
import { events } from '@/components/eventDetails';
import Image from 'next/image';

const Events = () => {
    const eventToShow = events;

    if (!events || events.length === 0) {
        return <div className="text-center text-gray-300">No events available at the moment.</div>;
    }

    return (
        <div className="bg-[#151515] pb-10">
            <div className="md:px-12 xl:px-6">
                <header className="relative pt-36">
                    <div className="lg:w-2/3 text-center mx-auto">
                        <h1 className="text-[#bbc5c6] font-bold text-4xl md:text-6xl xl:text-7xl">
                            Events<span className="text-[#e2af3e]">.</span>
                        </h1>
                    </div>
                </header>
                <div className="mx-auto px-2 py-2 lg:px-10 lg:pt-12">
                    <div className="container justify-center lg:max-w-[1300px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {eventToShow.map((event,index) => (
                                <Link
                                 
                                    key={index}
                                    href={{ pathname: `/event/${event.alias}` }}
                                    aria-label={`View details for ${event.name}`}
                                >
                                    <div className="bg-slate-100 p-3 rounded-3xl m-4">
                                        <div className="relative h-64 w-full">
                                            <Image
                                                className="h-auto max-w-full rounded-xl"
                                                src={event.image}
                                                alt={event.name || 'Event image'}
                                                fill
                    
                                            />
                                        </div>
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 pt-3 text-center">
                                            {event.name}
                                        </h5>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text-center lg:w-2/3 mx-auto">
                    <Link href={{ pathname: '/events', query: { allEvents: true, showNav: true } }}>
                        <button
                            type="button"
                            className="text-[#bbc5c6] bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            More Events
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Events;
