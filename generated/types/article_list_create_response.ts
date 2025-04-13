// 由 api-gen.js 生成
// 請勿手動編輯此檔案

export type Article_list_create_response_data_items_item = {
    id?: number;
    thumbnail?: string;
    title?: string;
    update_time?: string;
    preview_content?: string
};

export type Article_list_create_response_data = {
    total_pages?: number;
    total_count?: number;
    items?: Article_list_create_response_data_items_item[]
};

export type Article_list_create_response = {
    code?: string;
    msg?: string;
    data?: Article_list_create_response_data
};
