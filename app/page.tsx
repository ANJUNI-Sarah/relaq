"use client";

import { FeaturedSection } from "@/components/featured-section";
import { SearchBar } from "@/features/info/home/components/SearchBar";
import { useInitQuery } from "@/features/info/home/hooks/useInitQuery";

export default function Page() {
    const { data, isLoading, error } = useInitQuery();

    console.log("Page data:", data);

    if (isLoading) {
        return <>Loading</>;
    }

    if (error) {
        throw new Error("暫時無資料，請稍後再試");
    }

    return (
        <div className="w-full py-6 space-y-8">
            <SearchBar bannerImage={data.data.data.banner} />
            <FeaturedSection articles={data.data.data.articles} />
        </div>
    );
}
