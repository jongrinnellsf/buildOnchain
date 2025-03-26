"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthModal, useChain, useLogout, useUser } from "@account-kit/react";
import { useClient } from "~~/hooks/scaffold-alchemy/useClient";

const Home = () => {
  const { openAuthModal } = useAuthModal();
  const { logout } = useLogout();
  const user = useUser();
  const { chain } = useChain();
  const { address } = useClient();
  const isConnected = !!user;
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setAddressCopied(true);
    setTimeout(() => {
      setAddressCopied(false);
    }, 2000);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100">
      <div className="flex justify-between items-center w-full p-4 bg-black/80">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <div className="flex items-end">
              <span
                className="text-3xl text-white"
                style={{ fontWeight: 400, lineHeight: 1, fontFamily: "'Kalam', cursive" }}
              >
                ✨Vibe onchain
              </span>
            </div>
          </h1>
        </div>
        {isConnected ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="bg-gray-800 text-white px-6 py-2 rounded-full cursor-pointer flex items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.email || "Connected"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                <div className="p-4 border-b border-gray-700">
                  <p className="text-gray-300 text-sm">Account</p>
                  <p className="text-white font-semibold">{user.email || "Connected"}</p>
                </div>
                {chain && (
                  <div className="p-4 border-b border-gray-700">
                    <p className="text-gray-300 text-sm">Network</p>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-white font-medium">{chain.name}</p>
                    </div>
                  </div>
                )}
                {address && (
                  <div className="p-4 border-b border-gray-700">
                    <p className="text-gray-300 text-sm">ETH Address</p>
                    <div className="flex items-center justify-between">
                      <p className="text-white font-mono">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </p>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          copyToClipboard(address);
                        }}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {addressCopied ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )}
                <div className="p-2">
                  <button
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="gradient-btn px-8 py-2 rounded-full" onClick={openAuthModal}>
            Login
          </button>
        )}
      </div>

      <div
        className="hero min-h-[600px] relative overflow-hidden"
        style={{ backgroundImage: "url(/hero.png)", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="hero-gradient"></div>

        <div
          className={`absolute left-0 p-10 md:p-12 lg:p-16 max-w-2xl z-10 transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ top: "120px" }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
            <span className="block vibe-text">Bring your idea</span>
            <span className="block">
              <span className="onchain-glow" data-text="onchain" style={{ fontWeight: 300 }}>
                onchain
              </span>
            </span>
            <span className="block vibe-text">instantly</span>
          </h1>
          <p className="text-xl text-white">
            Copy & paste instructions into your code editor to
            <br />
            build your onchain app in seconds
          </p>
        </div>
      </div>

      {!isConnected ? (
        <div className="flex-grow flex flex-col items-center justify-center p-8 bg-black">
          <div className="p-8 rounded-lg bg-gray-900/50 text-center max-w-md shadow-lg border border-gray-800">
            <p className="text-gray-300 text-lg">Please login to catch a vibe</p>
          </div>
        </div>
      ) : (
        <div className="w-full bg-black py-8">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="card bg-gray-900/50 shadow-md border border-gray-800 hover:shadow-xl transition-all duration-300"
                >
                  <figure className="p-6 pt-6">
                    <div className="w-full h-40 bg-gray-800/80 rounded-lg"></div>
                  </figure>
                  <div className="card-body p-6 pt-2">
                    <h3 className="card-title text-white">Project {i}</h3>
                    <p className="text-gray-300">Project description goes here</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
