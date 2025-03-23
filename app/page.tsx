import { FeaturedSection } from "@/app/components/featured-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchHomeData } from "@/lib/data";
import { HomeSearch } from "@/app/components/home-search"

export default async function Home() {
  const homeData = await fetchHomeData();

  if(!homeData) {
    throw new Error("暫時無資料，請稍後再試");
  }
  
  return (
    <div className="w-full py-6 space-y-8">
      <Tabs defaultValue="nails" className="w-full space-y-6">
        <TabsList className="mx-5">
          <TabsTrigger value="nails">美甲</TabsTrigger>
          <TabsTrigger value="hair">美髮</TabsTrigger>
        </TabsList>
        <HomeSearch bannerImage={homeData.banner} />
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

