import { Suspense } from "react";
import type { Metadata } from "next";

import "@/styles/globals.css";

import { Header } from "@/components/header";
import { Spinner } from "@/components/ui/spinner";
import QueryProvider from "@/components/query/QueryProvider";

export const metadata: Metadata = {
    title: "Relaq - Beauty Services Booking",
    description: "Book nail and hair services easily",
    generator: "v0.dev",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-TW" className="font-playfair font-zen-old-mincho">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Playfair+Display&family=Zen+Old+Mincho&display=swap"
                    rel="stylesheet"
                ></link>
            </head>
            <body>
                <QueryProvider>
                    <Header />
                    <Suspense fallback={<Spinner />}>
                        <main className="flex justify-center items-center md:min-h-full bg-background ">
                            <div className="container">{children}</div>
                        </main>
                    </Suspense>
                </QueryProvider>
            </body>
        </html>
    );
}
