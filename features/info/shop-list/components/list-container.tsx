"use client";

import { useState } from "react";
import { Shop_list_create_request } from "@/generated/types";
import { ShopList } from "./shop-list";
import { SearchFilters } from "@/components/search-filters";
import { Pagination } from "@/components/pagination";
import { Shop_list_create_response_data_items_item } from "@/generated/types/shop_list_create_response";
import { fetchShopListClient } from "@/lib/data";

interface ListContainerProps {
    initialShops: Shop_list_create_response_data_items_item[];
    initialSearchParams: Shop_list_create_request;
    totalPages: number;
}

export function ListContainer({ initialShops, initialSearchParams, totalPages }: ListContainerProps) {
    const [shops, setShops] = useState<Shop_list_create_response_data_items_item[]>(initialShops);
    const [currentParams, setCurrentParams] = useState<Shop_list_create_request>(initialSearchParams);
    const [currentTotalPages, setCurrentTotalPages] = useState(totalPages);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchShopListClient(currentParams);
            setShops(data.items || []);
            setCurrentTotalPages(data.total_pages || 1);
        } catch (error) {
            console.error("搜索失敗:", error);
            setError("搜索失敗，請稍後再試");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = async (page: number) => {
        const updatedParams = { ...currentParams, page };
        setCurrentParams(updatedParams);
        const data = await fetchShopListClient(updatedParams);
        setShops(data.items || []);
        setCurrentTotalPages(data.total_pages || 1);
    };

    return (
        <div className="space-y-8">
            <SearchFilters 
                isBanner={false}
                searchParams={currentParams} 
                setSearchParams={setCurrentParams} 
                onSearch={handleSearch} 
            />
            <ShopList 
                shops={shops}
                loading={loading}
                error={error}
            />
            <Pagination 
                currentPage={currentParams.page || 1}
                totalPages={currentTotalPages || 1}
                onPageChange={handlePageChange}
            />
        </div>
    );
} 