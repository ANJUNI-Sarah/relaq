import { NextRequest, NextResponse } from "next/server";
import bffRoutes from "@/bff/routes";

type BFFParams = {
    group: string;
    action: string;
};

const getRoute = (param: BFFParams) => bffRoutes[param.group]?.[param.action];

export async function GET(_: NextRequest, { params }: { params: BFFParams }) {
    const route = getRoute(params);
    const data = await route.service();

    return NextResponse.json(data);
}

export async function POST(
    req: NextRequest,
    { params }: { params: BFFParams }
) {
    const route = getRoute(params);
    const data = await route.service(req.json());

    return NextResponse.json(data);
}
