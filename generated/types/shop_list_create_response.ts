// 由 api-gen.js 生成
// 請勿手動編輯此檔案

export type Shop_list_create_response_data_items_item = {
    id?: number;
    name?: string;
    address?: string;
    price_min?: number;
    pictures?: string[]
};

export type Shop_list_create_response_data = {
    total_pages?: number;
    total_count?: number;
    items?: Shop_list_create_response_data_items_item[]
};

export type Shop_list_create_response = {
    code?: string;
    msg?: string;
    data?: Shop_list_create_response_data
};
