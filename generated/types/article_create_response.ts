// 由 api-gen.js 生成
// 請勿手動編輯此檔案

export type Article_create_response_data = {
    id?: number;
    thumbnail?: string;
    title?: string;
    update_time?: string;
    created_by?: string;
    content?: string
};

export type Article_create_response = {
    code?: string;
    msg?: string;
    data?: Article_create_response_data
};
