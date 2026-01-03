import React from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/utils/getUser";
import DashboardHeader from "./_components/DashboardHeader";
import TodaysLift from "./_components/TodaysLift";
import Head from "next/head";
import { Metadata } from "next";
import Button from "@/components/ui/Button";
import GlassContainer from "@/components/ui/GlassContainer";
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
        <DashboardHeader />
        <GlassContainer>
          <TodaysLift />
        </GlassContainer>
        <Button to="/lift">Create Lift</Button>
      </Main>
    </>
  );
}
