// 由 api-gen.js 生成
// 請勿手動編輯此檔案

import { server } from "@/lib/utils/client";
import { PATHS } from "./api";

export const API_CALLS = {
    ARTICLE_CREATE: () => server.post(PATHS.ARTICLE_CREATE),
    ARTICLE_LIST_CREATE: () => server.post(PATHS.ARTICLE_LIST_CREATE),
    HOMEPAGE_LIST: () => server.get(PATHS.HOMEPAGE_LIST),
    SHOP_CREATE: () => server.post(PATHS.SHOP_CREATE),
    SHOP_LIST_CREATE: () => server.post(PATHS.SHOP_LIST_CREATE),
} as const;
