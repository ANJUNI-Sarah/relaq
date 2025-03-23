import {
    Shop_list_create_request,
    Shop_list_create_response,
    Shop_create_response,
} from "@/generated/types";

// 客戶端調用的 API 服務
export const shopService = {
    // 搜索商店列表
    search: async (
        params: Shop_list_create_request
    ): Promise<Shop_list_create_response> => {
        const response = await fetch("/api/shops/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            throw new Error("搜索失敗");
        }

        const data = await response.json();
        return data;
    },

    // 獲取商店詳情
    getDetail: async (id: number): Promise<Shop_create_response> => {
        const response = await fetch(`/api/shops/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("獲取店家詳情失敗");
        }

        const data = await response.json();
        return data;
    },
};
