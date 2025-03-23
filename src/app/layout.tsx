import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "sonner";
import ProtectedLayout from "./components/ProtectedLayout";

export const metadata: Metadata = {
  title: "Job Tracker",
  description: "feliciahmq",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      type: "image/x-icon",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <ProtectedLayout>
            {children}
          </ProtectedLayout>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
