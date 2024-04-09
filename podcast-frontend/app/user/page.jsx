import MenuList from "@/components/list/MenuList";
import { cookies } from "next/headers";
import React from "react";

export default async function page() {
  const cookieStore = cookies();
  const { value } = cookieStore.get("userId");

  return (
    <section className=" container mx-auto">
      <div className=" flex flex-col gap-2 my-2 justify-center items-center min-h-screen">
        <h2 className=" sub-title">Welcome to Podcasts!</h2>
        <p className="text-lg hidden sm:block">
          Let&apos;s get started by creating a new podcast or importing a
          podcast from another hosting platform.
        </p>
        <MenuList userId={value} />
      </div>
    </section>
  );
}
