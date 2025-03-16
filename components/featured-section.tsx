import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Homepage_list_response } from "@/generated/types"

export async function FeaturedSection({ articles }: { articles: Homepage_list_response['articles'] }) {
  
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">最熱話題！</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/shop/${article.id}`}>
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  <Image src={article.thumbnail || "/placeholder.svg"} alt="Featured content" fill className="object-cover rounded-t-lg" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.preview_content}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

