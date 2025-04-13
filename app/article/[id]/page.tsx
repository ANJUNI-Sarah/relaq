import { serverApi } from "@/lib/api/server";
import Image from "next/image";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { Article_create_response } from "@/generated/types";
import { sanitizeHtml } from "@/lib/utils/html";
import { fetchArticleData } from "@/lib/data";
export default async function ArticlePage({
    params,
}: {
    params: { id: string };
}) {
    const id = parseInt(params.id);
    const { content, thumbnail, title, update_time, created_by } = await fetchArticleData({ id });

    // 清理 HTML 內容
    const sanitizedContent = sanitizeHtml(content|| '');

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            {thumbnail && (
                <div className="relative w-full h-[400px] mb-8">
                    <Image
                        src={thumbnail}
                        alt={title || ""}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}
            
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            
            <div className="flex items-center text-gray-600 mb-8">
                <span className="mr-4">
                    {format(new Date(update_time || ''), "PPP", { locale: zhTW })}
                </span>
                {created_by && (
                    <span>作者：{created_by}</span>
                )}
            </div>

            <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
        </article>
    );
} 