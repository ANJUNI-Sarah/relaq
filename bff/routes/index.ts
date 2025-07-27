import { client } from "@/lib/utils/client";
import { homeInit } from "@/bff/service/home";

interface BFFRoute {
    path: string;
    service: <T>(payload?: T) => Promise<any>;
    queryFn: (payload?: any) => Promise<any>;
}

interface bffApi {
    [group: string]: {
        [action: string]: BFFRoute;
    };
}

const bffApi: bffApi = {
    home: {
        init: {
            path: "/home/init",
            service: homeInit,
            queryFn: async () => await client.get(bffApi.home.init.path),
        },
    },
};

export default bffApi;
