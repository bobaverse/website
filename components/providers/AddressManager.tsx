'use client';
import { getAddressFromCookie, setAddressCookie } from "@/components/providers/cookie-server-action";
import { cookies } from "next/headers";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const AddressManager = () => {
  const { address } = useAccount();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Promise.resolve(getAddressFromCookie()).then((addr) => {
        if (addr !== (address || "")) {
          setAddressCookie(address || "");
        }
      })
    }
  }, [address]);
  return null;
}

export default AddressManager;
