"use client";

import { useState } from "react";
import { Shop_list_create_request, Shop_list_create_response } from "@/generated/types";
import { ShopList } from "./shop-list";
import { SearchFilters } from "@/components/search-filters";
import { shopService } from "@/app/services/shop.service";

interface ListContainerProps {
    initialShops: Shop_list_create_response;
    initialSearchParams: Shop_list_create_request;
}

export function ListContainer({ initialShops, initialSearchParams }: ListContainerProps) {
    const [shops, setShops] = useState<Shop_list_create_response>(initialShops);
    const [currentParams, setCurrentParams] = useState<Shop_list_create_request>(initialSearchParams);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await shopService.search(currentParams);
            setShops(data);
        } catch (error) {
            console.error("搜索失敗:", error);
            setError("搜索失敗，請稍後再試");
        } finally {
            setLoading(false);
        }
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
        </div>
    );
} 