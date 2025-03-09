import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ShopPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">店家名稱</h1>
        <Button variant="ghost" size="icon">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative aspect-square">
                <Image src="/placeholder.svg" alt={`Shop image ${i}`} fill className="object-cover rounded-lg" />
                {i === 6 && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium">畫廊</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-4">核心特色</h2>
            <p className="text-muted-foreground">texttexttexttexttexttexttexttexttexttexttexttexttexttexttext</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">評價摘要</h2>
            <p className="text-muted-foreground">texttexttexttexttexttexttexttexttexttexttexttexttexttexttext</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">推薦用途</h2>
            <p className="text-muted-foreground">texttexttexttexttexttexttexttexttexttexttexttexttexttexttext</p>
          </section>
        </div>

        <Card className="h-fit">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">基本資料</h2>
            <div className="space-y-2">
              <p>地址：</p>
              <p>電話：</p>
              <p>營業時間：</p>
              <p>價格區間：</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

