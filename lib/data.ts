import {
    Shop_create_request,
    Shop_create_response,
    Shop_list_create_request,
    Shop_list_create_response,
    Homepage_list_response,
    Article_list_create_request,
    Article_list_create_response,
} from "@/generated/types";
import { PATHS, API_METHODS } from "@/generated/api";

export async function fetchShopData(
    payload: Shop_create_request
): Promise<Shop_create_response> {
    console.log("payload", payload);
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
    console.log("data", data);

    return data.data;
}

// export async function fetchShopDataList(
//     payload: Shop_list_create_request
// ): Promise<Shop_list_create_response> {
//     console.log("payload", payload);
//     const response = await fetch(PATHS.SHOP_LIST_CREATE, {
//         method: API_METHODS.SHOP_LIST_CREATE,
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("data", data);

//     return data.data;
// }

// 取得首頁資料
export async function fetchHomeData(): Promise<Homepage_list_response> {
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
    console.log("data", data);

    return data.data;
}

// 取文章列表
export async function fetchArticleList(
    payload: Article_list_create_request
): Promise<Article_list_create_response> {
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
    console.log("data", data);

    return data.data;
}

interface ShopListParams {
    page: number;
    page_size: number;
    city: string | null | undefined;
    township: string | null | undefined;
    price_min: number | null | undefined;
    price_max: number | null | undefined;
    keyword: string | null | undefined;
}

export async function fetchShopList(params: ShopListParams) {
    console.log("params", params);
    const response = await fetch(`${PATHS.SHOP_LIST_CREATE}`, {
        method: API_METHODS.SHOP_LIST_CREATE,
        headers: {
            "Content-Type": "application/json",
            // Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            Pragma: "no-cache",
        },
        body: JSON.stringify({ ...params }),
    });

    if (!response.ok) {
        throw new Error("獲取商店列表失敗");
    }

    const data = await response.json();
    console.log("data", data);

    return data.data;
}
