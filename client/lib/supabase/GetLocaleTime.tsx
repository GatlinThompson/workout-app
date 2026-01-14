"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SetTimezoneCookie() {
  const router = useRouter();

  useEffect(() => {
    const updateCookie = () => {
      const date = new Date();
      const formatedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      // Get existing cookie to check if it needs updating
      const existingCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("localeTime="));
      const existingDate = existingCookie
        ? decodeURIComponent(existingCookie.split("=")[1])
        : null;

      document.cookie = `localeTime=${encodeURIComponent(
        formatedDate
      )}; Path=/; Max-Age=31536000; SameSite=Lax`;

      // Refresh the router if the date changed to ensure server components get the new cookie
      if (existingDate !== formatedDate) {
        router.refresh();
      }
    };

    // Update cookie immediately on mount
    updateCookie();

    // Check for date changes every minute
    const interval = setInterval(updateCookie, 60000);

    return () => clearInterval(interval);
  }, [router]);
  return null;
}
