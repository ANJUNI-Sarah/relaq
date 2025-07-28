"use client";

import { useState } from "react";
import { SearchFilters } from "@/components/search-filters";
import { Shop_list_create_request } from "@/generated/types";
import { useRouter } from "next/navigation";

interface HomeSearchProps {
    bannerImage: string;
}

export const SearchBar = ({ bannerImage }: HomeSearchProps) => {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState<Shop_list_create_request>({
        page: 1,
        page_size: 10,
        city: "",
        township: "",
        price_min: 0,
        price_max: 99999999,
        keyword: "",
    });

    const onSearch = () => {
        // 在首頁時，將物件base64 encode，跳轉到搜尋列表頁
        const encodedParams = btoa(
            encodeURIComponent(JSON.stringify(searchParams))
        );
        router.push(`/shop-list?q=${encodedParams}`);
    };

    return (
        <SearchFilters
            isBanner={true}
            bannerImage={bannerImage}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={onSearch}
        />
    );
};
