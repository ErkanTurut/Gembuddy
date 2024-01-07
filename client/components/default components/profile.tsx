import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./logout-button";
import { getSession } from "@/lib/service/auth/fetch";

export default async function Profile() {
  const {
    data: { session },
  } = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href="/settings"
        className="flex w-full flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
      >
        <Image
          src={`https://avatar.vercel.sh/${session.user.email}`}
          width={40}
          height={40}
          alt={session.user.email ?? "User avatar"}
          className="h-6 w-6 rounded-full"
        />
        <span className="truncate text-sm font-medium">
          {session.user.email}
        </span>
      </Link>
      <LogoutButton />
    </div>
  );
}
