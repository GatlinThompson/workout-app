import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/utils/getUser";
import TodaysLift from "@/components/dashboard/todays_lift/TodaysLift";
import Head from "next/head";
import { Metadata } from "next";

import Main from "@/components/layout/Main";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <Main>
        <TodaysLift />
      </Main>
    </>
  );
}
