import { NextRequest, NextResponse } from "next/server";
import bffRoutes from "@/bff/routes";

type BFFParams = {
    group: string;
    action: string;
};

export async function POST(
    req: NextRequest,
    { params }: { params: BFFParams }
) {
    const { group, action } = params;
    const route = bffRoutes[group]?.[action];

    if (route) {
        console.log("efe");
        // const payload = await req.json();
        const data = await route.service();
        console.log(`BFF Route: ${group}/${action}`, data);
        return NextResponse.json(data);
    }
    return NextResponse.json({ error: "Route not found" }, { status: 404 });
}
