"use client"

import { useState } from 'react';
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Shop_list_create_request } from '@/generated/types';
import { locations, getTownshipsByCity } from '@/lib/constants/location';
import { priceRanges } from '@/lib/constants/price';

const initialSearchParams: Shop_list_create_request = {
  city: '',
  township: '',
  price_min: 0,
  price_max: 9999999,
  keyword: '',
}

interface SearchFiltersProps {
  isBanner?: boolean;
  bannerImage?: string;
  searchParams: Shop_list_create_request;
  setSearchParams: (params: Shop_list_create_request | ((prev: Shop_list_create_request) => Shop_list_create_request)) => void;
  onSearch?: () => void;
}

export function SearchFilters({
  isBanner = false,
  bannerImage = '/banner.webp',
  searchParams = initialSearchParams,
  setSearchParams,
  onSearch
}: SearchFiltersProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  }

  const handlePriceChange = (value: string) => {
    const selectedRange = priceRanges.find(range => range.value === value);
    if (selectedRange) {
      setSearchParams((prev:Shop_list_create_request) => ({
        ...prev,
        price_min: selectedRange.min,
        price_max: selectedRange.max, 
      }));
    }
  };

  const handleCityChange = (value: string) => {
    setSearchParams((prev: Shop_list_create_request) => ({
      ...prev,
      city: value,
      township: '', // 清空鄉鎮選擇
    }));
  };

  const handleTownshipChange = (value: string) => {
    setSearchParams((prev: Shop_list_create_request) => ({
      ...prev,
      township: value,
    }));
  };

  const handleLocationConfirm = () => {
    setIsDialogOpen(false);
  };

  const availableTownships = getTownshipsByCity(searchParams.city || '');

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
                  <SelectValue placeholder={searchParams.city ? `${searchParams.city}${searchParams.township ? ` ${searchParams.township}` : ''}` : "地區"} />
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
                <Select 
                  onValueChange={handleCityChange} 
                  defaultValue={searchParams.city || ''}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="縣市" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location.city} value={location.city}>
                        {location.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select 
                  onValueChange={handleTownshipChange} 
                  defaultValue={searchParams.township || ''}
                  disabled={!searchParams.city}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="鄉鎮" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTownships.map(township => (
                      <SelectItem key={township} value={township}>
                        {township}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <AlertDialogFooter>
                <Button onClick={handleLocationConfirm}>確認</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Select 
            onValueChange={handlePriceChange} 
            value={`${searchParams.price_min}-${searchParams.price_max}`}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="價格">
                {priceRanges.find(range => 
                  range.min === searchParams.price_min && 
                  range.max === searchParams.price_max
                )?.label || "價格"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map(range => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Input 
            defaultValue={searchParams.keyword || ''}
            type="search" 
            placeholder="請輸入地區、店家名稱或關鍵字" 
            className="flex-1"
            value={searchParams.keyword || ''}
            onChange={(e) => setSearchParams(prev => ({ ...prev, keyword: e.target.value }))}
          />
          <Button 
            size="icon" 
            variant="secondary" 
            onClick={onSearch}
            className="hover:bg-gray-200 transition-colors duration-200"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

