import { Card, CardHeader } from "../ui/card";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

const ChannelCard = ({ user }) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-start sm:justify-start flex-wrap w-full gap-2 items-center">
        <span className=" w-full max-w-[150px]">
          {user?.profileUrl ? (
            <AspectRatio ratio={1 / 1}>
              <Image
                src={user.profileUrl}
                fill
                priority
                alt="Channel_Logo"
                className=" rounded-md object-cover bg-muted"
              />
            </AspectRatio>
          ) : (
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/podcast.jpg"
                fill
                alt="Channel_Logo"
                className=" rounded-md object-cover bg-muted"
              />
            </AspectRatio>
          )}
        </span>
        <h1 className="main-title">@{user?.name}</h1>
      </CardHeader>
    </Card>
  );
};

export default ChannelCard;
