import { ShopCard } from "@/components/shop-card"
import { SearchFilters } from '@/components/search-filters';
import { fetchShopDataList } from '@/lib/data';
import { redirect } from 'next/navigation';

export default async function ListPage(
  {
    searchParams,
  }: {
    searchParams: {
      q?: string;
    };
  }
) {

  // 如果沒有 q 參數，則跳轉到首頁
  if (!searchParams.q) {
    redirect('/');
  }

  const decodedParams = JSON.parse(decodeURIComponent(atob(searchParams.q)));
  const payload = {
    city: decodedParams.city,
    township: decodedParams.township,
    price_min: parseInt(decodedParams.price_min) || 0,
    price_max: parseInt(decodedParams.price_max) || 1000000,
    keyword: decodedParams.keyword,
  };

  // const data = await fetchShopDataList(payload);

  return (
    <div className="container">
      <div className="w-full p-4">
        <SearchFilters searchValue={decodedParams} />
      </div>
      <main className="flex-1 p-4">
        {/* {data.map((shop) => (
          <ShopCard key={shop.id} {...shop} />
        ))} */}
      </main>
    </div>
  )
}

