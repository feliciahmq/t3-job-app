"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "~/trpc/react";
import { LoadingSpinner } from "@/components/ui/spinner";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = api.user.getUser.useQuery();

  const publicRoutes = ["/", "/login", "/register"];

  useEffect(() => {
    if (!isLoading && !user && !publicRoutes.includes(pathname)) {
      router.replace("/login");
    }
  }, [user, isLoading, router, pathname, publicRoutes]);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <LoadingSpinner className="text-black-500 w-10 h-10" />
      </div>
    )
  }

  return <>{children}</>;
}
