import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { BookPlus, User2Icon } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";
import { timeAgo } from "@/utils/format";

const PreviewPodcastCard = ({ user }) => {
  return (
    <Card className=" relative">
      <div className=" flex flex-col sm:flex-row items-center sm:items-stretch">
        <CardHeader className=" z-10 w-full max-w-[250px]">
          <span className=" relative inline-block">
            {user?.imagePreview && (
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={user?.imagePreview}
                  fill
                  alt="imagePreview"
                  className=" rounded-md object-cover bg-muted"
                />
              </AspectRatio>
            )}
          </span>
        </CardHeader>

        <CardHeader className="flex flex-col gap-2 w-full justify-between   overflow-hidden z-50">
          <article>
            <CardTitle>{user?.title || "Podcast Title"}</CardTitle>
            <CardDescription className=" line-clamp-6 hidden sm:block">
              {user?.description}
            </CardDescription>
          </article>
          <article className="flex flex-row  w-full justify-between">
            <span className=" flex gap-2 capitalize">
              <User2Icon className="hidden sm:block " />
              {user?.name || "channel name"}
            </span>
            <span className=" flex gap-2">
              <BookPlus className="hidden sm:block" />
              {user?.category || "category"}
            </span>
          </article>
        </CardHeader>
      </div>
      <Image
        src={user?.bannerPreview}
        fill
        alt="imagePreview"
        className=" rounded-md object-cover absolute top-0 left-0 -z-0"
      />
    </Card>
  );
};

export default PreviewPodcastCard;
