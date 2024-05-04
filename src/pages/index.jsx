import BlogCards from "@/components/index/blogcards";
import Hero from "@/components/ui/hero/Hero";
import { useSession } from "next-auth/react";

export default function Home() {
  const data = useSession();

  return (
    <div className="flex flex-col justify-between p-10">
      <h1 className="text-3xl font-bold text-left italic">
        Welcome To Blog Firebase
      </h1>
      <BlogCards />
    </div>
  );
}
