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
    const response = await fetch(PATHS.SHOP_CREATE, {
        method: API_METHODS.SHOP_CREATE,
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function fetchShopDataList(
    payload: Shop_list_create_request
): Promise<Shop_list_create_response> {
    const response = await fetch(PATHS.SHOP_LIST_CREATE, {
        method: API_METHODS.SHOP_LIST_CREATE,
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// 取得首頁資料
export async function fetchHomeData(): Promise<Homepage_list_response> {
    const response = await fetch(PATHS.HOMEPAGE_LIST, {
        method: API_METHODS.HOMEPAGE_LIST,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// 取文章列表
export async function fetchArticleList(
    payload: Article_list_create_request
): Promise<Article_list_create_response> {
    const response = await fetch(PATHS.ARTICLE_LIST_CREATE, {
        method: API_METHODS.ARTICLE_LIST_CREATE,
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}
