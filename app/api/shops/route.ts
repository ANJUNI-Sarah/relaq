import { NextRequest, NextResponse } from "next/server";
import { fetchShopList } from "@/lib/data";

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const params = {
        page: Number(searchParams.get("page")) || 1,
        page_size: Number(searchParams.get("page_size")) || 10,
        city: searchParams.get("city"),
        township: searchParams.get("township"),
        price_min: Number(searchParams.get("price_min")),
        price_max: Number(searchParams.get("price_max")),
        keyword: searchParams.get("keyword"),
    };

    const data = await fetchShopList(params);
    return NextResponse.json(data);
}
