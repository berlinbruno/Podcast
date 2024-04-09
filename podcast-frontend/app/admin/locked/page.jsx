import LockedUserPinList from "@/components/list/LockedUserPinList";
import React from "react";

export default async function page() {
  return (
    <section className=" container mx-auto">
      <LockedUserPinList />
    </section>
  );
}
