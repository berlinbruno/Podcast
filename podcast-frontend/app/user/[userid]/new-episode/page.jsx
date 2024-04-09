import EpisodeForm from "@/components/form/EpisodeForm";
import PodcastForm from "@/components/form/PodcastForm";
import React from "react";

export default async function page({params}) {
  return (
    <section className=" container mx-auto">
      <EpisodeForm userId={params.userid}/>
    </section>
  );
}
