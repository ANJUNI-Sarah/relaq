"use client";

import { FeaturedSection } from "@/components/featured-section";
import { SearchBar } from "@/features/info/home/components/SearchBar";
import { useInitQuery } from "@/features/info/home/hooks/useInitQuery";
import Loading from "./loading";

export default function Page() {
    const { data, isLoading, error } = useInitQuery();

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        throw new Error("暫時無資料，請稍後再試", error);
    }

    return (
        <div className="w-full py-6 space-y-8">
            <SearchBar bannerImage={data.banner} />
            <FeaturedSection articles={data.articles} />
        </div>
    );
}
