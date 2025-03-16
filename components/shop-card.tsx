import Image from "next/image"
import { Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shop_list_create_response } from "@/generated/types"

export function ShopCard(shop) {
  return (
    <Card className="overflow-hidden max-w-[200px]">
      <Link href={`/shop/${shop.id}`}>
        <div className="relative aspect-video">
          <Image src="/placeholder.svg" alt="Shop preview" fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{shop.name}</h3>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="text-sm font-medium">NT$ ${shop.price_min} 起</p>
            </div>
            <Button variant="ghost" size="icon" className="mt-[-8px] mr-[-8px]">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

