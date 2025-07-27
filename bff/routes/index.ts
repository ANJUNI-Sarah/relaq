import { homeInit } from "../service/home";

interface BFFRoute {
    path: string;
    service: <T>(payload?: T) => Promise<any>;
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
        },
    },
};

export default bffApi;
