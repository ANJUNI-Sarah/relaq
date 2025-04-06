"use client"

import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StyleTag } from "@/app/components/StyleTag"
import { ImageViewer } from "./image-viewer"
import { useState } from "react"
import { Shop_create_response } from "@/generated/types"


const images = [
  "/banner.webp",
  "/placeholder.jpg",
  "/placeholder-user.jpg",
  "/placeholder-logo.png",
  "/placeholder.svg",
  "/placeholder-logo.svg",
]



export function ClientPage( shopData: Shop_create_response) {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setIsViewerOpen(true)
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square cursor-pointer"
                onClick={() => handleImageClick(i)}
              >
                <Image
                  src={src}
                  alt={`Shop image ${i + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                {i === 5 && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium">畫廊</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <ImageViewer
            images={images}
            currentIndex={currentImageIndex}
            isOpen={isViewerOpen}
            onClose={() => setIsViewerOpen(false)}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />

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
            <p className="text-muted-foreground">
            {/* {shopData.style_tags?.map((tag, index) => (
                <StyleTag
                  key={index}
                  icon={
                    tag === "自然風" ? "🌿" :
                    tag === "個性風" ? "💠" :
                    tag === "漸層美甲" ? "🌈" : undefined
                  }
                  label={tag}
                />
              ))} */}
            </p>
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