"use client";
import React from "react";
import MenuCard from "../card/MenuCard";
import { usePathname } from "next/navigation";

const MenuList = ({ userId }) => {
  const pathname = usePathname();

  const episodeUrl = pathname + "/" + userId + "/new-episode";
  const dashboardUrl = pathname + "/" + userId;
  const homeUrl = pathname + "/" + userId + "/home";

  return (
    <div className=" grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3  gap-2 ">
      <MenuCard
        link={episodeUrl}
        title="Create New Episode"
        image="/play.jpg"
      />
      <MenuCard link={homeUrl} title="Home" image="/podcast.jpg" />
      <MenuCard link={dashboardUrl} title="Dashboard" image="/folder.jpg" />
    </div>
  );
};

export default MenuList;
