import {
    Shop_create_request,
    Shop_create_response,
    Shop_list_create_request,
    Shop_list_create_response,
    Homepage_list_response,
    Article_list_create_request,
    Article_list_create_response,
    Article_create_response,
} from "@/generated/types";
import { PATHS, API_METHODS } from "@/generated/api";

// 服務器端直接調用的 API
export const serverApi = {
    // 商店相關
    shop: {
        getDetail: async (
            payload: Shop_create_request
        ): Promise<Shop_create_response> => {
            const response = await fetch(PATHS.SHOP_CREATE, {
                method: API_METHODS.SHOP_CREATE,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.data;
        },

        getList: async (
            params: Shop_list_create_request
        ): Promise<Shop_list_create_response> => {
            const response = await fetch(PATHS.SHOP_LIST_CREATE, {
                method: API_METHODS.SHOP_LIST_CREATE,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error("獲取商店列表失敗");
            }

            const data = await response.json();
            return data.data;
        },
    },

    // 首頁相關
    home: {
        getData: async (): Promise<Homepage_list_response> => {
            const response = await fetch(PATHS.HOMEPAGE_LIST, {
                method: API_METHODS.HOMEPAGE_LIST,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.data;
        },
    },

    // 文章相關
    article: {
        getList: async (
            payload: Article_list_create_request
        ): Promise<Article_list_create_response> => {
            const response = await fetch(PATHS.ARTICLE_LIST_CREATE, {
                method: API_METHODS.ARTICLE_LIST_CREATE,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.data;
        },

        getDetail: async (id: number): Promise<Article_create_response> => {
            const response = await fetch(`${PATHS.ARTICLE_CREATE}`, {
                method: API_METHODS.ARTICLE_CREATE,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.data;
        },
    },
};
