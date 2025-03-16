"use client"

import { useState } from 'react';
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useRouter, usePathname } from 'next/navigation';

const initialSearchParams = {
  city: '',
  township: '',
  price_min: '',
  price_max: '',
  keyword: '',
}


export function SearchFilters({
  isBanner = false,
  bannerImage = '/banner.webp',
  searchValue = initialSearchParams,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useState(searchValue);

  const handleDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  }

  const handleSearch = async () => {
    // 如果不在 /list 頁面，先導航過去
    if (pathname !== '/list') {
      // 將搜索參數轉換為 JSON 字符串，使用 encodeURIComponent 處理 Unicode 字符
      const encodedParams = btoa(encodeURIComponent(JSON.stringify(searchParams)));
      router.push(`/list?q=${encodedParams}`);
    }
  };

  const handlePriceChange = (value: string) => {
    const [min, max] = value.split('-').map(v => parseInt(v) || 0);
    setSearchParams(prev => ({
      ...prev,
      price_min: min.toString(),
      price_max: max.toString(), 
    }));
  };

  const handleLocationConfirm = (city: string, township: string) => {
    setSearchParams(prev => ({
      ...prev,
      city,
      township,
    }));
    setIsDialogOpen(false);
  };


  return (
    <div className="relative flex justify-center items-center">
      {isBanner && (
        <div className="h-72" >
          <img
            src={bannerImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
      <div className="relative space-y-4 bg-white bg-opacity-75 p-4 rounded-md w-full lg:w-4/5">
        <div className="flex gap-4">
          <AlertDialog open={isDialogOpen}>
            <AlertDialogTrigger asChild>
              <Select>
                <SelectTrigger className="w-[180px]" onClick={handleDialogOpen}>
                  <SelectValue placeholder={searchParams.city && searchParams.township ? `${searchParams.city} ${searchParams.township}` : "地區"} />
                </SelectTrigger>
              </Select>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>選擇地區</AlertDialogTitle>
                <AlertDialogDescription>
                  請選擇縣市和鄉鎮
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4">
                <Select onValueChange={(value) => setSearchParams(prev => ({ ...prev, city: value }))} defaultValue={searchParams.city}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="縣市" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="台北市">台北市</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setSearchParams(prev => ({ ...prev, township: value }))} defaultValue={searchParams.township}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="鄉鎮" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="大安區">大安區</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <AlertDialogFooter>
                <Button onClick={() => handleLocationConfirm(searchParams.city, searchParams.township)}>確認</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Select onValueChange={handlePriceChange} defaultValue={searchParams.price_min && searchParams.price_max &&`${searchParams.price_min}-${searchParams.price_max}`}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="價格" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-500">NT$ 0-500</SelectItem>
              <SelectItem value="501-1000">NT$ 501-1000</SelectItem>
              <SelectItem value="1001-99999">NT$ 1001+</SelectItem>
            </SelectContent>
          </Select>

        </div>
        <div className="flex gap-2">
          <Input 
            defaultValue={searchParams.keyword}
            type="search" 
            placeholder="請輸入地區、店家名稱或關鍵字" 
            className="flex-1"
            value={searchParams.keyword}
            onChange={(e) => setSearchParams(prev => ({ ...prev, keyword: e.target.value }))}
          />
          <Button size="icon" variant="secondary" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

