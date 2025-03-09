import { SearchFilters } from "@/components/search-filters"
import { FeaturedSection } from "@/components/featured-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="w-full py-6 space-y-8">
      
      <Tabs defaultValue="nails" className="w-full space-y-6">
        <TabsList className="mx-5">
          <TabsTrigger value="nails">美甲</TabsTrigger>
          <TabsTrigger value="hair">美髮</TabsTrigger>
        </TabsList>
        <SearchFilters isBanner/>
        <TabsContent value="nails" className="mx-8">
          <FeaturedSection />
        </TabsContent>
        <TabsContent value="hair" className="mx-8">
          <FeaturedSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

