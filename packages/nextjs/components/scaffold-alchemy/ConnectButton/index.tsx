"use client";

// @refresh reset
import { useAuthModal } from "@account-kit/react";
import { useClient } from "~~/hooks/scaffold-alchemy/useClient";

export const ConnectButton = () => {
  const { openAuthModal } = useAuthModal();
  const { address } = useClient();
  const connected = !!address;

  if (!connected) {
    return (
      <button className="bg-blue-600 text-white px-8 py-2 rounded-full" onClick={openAuthModal} type="button">
        Login
      </button>
    );
  }

  if (!address) {
    return <></>;
  }

  return (
    <div className="bg-blue-100 text-blue-600 px-6 py-2 rounded-full">
      {address ? address.slice(0, 6) + "..." + address.slice(-4) : ""}
    </div>
  );
};
