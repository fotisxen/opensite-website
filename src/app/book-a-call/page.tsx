import BookACallPage from "@/components/pages/BookACallPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book A Call",
};

export default function Page() {
  return <BookACallPage />;
}
