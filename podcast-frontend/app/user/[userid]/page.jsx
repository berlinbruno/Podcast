import Loading from "@/app/loading";
import PodcastCard from "@/components/card/PodcastCard";
import EditEpisodeList from "@/components/list/EditEpisodeList";
import EditPodcastList from "@/components/list/EditPodcastList";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function DashboardPage({ params }) {
  const podcast = await getPodcastByUserId(params.userid);
  const episodes = await getAllEpisodesById(params.userid);
  return (
    <section className=" container mx-auto mt-2">
      <Suspense fallback={<Loading />}>
        <PodcastCard podcast={podcast} />
      </Suspense>
      <EditPodcastList podcast={podcast}/>
      <Separator className="my-2" />
      <Suspense fallback={<Loading />}>
        <EditEpisodeList episodes={episodes} />
      </Suspense>
    </section>
  );
}

const getPodcastByUserId = async (userId) => {
  try {
    const cookieStore = cookies();
    const jwtToken = cookieStore.get("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + jwtToken.value);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get/userdata/${userId}`,
      requestOptions,
      { next: { revalidate: 0 } }
    );

    if (response.status === 204) {
      // No content returned, resolve with null
      return null;
    } else if (!response.ok) {
      return null;
    } else {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    throw error;
  }
};
const getAllEpisodesById = async (userId) => {
  try {
    const cookieStore = cookies();
    const jwtToken = cookieStore.get("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + jwtToken.value);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get/podcast/${userId}/episodes`,
      requestOptions,
      { next: { revalidate: 60 } }
    );

    if (response.status === 204) {
      // No content returned, resolve with null
      return null;
    } else if (!response.ok) {
      return null;
    } else {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    throw error;
  }
};
