import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { PlayIcon } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import { timeAgo } from "@/utils/format";
import { Badge } from "../ui/badge";

const PinCard = ({ podcast }) => {
  const url = `/${podcast?.podcastId}`;

  return (
    <Link href={url} className=" sm:max-w-[500px]">
      <Card className=" h-full hover:scale-105 transition-all ease-in-out duration-75 z-10">
        <CardHeader>
          <div className="relative group cursor-pointer flex justify-center w-full ">
            <>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={podcast?.authorProfileUrl || "/podcast.jpg"}
                  fill
                  priority
                  alt="imagePreview"
                  className="rounded-md object-cover bg-muted"
                />
              </AspectRatio>
              <PlayIcon className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full p-1 h-10 w-10 bg-accent pl-2" />
            </>
          </div>
          <div className=" grid grid-rows-2">
            <CardTitle className=" line-clamp-2">
              {podcast?.podcastTitle}
            </CardTitle>
            <span className=" flex justify-between">
              <CardDescription>{podcast?.authorName}</CardDescription>
              <CardDescription>{podcast?.category}</CardDescription>
            </span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default PinCard;
