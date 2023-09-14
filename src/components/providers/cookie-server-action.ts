'use server';

import { cookies } from "next/headers";
import { Address } from "viem";

export const setAddressCookie = async (address: string) => {
  cookies().set({
    name: 'bv-address',
    value: address,
    httpOnly: true,
    path: "/",
    maxAge: 86_400,
  })
}

export const getAddressFromCookie = () => {
  const c = cookies().get("bv-address");
  if (c) {
    return c.value as Address;
  }
  return "" as Address;
}
