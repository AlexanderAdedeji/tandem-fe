"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SplashScreen from "./SplashScreen";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



export default function Home() {

  return <SplashScreen />;
}
