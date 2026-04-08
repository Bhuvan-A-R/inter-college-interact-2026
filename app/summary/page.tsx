"use client";
import Image from "next/image";


import React, { useEffect, useState } from "react";
import { EventList, eventsList } from "@/data/eventList";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EventPage = () => {
    const [searchParam, setSearchParam] = useState<string>("");
    const [eventList, setEventList] = useState<EventList[]>(eventsList);
    
    useEffect(()=>{
        setEventList(eventsList.filter((event) => event.name.toLowerCase().includes(searchParam.toLowerCase()) || event.category.toLowerCase().includes(searchParam.toLowerCase())));
    },[searchParam])

    return (
        <div className="bg-background min-h-screen mt-20">
            {/* Main Header */}
            <header className="relative py-10 md:py-10 text-center bg-gradient-to-b from-background to-secondary">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-primary font-bold text-4xl md:text-6xl xl:text-7xl mb-6">
                        Events
                    </h1>
                    <p className="text-muted-foreground  text-lg md:text-xl">
                        Welcome to the Events Page! Dive into the world of creativity,
                        passion, and competition.
                    </p>
                </div>
            </header>
            <div className="flex gap-10 md:flex-row flex-col mt-5 mx-10 ">
            {/* The Search Bar and categories */}
            <div className="w-full ">
                <Input
                    type="text"
                    className="w-full"
                    placeholder="Search for events"
                    onChange={(e) => { 
                        let value = e.target.value;
                        if(value==="Fine - Arts" || value==="finearts" || value==="Fine -Arts" || value==="fine-arts" || value==="fine- arts"){
                            value="fine arts";
                        }
                        setSearchParam(value)}}
                />
            </div>

            <div className="w-full">
            <Button onClick={()=>setSearchParam("dance")} className="rounded-none hover:font-bold hover:scale-110 rounded-l-lg ">Dance</Button>
            <Button  onClick={()=>setSearchParam("fine arts")} className="rounded-none hover:font-bold hover:scale-110  hover:border-l-[0.75px] ">FINE - ARTS</Button>
            <Button  onClick={()=>setSearchParam("THEATRE")} className="rounded-none hover:font-bold hover:scale-110  hover:border-l-[0.75px] ">THEATRE</Button>
            <Button  onClick={()=>setSearchParam("literary")} className="rounded-none hover:font-bold hover:scale-110  hover:border-l-[0.75px] ">LITERARY</Button>
            <Button  onClick={()=>setSearchParam("music")} className="rounded-none rounded-r-lg hover:font-bold hover:scale-110  hover:border-l-[0.75px] ">MUSIC</Button>
            </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-10 mx-10 overflow-auto ">
                {eventList && eventList.map((event, index) => (
                    <div className="flex w-fit" key={index}>
                        <Card>
                            <Image
                                alt={event.name}
                                src={event.image}
                                className="rounded rounded-sm "
                                
                            />
                            <CardHeader>
                                <h3 className="text-2xl font-semibold leading-none text-yellow-500 tracking-tight">
                                    {event.name}
                                </h3>
                            </CardHeader>

                            <CardContent>
                                <div>
                                    <h3 className="mb-2 text-blue-600 font-extrabold">Rules</h3>
                                    <ul>
                                        {event.rules.map((rule, index) => (
                                            <li
                                                key={index}
                                                className=" slashed-zero proportional-nums text-pretty antialiased text-sm text-pretty tracking-normal leading-8 text-muted-foreground"
                                            >
                                                {index == 0 ? (
                                                    <span className="text-xl">👤</span>
                                                ) : index == 1 ? (
                                                    <span className="text-xl">⏱️</span>
                                                ) : index===2? (
                                                    <span className="text-xl"> 👥</span>
                                                ):(<span className="text-xl">➡️</span>)}{" "
                                                    
                                                }{" "}
                                                {rule}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-2 text-right font-semibold text-pretty  slashed-zero proportional-nums  antialiased text-sm text-pretty tracking-normal leading-6 ">
                                        <h3 className="mb-2 text-blue-600 font-extrabold">
                                            Event Co-Ordinator
                                        </h3>
                                        {event.coordinator && (
                                            <ul>
                                                {event.coordinator && (
                                                    <span>
                                                        {event.coordinator.name} {event.coordinator.mobile}
                                                    </span>
                                                )}
                                            </ul>
                                        )}
                                        {event.coordinators && (
                                            <ul>
                                                {event.coordinators &&
                                                    event.coordinators.map((coordinator, index) => (
                                                        <li key={index}>
                                                            {coordinator.name} - {coordinator.mobile}
                                                        </li>
                                                    ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventPage;
