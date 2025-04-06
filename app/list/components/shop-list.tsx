'use client'

import { ShopCard } from "@/components/shop-card"
import { Shop_list_create_response } from "@/generated/types"
import { Loader2 } from "lucide-react"

interface ShopListProps {
  shops: Shop_list_create_response;
  loading?: boolean;
  error?: string | null;
}

export function ShopList({ shops, loading, error }: ShopListProps) {

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!shops.items?.length) {
    return <div className="text-center py-8">沒有找到符合條件的店家</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {shops.items?.map((shop) => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
} 