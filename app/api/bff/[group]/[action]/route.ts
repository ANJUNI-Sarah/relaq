import { NextRequest, NextResponse } from "next/server";
import bffRoutes from "@/bff/routes";

type BFFParams = {
    group: string;
    action: string;
};

const getRoute = (param: BFFParams) => bffRoutes[param.group]?.[param.action];

export async function GET(_: NextRequest, { params }: { params: BFFParams }) {
    try {
        const route = getRoute(params);
        const data = await route.service();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: BFFParams }
) {
    if (!req.body) {
        return NextResponse.json(
            { error: "No request body provided" },
            { status: 400 }
        );
    }
    const route = getRoute(params);
    const data = await route.service(req.json());

    return NextResponse.json(data);
}
