"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [server, setServer] = useState();
  const [copied, setCopied] = useState(false);
  const [serverStatus, setServerStatus] = useState();

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

  useEffect(() => {
    async function loadStats() {
      const res = await fetch(
        `https://api.mcstatus.io/v2/status/java/${server?.ip}`
      );
      const data = await res.json();
      setServerStatus(data);
    }
    loadStats();
  }, [server]);

  function handleCopyIP() {
    navigator.clipboard.writeText(server.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }
  return (
    <>
      <div className="bg-[url('/bg/1.jpg')] min-h-dvh">
        <div className="bg-gradient-to-t from-dark to-blue/10 absolute top-0 left-0 w-full h-full"></div>
      </div>
      <div className="absolute top-0 left-0 w-full text-white pt-[144px]">
        <div className="w-full max-w-screen-xl mx-auto px-8 mt-24">
          <div className="text-center">
            <h1 className="font-semibold text-3xl sm:text-6xl uppercase">
              {server?.name}
            </h1>
            <p className="tracking-widest text-xl lowercase">{server?.ip}</p>
            <div className="text-center">
              <span className="text-orange-200">
                {serverStatus?.players.online}
              </span>
              /
              <span className="text-orange-300">
                {serverStatus?.players.max}
              </span>{" "}
              players
            </div>
            <p className="text-center text-sm text-bone/70">
              {serverStatus?.version.name_clean}
            </p>
            <div className="px-5 py-2 rounded-xl bg-dark/50 w-max mx-auto mt-5 hidden sm:block">
              <div
                dangerouslySetInnerHTML={{
                  __html: serverStatus?.motd.html,
                }}
              ></div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              className="btn relative text-nowrap text-sm sm:text-base"
              onClick={() => handleCopyIP()}
            >
              {copied ? "Copied" : "Copy IP Address"}
            </button>
            <Link
              href={server?.discord ? server.discord : "/"}
              target="_blank"
              className="btn-outline text-nowrap text-sm sm:text-base"
            >
              Join Discord
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
