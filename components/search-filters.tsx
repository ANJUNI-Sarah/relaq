"use client"

import { useState } from 'react';
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger } from "@/components/ui/alert-dialog";


export function SearchFilters({
  isBanner = false,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  }

  return (
    <div className="relative flex justify-center items-center">
      {isBanner && (
        <div className="h-72" >
          <img
          src="/banner.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
       </div>
      )}
      <div className="relative space-y-4 bg-white bg-opacity-75 p-4 rounded-md w-full lg:w-4/5">
        <div className="flex gap-4">
        <AlertDialog open={isDialogOpen}>
            <AlertDialogTrigger asChild >
              <Select>
                <SelectTrigger className="w-[180px]" onClick={handleDialogOpen}>
                  <SelectValue placeholder="地區" />
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
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="縣市" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="taipei">台北市</SelectItem>
                    <SelectItem value="newtaipei">新北市</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="鄉鎮" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="district1">鄉鎮1</SelectItem>
                    <SelectItem value="district2">鄉鎮2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <AlertDialogFooter>
                <Button onClick={() => setIsDialogOpen(false)}>確認</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="價格" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-500">NT$ 0-500</SelectItem>
              <SelectItem value="501-1000">NT$ 501-1000</SelectItem>
              <SelectItem value="1001+">NT$ 1001+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Input type="search" placeholder="請輸入地區、店家名稱或關鍵字" className="flex-1" />
          <Button size="icon" variant="secondary">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

