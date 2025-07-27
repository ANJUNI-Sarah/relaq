import { Homepage_list_response } from "@/generated/types";
import { API_CALLS } from "@/generated/api-calls";

export const homeInit = async (): Promise<Homepage_list_response> => {
    // 邏輯處理區塊
    const result = await API_CALLS.HOMEPAGE_LIST();

    return result.data;
};
