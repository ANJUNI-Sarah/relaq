"use client"

import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StyleTag } from "@/app/_components/StyleTag"
import { Shop_create_response } from "@/generated/types"


export function ClientPage( shopData: Shop_create_response) {
  const socialMedia = {
    instagram: "https://www.instagram.com/yourshop",
    facebook: "https://www.facebook.com/yourshop",
    google: "https://www.google.com/maps/place/yourshop",
  }

  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{shopData.name}</h3>
        <Button variant="ghost" size="icon">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            {
              socialMedia.instagram && <div className="flex cursor-pointer hover:underline text-blue-400">
              <Image src="/icon-instagram.webp" alt="instagram-icon hover:underline" width="26" height="26"/><a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="pl-2">Instagram</a></div>
            }
            {
              socialMedia.facebook&& <div className="flex cursor-pointer hover:underline text-blue-400"><Image src="/icon-facebook.webp" alt="facebook-icon" width="26" height="26"/><a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer"  className="pl-2">Facebook</a></div>
            }
            {
              socialMedia.google && <div className="flex cursor-pointer hover:underline text-blue-400"><Image src="/icon-google.webp" alt="google-icon" width="26" height="26"/><a href={socialMedia.google} target="_blank" rel="noopener noreferrer"  className="pl-2">Google</a></div>
            }
            
          </div>
          <section>
            <h2 className="text-xl font-semibold mb-4">核心特色</h2>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: shopData.core_features }}
            />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">評價摘要</h2>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: shopData.review_summary }}
            />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">推薦用途</h2>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: shopData.recommended_uses }}
            />
          </section>
          <section>
            <div className="text-muted-foreground">
            {shopData.tags?.map((tag, index) => (
                <StyleTag
                  key={index}
                  icon={
                    tag === "自然風" ? "🌿" :
                    tag === "個性風" ? "💠" :
                    tag === "漸層美甲" ? "🌈" : undefined
                  }
                  label={tag}
                />
              ))}
            </div>
          </section>
        </div>

        <Card className="h-fit">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">基本資料</h2>
            <div className="space-y-2">
              <p>地址：{shopData.address}</p>
              <p>電話：{shopData.phone}</p>
              <p>營業時間：{shopData.business_hours}</p>
              <p>價格區間：{shopData.price_range}</p>
              {/* TODO: api 少評論數 */}
              {/* <p>評論數：{shopData.review_count}</p> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 