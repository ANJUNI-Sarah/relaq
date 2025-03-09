import SidebarFilters  from "@/components/sider-filter"
import { ShopCard } from "@/components/shop-card"
import { SearchFilters } from '@/components/search-filters';

export default function ListPage() {
  return (
    <div className="container">

        <aside className="w-64 bg-gray-100 p-4 lg:block hidden">
          <SidebarFilters />
        </aside>

        <div className="w-full p-4 lg:hidden block">
          <SearchFilters/>
        </div>

      <main className="flex-1 p-4">
        {/* 其他內容 */}
      </main>
    </div>
  )
}

