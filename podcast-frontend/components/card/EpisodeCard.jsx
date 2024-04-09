import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PauseIcon, PlayIcon } from "lucide-react";
import { convertSecondsToHMS } from "@/utils/format";
import { Badge } from "../ui/badge";

const EpisodeCard = ({ episode, play }) => {
  const time = convertSecondsToHMS(episode?.duration);
  return (
    <Card>
      <div className=" flex sm:flex-row">
        <CardHeader className=" items-center">
          {play ? (
            <PauseIcon
              size={45}
              className="  bg-slate-100 dark:bg-slate-800 rounded-full p-1"
            />
          ) : (
            <PlayIcon
              size={45}
              className=" bg-slate-100 dark:bg-slate-800 rounded-full p-1 pl-2"
            />
          )}
          <Badge variant="secondary">{time}</Badge>
        </CardHeader>

        <CardHeader className="flex flex-col gap-2 w-full   overflow-hidden">
          <CardTitle>{episode?.title}</CardTitle>
          <CardDescription className=" line-clamp-6 hidden sm:block">
            {episode?.description}
          </CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
};

export default EpisodeCard;
