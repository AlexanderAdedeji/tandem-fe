'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter()
  return (
    <div className="items-center justify-items-center min-h-screen p-8   font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-lg text-white">Welcome to Tandem</h1>
      <p>Your best productivity and collaborrative app</p>

      <Button onClick={()=>router.push("/intro")}>Intro</Button>
      <Button onClick={()=>router.push("/login")}>Intro</Button>
      <Button onClick={()=>router.push("/on-boarding")}>Intro</Button>
    </div>
  );
}
