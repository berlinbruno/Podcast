import React from "react";
import { Card, CardHeader } from "../ui/card";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

const PreviewChannelCard = ({ user, profileUrl }) => {
  return (
    <Card>
      <CardHeader className="flex sm:flex-row flex-col items-center gap-2">
        <div className=" w-full max-w-[200px]">
          {user.image === null && profileUrl !== null ? (
            <AspectRatio ratio={1 / 1}>
              <Image
                src={profileUrl}
                fill
                alt="Channel_Logo"
                className=" rounded-md object-cover bg-muted"
              />
            </AspectRatio>
          ) : (
            <AspectRatio ratio={1 / 1}>
              <Image
                src={user?.imagePreview}
                fill
                alt="Channel_Logo"
                className=" rounded-md object-cover bg-muted"
              />
            </AspectRatio>
          )}
        </div>
        <p className="main-title capitalize truncate">@{user?.name}</p>
      </CardHeader>
    </Card>
  );
};

export default PreviewChannelCard;
