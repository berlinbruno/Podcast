"use client";
import React, { useEffect, useState } from "react";
import UserCard from "../card/UserCard";
import { ArrowLeft, SearchIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { getCookie } from "@/utils/cookies";
import { Button } from "../ui/button";
import { categories } from "@/utils/data";
import { ResetIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const UserPinList = () => {
  const [users, setusers] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    try {
      const jwtToken = getCookie("accessToken");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + jwtToken);

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users`,
        requestOptions
      );

      if (!res.ok) {
        console.log("Error fetching users:", res.statusText);
        return;
      }

      const data = await res.json();
      setusers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  }

  async function getAllUsersByQuery() {
    try {
      const jwtToken = getCookie("accessToken");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + jwtToken);

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/query/${searchQuery}`,
        requestOptions
      );

      if (!res.ok) {
        console.log("Error fetching users:", res.statusText);
        return;
      }

      const data = await res.json();
      setusers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  }

  async function getAllUsersByCategory() {
    try {
      const jwtToken = getCookie("accessToken");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + jwtToken);

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/category/${category}`,
        requestOptions
      );

      if (!res.ok) {
        console.log("Error fetching users:", res.statusText);
        return;
      }

      const data = await res.json();
      setusers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    await getAllUsersByQuery();
  };

  const handleReset = async () => {
    await getAllUsers();
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategory = async () => {
    await getAllUsersByCategory();
  };

  return (
    <section className=" mt-2">
      <form onSubmit={handleSearch} className=" flex gap-2">
        {/* important bg-background focus:outline-none */}
        <Button variant="outline" type="button" onClick={() => router.back()}>
          <ArrowLeft />
          Back
        </Button>
        <span className="flex rounded-3xl border border-border px-4 w-full ">
          <input
            type="text"
            placeholder="search"
            value={searchQuery}
            onChange={handleChange}
            className="h-10 w-full border-none   bg-background focus:outline-none"
          />
          <button className=" border-l pl-2" type="submit">
            <SearchIcon />
          </button>
        </span>
      </form>
      <Separator className="my-2" />
      <span className=" flex gap-2">
        {categories.map((category, index) => (
          <Button
            key={index}
            className=" w-full"
            type="button"
            variant="secondary"
            onClick={() => {
              handleCategory(), setCategory(category);
            }}
          >
            {category}
          </Button>
        ))}
        <Button type="button" onClick={() => handleReset()} variant="outline">
          <ResetIcon />
        </Button>
      </span>
      <Separator className="my-2" />
      <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-2 ">
        {users?.map((user, index) => (
          <UserCard user={user} key={index} />
        ))}
      </article>
    </section>
  );
};

export default UserPinList;
