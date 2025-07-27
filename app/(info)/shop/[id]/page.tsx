import { fetchShopData } from '@/lib/data'
import { ClientPage } from './client-page'

export default async function ShopPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const shopData = await fetchShopData({ id: parseInt(params.id) })
  return <ClientPage {...shopData} />
}

