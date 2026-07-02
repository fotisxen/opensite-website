import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: "Digital Agency for Business Growth",
};

export default function Page() {
  return <HomePage />;
}
