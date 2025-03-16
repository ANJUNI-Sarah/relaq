// 由 api-gen.js 生成
// 請勿手動編輯此檔案

export const PATHS = {
    ARTICLE_CREATE: `${process.env.API_URL}/api/article/` as const,
    ARTICLE_LIST_CREATE: `${process.env.API_URL}/api/article_list/` as const,
    HOMEPAGE_LIST: `${process.env.API_URL}/api/homepage/` as const,
    SHOP_CREATE: `${process.env.API_URL}/api/shop/` as const,
    SHOP_LIST_CREATE: `${process.env.API_URL}/api/shop_list/` as const,
} as const;

// API 方法
export const API_METHODS = {
    ARTICLE_CREATE: "POST",
    ARTICLE_LIST_CREATE: "POST",
    HOMEPAGE_LIST: "GET",
    SHOP_CREATE: "POST",
    SHOP_LIST_CREATE: "POST",    
} as const;
