"use client";

import { useEffect } from "react";

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center h-[90vh]">
            <h2>發生錯誤</h2>
            <p>抱歉，發生了一些錯誤。請稍後再試。</p>
        </div>
    );
}
