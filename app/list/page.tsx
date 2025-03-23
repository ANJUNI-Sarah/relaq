import { ListContainer } from './components/list-container'
import { Shop_list_create_request, Shop_list_create_response } from '@/generated/types'
import { fetchShopList } from '@/lib/data'
import { redirect } from 'next/navigation'

const initialSearchParams: Shop_list_create_request = {
  page: 1,
  page_size: 10,
  city: "",
  township: "",
  price_min: 0,
  price_max: 0,
  keyword: "",
}

export default async function ListPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  let initialShops: Shop_list_create_response = [];
  // let initialParams = initialSearchParams;

  if(!searchParams.q) {
    redirect("/")
  }

  // 如果有搜尋參數，解析並獲取初始數據
  const decodedParams = JSON.parse(decodeURIComponent(atob(searchParams.q)));

  const response = await fetchShopList({
    page: decodedParams.page || 1,
    page_size: decodedParams.page_size || 10,
    city: decodedParams.city,
    township: decodedParams.township,
    price_min: decodedParams.price_min,
    price_max: decodedParams.price_max,
    keyword: decodedParams.keyword,
  });
  initialShops = response;

  return (
    <div className="container mx-auto px-4 py-8">
      <ListContainer 
        initialShops={initialShops}
        initialSearchParams={decodedParams}
      />
    </div>
  )
}

