import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import TodoList from "@/Components/TodoList";
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  return (
    <>
    <TodoList />
    </>
  );
}
