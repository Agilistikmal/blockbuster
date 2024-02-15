"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [server, setServer] = useState();
  useEffect(() => {
    async function loadServer() {
      const res = await fetch("/api/server", {
        headers: {
          "X-API-KEY": "1123",
        },
      });
      const data = await res.json();
      setServer(data.data);
    }
    loadServer();
  }, []);
  return (
    <>
      <div className="rounded-xl px-8 py-5 bg-dark/50 text-white max-w-screen-xl mx-auto flex items-center justify-between relative">
        <Link href={"/"} className="flex items-center gap-4">
          <Image
            src="/logo.jpg"
            alt=""
            width={64}
            height={64}
            className="h-[64px] rounded-full"
          />
          <h1 className="font-bold text-3xl hidden md:inline-block">
            {server?.name}
          </h1>
        </Link>
        <div className="items-center gap-8 hidden sm:flex">
          <Link href={"/"} className="font-medium uppercase">
            Home
          </Link>
          <Link href={"/store"} className="font-medium uppercase">
            Store
          </Link>
          <Link href={"/staff"} className="font-medium uppercase">
            Staff
          </Link>
          <Link
            href={"/discord"}
            target="_blank"
            className="font-medium uppercase"
          >
            Discord
          </Link>
        </div>
        <div className="block sm:hidden">
          <button onClick={() => setMenu(!menu)}>
            <Image
              src={"/icon/menu.svg"}
              width={0}
              height={0}
              className="w-[48px]"
            />
          </button>
          {menu && (
            <div className="absolute top-[100px] right-0 w-full bg-dark/70 p-5">
              <div className="flex flex-col gap-4">
                <Link href={"/"} className="font-medium uppercase">
                  Home
                </Link>
                <Link href={"/store"} className="font-medium uppercase">
                  Store
                </Link>
                <Link href={"/staff"} className="font-medium uppercase">
                  Staff
                </Link>
                <Link
                  href={"/discord"}
                  target="_blank"
                  className="font-medium uppercase"
                >
                  Discord
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
