import Loading from "@/app/loading";
import ChangePasswordForm from "@/components/form/ChangePasswordForm";
import DeleteAccountForm from "@/components/form/DeleteAccountForm";
import ProfileForm from "@/components/form/ProfileForm";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

export default async function page({ params }) {
  const user = await getUserData(params.userid);
  return (
    <section className=" container mx-auto">
      <Suspense fallback={<Loading />}>
        <ProfileForm user={user} />
      </Suspense>
      <Separator className="my-2" />
      <Suspense fallback={<Loading />}>
        <ChangePasswordForm user={user} />
      </Suspense>
      <Separator className="my-2" />
      <Suspense fallback={<Loading />}>
        <DeleteAccountForm user={user} />
      </Suspense>
      <Separator className="my-2" />
    </section>
  );
}

async function getUserData(userid) {
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get/userdata/${userid}`,
      requestOptions,
      { next: { revalidate: 60 } }
    )
      .then((res) => {
        if (res.status === 204) {
          // No content returned, resolve with null
          resolve(null);
        } else if (!res.ok) {
          resolve(null)
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
