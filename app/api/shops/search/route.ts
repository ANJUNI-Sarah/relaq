import { NextRequest, NextResponse } from "next/server";
import { fetchShopList } from "@/lib/data";

export async function POST(request: NextRequest) {
    const params = await request.json();
    const data = await fetchShopList(params);

    return NextResponse.json(data);
}
