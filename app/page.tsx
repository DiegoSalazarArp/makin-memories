import { ModeToggle } from "@/components/ModeToggle"
import BannerTitle from "@/components/ui/BannerTitle"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <section className="animate-in flex flex-col items-center justify-center h-screen ">
      <div className="w-full flex items-center justify-between px-4 md:px-6 absolute top-0 left-0 py-4">
        <div />
        <ModeToggle />
      </div>
      <div className="space-y-4 text-center">
        <BannerTitle className="text-5xl md:text-7xl" title="we die young" />
        <p className="text-lg text-gray-500 dark:text-gray-400">are you in?</p>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
          href="/login"
        >
          {`
            enter >
          `}
        </Link>
      </div>
    </section>
  )
}
