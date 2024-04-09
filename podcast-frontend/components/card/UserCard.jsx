"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import PopupMenu from "../menu/PopupMenu";
import { useState } from "react";
import { getCookie } from "@/utils/cookies";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserCard = ({ user }) => {
  const [deleting, setDeleting] = useState(false);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const userId = user?.podcastId;

  const handelLock = () => {
    setloading(true);
    const jwtToken = getCookie("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + jwtToken);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/${userId}/lock`,
      requestOptions
    )
      .then((response) => toast(response.text()))
      .then(() => (window.location.href = `/admin/locked`))
      .then((result) => console.log(result))
      .catch((error) => console.error(error))
      .finally(() => setloading(false));
  };

  const handelUnLock = () => {
    setloading(true);
    const jwtToken = getCookie("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + jwtToken);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/${userId}/unlock`,
      requestOptions
    )
      .then((response) => toast(response.text()))
      .then(() => (window.location.href = `/admin/`))
      .then((result) => console.log(result))
      .catch((error) => console.error(error))
      .finally(() => setloading(false));
  };

  const handleDelete = () => {
    setloading(true);
    const jwtToken = getCookie("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + jwtToken);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/user/${userId}`,
      requestOptions
    )
      .then((response) => toast(response.text()))
      .then(() => (window.location.href = `/admin/`))
      .then((result) => console.log(result))
      .catch((error) => console.error(error))
      .finally(() => setloading(false));
  };

  return (
    <Card className=" h-full z-10">
      <CardHeader>
        <div className="  flex justify-center w-full ">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={user?.authorProfileUrl || "/podcast.jpg"}
              fill
              priority
              alt="imagePreview"
              className="rounded-md object-cover bg-muted"
            />
          </AspectRatio>
        </div>
        <div className=" grid grid-rows-4">
          <CardTitle className=" line-clamp-2">{user?.podcastTitle}</CardTitle>
          <span className=" flex justify-between">
            <CardDescription>{user?.authorName}</CardDescription>
            <CardDescription>{user?.category}</CardDescription>
          </span>
          <span className=" flex">
            <CardDescription>
              No.of Episodes:{user?.noOfEpisodes}
            </CardDescription>
          </span>
          <span className=" flex w-full gap-2">
            {user?.locked ? (
              <Button
                className=" w-full"
                onClick={handelUnLock}
                disabled={loading}
              >
                UnLock
              </Button>
            ) : (
              <Button
                className=" w-full"
                onClick={handelLock}
                disabled={loading}
              >
                Lock
              </Button>
            )}

            <PopupMenu
              callfunction={handleDelete}
              status={loading}
              text={"Delete user"}
            />
          </span>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
