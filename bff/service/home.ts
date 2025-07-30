import { Homepage_list_response } from "@/generated/types";
import { API_CALLS } from "@/generated/api-calls";

export const homeInit = async (): Promise<Homepage_list_response> => {
    // 邏輯處理區塊
    try {
        const result = await API_CALLS.HOMEPAGE_LIST();
        return result.data;
    } catch (error) {
        throw error; // 重新拋出錯誤以便上層處理
    }
};
