import Loading from "@/app/loading";
import EditEpisodeForm from "@/components/form/EditEpisodeForm";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

export default async function NewEpisodePage({ params }) {
  const episode = await getEpisodeById(params.userid, params.episodeid);

  return (
    <section className=" container mx-auto">
      <Suspense fallback={<Loading />}>
        <EditEpisodeForm episode={episode} />
      </Suspense>
    </section>
  );
}

function getEpisodeById(userId, episodeId) {
  return new Promise((resolve, reject) => {
    const cookieStore = cookies();
    const jwtToken = cookieStore.get("accessToken");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + jwtToken.value);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get/episode/${userId}/${episodeId}`,
      requestOptions,
      { next: { revalidate: 60 } }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
