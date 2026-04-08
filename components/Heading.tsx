"use client"
import React from "react"
const Heading: React.FC<props> = ({ label} ) => {



    return <div className =" font-bold text-4xl pt-6 text-black pb-6 px-5">
            <h1>
                {label}
            </h1>
        </div>

}
interface props{
    label:string
}

export default Heading;

