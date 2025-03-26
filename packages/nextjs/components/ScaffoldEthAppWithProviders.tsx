"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { Footer } from "~~/components/Footer";
import { useInitializeNativeCurrencyPrice } from "~~/hooks/scaffold-alchemy";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  useInitializeNativeCurrencyPrice();

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <main className="relative flex flex-col flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: "#1f2937", // gray-800
            color: "#f3f4f6", // gray-100
            border: "1px solid #374151", // gray-700
          },
        }}
      />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ProgressBar height="3px" color="#3b82f6" />
        <ScaffoldEthApp>{children}</ScaffoldEthApp>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
