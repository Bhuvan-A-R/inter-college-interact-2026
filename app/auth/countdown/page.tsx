"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const targetDate = new Date("2025-03-24T00:00:00").getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Card className="p-8 bg-gradient-to-r from-yellow-300 to-yellow-500 text-[#990000] container max-w-2xl shadow-lg mx-auto text-center space-y-6 mt-24 mb-24">
      {/* Updated Heading Section */}
      <div className="space-y-2">
        <h1 className="text-4xl leading-loose font-bold ">Thanks for registering for </h1>
        <h1 className="text-5xl text-blue-900 animate-bounce leading-loose font-bold ">VTU YOUTH FEST</h1>
        <p className="text-muted-foreground text-white text-xl">Event starts on March 24, 2025</p>
      </div>

      {/* Countdown Timer */}
      <div className="flex justify-center gap-4 flex-wrap">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>

      <div>
        <Link href={"/register/getregisterview"} className="text-red-600 text-lg hover:underline"> Click Here To View Registered List</Link>
      </div>
    </Card>
  );
}

// TimeBlock component remains the same
function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-muted p-6 rounded-lg min-w-[100px]   ">
      <div className="text-4xl font-bold tabular-nums">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        {label}
      </div>
    </div>
  );
}