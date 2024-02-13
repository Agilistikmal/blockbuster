"use client";

import Image from "next/image";
import { useState } from "react";

export default function Staff() {
  const [staffList, setStaffList] = useState([
    {
      username: "Agilistikmal",
      role: "CEO",
    },
    {
      username: "Skeleton",
      role: "COO",
    },
    {
      username: "Creeper",
      role: "Moderator",
    },
  ]);
  return (
    <>
      <div className="bg-[url('/bg/2.jpg')] min-h-dvh">
        <div className="bg-gradient-to-t from-dark to-blue/10 absolute top-0 left-0 w-full h-full"></div>
      </div>
      <div className="absolute top-0 left-0 w-full text-white py-[144px]">
        <div className="w-full max-w-screen-xl mx-auto px-8">
          <h1 className="font-medium text-3xl text-center">Staff List</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center mt-5">
            {staffList.map((staff, i) => (
              <>
                <div
                  key={i}
                  className="p-5 rounded-xl bg-navy/70 text-white text-center w-full max-w-sm mx-auto border-b-4 border-transparent hover:border-blue hover:shadow-xl transition duration-500"
                >
                  <Image
                    src={`https://mineskin.eu/helm/${staff.username}`}
                    width={96}
                    height={96}
                    className="w-[96px] mx-auto"
                  />
                  <h1 className="font-medium text-xl text-center">
                    {staff.username}
                  </h1>
                  <h2 className="text-orange-300">{staff.role}</h2>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
