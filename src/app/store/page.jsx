"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Store() {
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    async function loadStore() {
      const res = await fetch("/api/store", {
        headers: {
          "X-API-KEY": "1123",
        },
      });
      const data = await res.json();
      setRanks(data.data);
    }
    loadStore();
  });
  return (
    <>
      <div className="bg-[url('/bg/3.jpg')] min-h-dvh">
        <div className="bg-gradient-to-t from-dark to-blue/10 absolute top-0 left-0 w-full h-full"></div>
      </div>
      <div className="absolute top-0 left-0 w-full text-white py-[144px]">
        <h1 className="font-medium text-3xl text-center">Store</h1>
        <div className="w-full max-w-screen-xl mx-auto px-8 mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
            {ranks.map((rank, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-navy/70 mx-auto w-full max-w-sm flex flex-col justify-between"
              >
                <div>
                  <div className="grid grid-cols-2 gap-4 items-center justify-center">
                    <Image
                      src={"/assets/moneybag.webp"}
                      width={96}
                      height={96}
                      className="w-[96px] mx-auto"
                    />
                    <div>
                      <h1 className="font-bold text-2xl text-bone">
                        {rank.name}
                      </h1>
                      <p className="text-orange-300">
                        IDR {Intl.NumberFormat("ID-id").format(rank.price)}
                      </p>
                    </div>
                  </div>
                  <hr className="my-2 border-bone/25 border-2" />
                  <div>
                    <h1 className="font-semibold">Perks</h1>
                    <div className="grid grid-cols-2 gap-x-2">
                      {rank.perks.split(",").map((perk, i) => (
                        <li key={i} className="list-none text-bone/80">
                          - {perk}
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <Link
                    href={"https://wa.me/6285888881550"}
                    className="btn w-full"
                  >
                    Purchase
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
