import { SearchFilters } from "@/components/search-filters"
import { FeaturedSection } from "@/components/featured-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchHomeData } from "@/lib/data";

export default async function Home() {
  const homeData = await fetchHomeData();
  
  return (
    <div className="w-full py-6 space-y-8">
      
      <Tabs defaultValue="nails" className="w-full space-y-6">
        <TabsList className="mx-5">
          <TabsTrigger value="nails">美甲</TabsTrigger>
          <TabsTrigger value="hair">美髮</TabsTrigger>
        </TabsList>
        <SearchFilters isBanner={true} bannerImage={homeData.banner}/>
        <TabsContent value="nails" className="mx-8">
          <FeaturedSection articles={homeData.articles}/>
        </TabsContent>
        <TabsContent value="hair" className="mx-8">
          <FeaturedSection articles={homeData.articles}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

