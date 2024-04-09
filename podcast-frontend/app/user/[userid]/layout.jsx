import Sidebar from "@/components/menu/Sidebar";
import React from "react";

export default async function layout({ children, params }) {
  return (
    <main className=" flex ">
      <Sidebar userid={params.userid} />
      {children}
    </main>
  );
}
