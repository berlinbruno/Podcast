"use client";
import { ArrowLeft, SearchIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import PinCard from "../card/PinCard";
import { Button } from "../ui/button";
import { categories } from "@/utils/data";
import { useRouter } from "next/navigation";
import { ResetIcon } from "@radix-ui/react-icons";

const PinList = ({ category }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (category === null) {
      getAllPodcasts();
    } else {
      handleCategory(category);
    }
  }, []);

  async function getAllPodcasts() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/get/podcasts/all`
      );
      if (res.ok) {
        const data = await res.json();

        setPodcasts(data);
        return data;
      }
    } catch (error) {
      console.error("Error fetching all podcasts:", error);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const data = await getAllPodcastsByQuery({ userQuery: searchQuery });
        setPodcasts(data);
      } catch (error) {
        console.error("Error fetching podcasts by query:", error);
      }
    } else {
      try {
        const data = await getAllPodcasts();
        setPodcasts(data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    }
  };

  const handleReset = () => {
    getAllPodcasts();
  };

  const handleCategory = async (category) => {
    try {
      const data = await getAllPodcastsByCategory({ category: category });
      setPodcasts(data);
    } catch (error) {
      console.error("Error fetching podcasts by category:", error);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <menu className=" flex flex-col gap-2 mt-4">
      <form onSubmit={handleSearch} className=" flex gap-2">
        {/* important bg-background focus:outline-none */}
        <Button variant="outline" type="button"  className=" rounded-full"onClick={() => router.back()}>
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
      <Separator className="hidden sm:block" />
      <div className=" flex-wrap justify-start w-full gap-2 hidden sm:flex">
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => {
              handleCategory(category);
            }}
            variant="secondary"
          >
            {category}
          </Button>
        ))}
        <Button type="button" onClick={() => handleReset()} variant="outline">
          <ResetIcon />
        </Button>
      </div>
      <Separator />
      {/* Pins */}
      <article className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full gap-2">
        {podcasts?.map((podcast, index) => {
          return <PinCard podcast={podcast} key={index} />;
        })}
      </article>
    </menu>
  );
};

export default PinList;

async function getAllPodcastsByQuery({ userQuery }) {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/get/podcasts/query/${userQuery}`,
      requestOptions
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching podcasts by query:", error);
  }
}

async function getAllPodcastsByCategory({ category }) {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/get/podcasts/category/${category}`,
      requestOptions
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching podcasts by category:", error);
  }
}
