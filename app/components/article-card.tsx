"use client";

import { Article_create_response } from "@/generated/types";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";

interface ArticleCardProps {
    article: Article_create_response;
}

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Link href={`/article/${article.id}`} className="block">
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {article.thumbnail && (
                    <div className="relative w-full h-48">
                        <Image
                            src={article.thumbnail}
                            alt={article.title || ""}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                    <p className="text-gray-600 text-sm mb-2">
                        {format(new Date(article.update_time), "PPP", { locale: zhTW })}
                    </p>
                    <p className="text-gray-700 line-clamp-3">{article.preview_content}</p>
                </div>
            </article>
        </Link>
    );
} 