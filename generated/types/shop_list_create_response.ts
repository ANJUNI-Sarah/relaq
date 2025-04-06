// 由 api-gen.js 生成
// 請勿手動編輯此檔案

export type Shop_list_create_response = {
    total_pages?: number | null;
    total_count?: number | null;
    items?: {
        id?: number | null;
        name?: string | null;
        address?: string | null;
        price_min?: number | null;
        pictures?: string[] | null;
    }[];
};
