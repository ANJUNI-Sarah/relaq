import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // 處理 CORS
    if (request.method === "OPTIONS") {
        return new NextResponse(null, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        });
    }

    // 獲取響應
    const response = await fetch(request.url, {
        method: request.method,
        headers: {
            ...Object.fromEntries(request.headers),
            "Content-Type": "application/json",
        },
        body: request.method !== "GET" ? await request.text() : undefined,
    });

    // 創建新的響應，添加 CORS headers
    const newResponse = new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
    });

    // 添加 CORS headers
    newResponse.headers.set("Access-Control-Allow-Origin", "*");
    newResponse.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    newResponse.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    return newResponse;
}

export const config = {
    matcher: "/api/:path*",
};
