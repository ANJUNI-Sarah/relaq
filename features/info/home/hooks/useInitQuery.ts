"use client";

import { useQuery } from "@tanstack/react-query";
import bffApi from "@/bff/routes";
import { client } from "@/lib/utils/client";

export const useInitQuery = () => {
    const result = useQuery({
        queryKey: [bffApi.home.init.path],
        queryFn: () => client.get(bffApi.home.init.path),
        select: (res) => res.data.data,
    });
    return result;
};
