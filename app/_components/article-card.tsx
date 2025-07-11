"use client";

import { Article_create_response_data } from "@/generated/types/article_create_response";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
    article: Article_create_response_data;
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
                        {article.update_time && article.update_time}
                    </p>
                    <p className="text-gray-700 line-clamp-3">{article.content}</p>
                </div>
            </article>
        </Link>
    );
} 