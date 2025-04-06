import { serverApi } from "@/lib/api/server";
import Image from "next/image";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { Article_create_response } from "@/generated/types";
import { sanitizeHtml } from "@/lib/utils/html";

export default async function ArticlePage({
    params,
}: {
    params: { id: string };
}) {
    const id = parseInt(params.id);
    const article = await serverApi.article.getDetail(id);

    // 清理 HTML 內容
    const sanitizedContent = sanitizeHtml(article.content|| '');

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            {article.thumbnail && (
                <div className="relative w-full h-[400px] mb-8">
                    <Image
                        src={article.thumbnail}
                        alt={article.title || ""}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}
            
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-8">
                <span className="mr-4">
                    {format(new Date(article.update_time || ''), "PPP", { locale: zhTW })}
                </span>
                {article.created_by && (
                    <span>作者：{article.created_by}</span>
                )}
            </div>

            <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
        </article>
    );
} 