import { Heart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shop_list_create_response_data_items_item } from "@/generated/types/shop_list_create_response"



export function ShopCard({ shop }: { shop: Shop_list_create_response_data_items_item }) {
  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg">
      <Link href={`/shop/${shop.id}`} className="block">
        <div className="relative">
            <div className="relative">
              <img
                src='defaultImg.jpg'
                alt={shop.name}
                className="w-full h-48 object-cover transition-all duration-200 group-hover:brightness-75"
              />
            </div>
          <div className="p-4">
            <h3 className="font-semibold">{shop.name}</h3>
            <p className="text-sm text-muted-foreground">{shop.address}</p>
            {shop.price_min && (
              <p className="text-sm font-medium">最低價格：NT$ {shop.price_min}</p>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="mt-[-8px] mr-[-8px] hover:bg-red-100 hover:text-red-500 transition-colors duration-200"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>
    </Card>
  )
}

