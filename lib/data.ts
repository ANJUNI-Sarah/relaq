import {
    Shop_create_request,
    Shop_create_response,
    Shop_list_create_request,
    Shop_list_create_response,
    Homepage_list_response,
    Article_list_create_request,
    Article_list_create_response,
    Article_create_request,
} from "@/generated/types";
import { PATHS, API_METHODS } from "@/generated/api";
import { Article_create_response_data } from "@/generated/types/article_create_response";
import { Shop_list_create_response_data } from "@/generated/types/shop_list_create_response";

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

    return data.data;
}

// 取得商店列表
export async function fetchShopList(
    params: Shop_list_create_request
): Promise<Shop_list_create_response_data> {
    const response = await fetch(`${PATHS.SHOP_LIST_CREATE}`, {
        method: API_METHODS.SHOP_LIST_CREATE,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw new Error("獲取商店列表失敗");
    }

    const data = await response.json();

    return data.data;
}

// 取得商店資料
export async function fetchShopData(
    payload: Shop_create_request
): Promise<Shop_create_response> {
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

    return data.data;
}

// 取得文章資料
export async function fetchArticleData(
    payload: Article_create_request
): Promise<Article_create_response_data> {
    const response = await fetch(PATHS.ARTICLE_CREATE, {
        method: API_METHODS.ARTICLE_CREATE,
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
}
