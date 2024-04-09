import Image from "next/image";
import React from "react";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ModeToggle } from "../menu/ModeToggle";
import { cookies } from "next/headers";

const Header = async () => {
  const cookieStore = cookies();
  const user = cookieStore.get("accessToken");
  const userId = cookieStore.get("userId");
  const role = cookieStore.get("role");

  const userData = await getUserData();

  return (
    <header className=" sticky top-0 z-20 border border-b-2 bg-accent shadow-md  py-2">
      <div className=" container mx-auto flex w-full justify-between items-center">
        <Link href="/" className="w-[200px]">
          <AspectRatio ratio={4 / 1}>
            <Image
              src="/logoLight.png"
              alt="logo"
              className=" dark:hidden"
              fill
              priority
            />
            <Image
              src="/logoDark.png"
              alt="logo"
              className="hidden dark:block"
              fill
              priority
            />
          </AspectRatio>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className=" outline-none rounded-full border-none"
            >
              <Avatar>
                <AvatarImage src={userData?.authorProfileUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" w-40">
            {role?.value === "USER" && (
              <DropdownMenuGroup>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/user/${userId.value}/home`}>
                  <DropdownMenuItem>Home</DropdownMenuItem>
                </Link>
                <Link href={`/user/${userId.value}/new-episode`}>
                  <DropdownMenuItem>New Episode</DropdownMenuItem>
                </Link>
                <Link href={`/user/${userId.value}`}>
                  <DropdownMenuItem>My Podcast</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            )}
            {role?.value === "ADMIN" && (
              <DropdownMenuGroup>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/admin`}>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
                <Link href={`/admin/locked`}>
                  <DropdownMenuItem>Locked</DropdownMenuItem>
                </Link>
                <Link href={`/admin/account`}>
                  <DropdownMenuItem>Account</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            )}
            <DropdownMenuSeparator />
            <ModeToggle />
            <DropdownMenuSeparator />
            {user ? (
              <Link href={"/logout"}>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </Link>
            ) : (
              <Link href={"/login"}>
                <DropdownMenuItem>Log in</DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

async function getUserData() {
  return new Promise((resolve, reject) => {
    const cookieStore = cookies();
    const jwtToken = cookieStore.get("accessToken");
    const userId = cookieStore.get("userId");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + jwtToken?.value);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get/userdata/${userId?.value}`,
      requestOptions,
      { next: { revalidate: 60 } }
    )
      .then((res) => {
        if (res.status === 204) {
          // No content returned, resolve with null
          resolve(null);
        } else if (!res.ok) {
          resolve(null);
        } else {
          return res.json();
        }
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
