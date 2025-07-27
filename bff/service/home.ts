import { PATHS } from "@/generated/api";
import { Homepage_list_response } from "@/generated/types";
import { server } from "@/lib/utils/client";

export const homeInit = async (): Promise<Homepage_list_response> => {
    // 邏輯處理區塊
    const result = await server.post(PATHS.HOMEPAGE_LIST);

    console.log("BFF Route: home/init", result.data);

    return result.data;
};
